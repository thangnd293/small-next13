import "@/styles/tiptap.scss";

import { useEffect, useRef, useState } from "react";

import css from "highlight.js/lib/languages/css";
import java from "highlight.js/lib/languages/java";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import { lowlight } from "lowlight/lib/core";

import {
  Box,
  Button,
  HStack,
  IconButton,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Tooltip,
} from "@chakra-ui/react";
import { useEditor } from "@tiptap/react";
import TextareaAutosize from "react-textarea-autosize";

import EditorContent from "@/components/Editor/EditorContent";
import { CommonToolbar, LinkToolbar } from "@/components/Editor/Toolbars";
import Icons from "@/components/Icons";

lowlight.registerLanguage("html", html);
lowlight.registerLanguage("css", css);
lowlight.registerLanguage("js", js);
lowlight.registerLanguage("ts", ts);
lowlight.registerLanguage("java", java);

import { useDraftContext } from "@/app/draft/[id]/DraftContext";
import { extensions } from "@/components/Editor/extensions";
import useCloudinaryUpload from "@/hooks/useCloudinaryUpload";
import { getDraftsKey, useUpdateDraft } from "@/services/client";
import { Article } from "@/types/common";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  draft: Article;
}
const Editor = ({ draft }: Props) => {
  const queryClient = useQueryClient();
  const { changeIsSaving } = useDraftContext();

  const isFirstRender = useRef(true);
  const [title, setTitle] = useState(draft.title);
  const [subtitle, setSubtitle] = useState(draft.brief);
  const [content, setContent] = useState(draft.description);
  const [backgroundImage, setBackgroundImage] = useState(draft.mainImage || "");

  const { handleUploadToCloudinary, isUploading } = useCloudinaryUpload(
    (value) => setBackgroundImage(value)
  );

  const updateDraft = useUpdateDraft({
    onMutate: () => {
      changeIsSaving(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(getDraftsKey);
      changeIsSaving(false);
    },
  });

  // Turn off auto save
  // useEffect(() => {
  //   if (isFirstRender.current) return;

  //   const timer = setTimeout(
  //     () =>
  //       updateDraft.mutate({
  //         id: draft.id,
  //         description: content,
  //         title: title,
  //         brief: subtitle,
  //         mainImage: backgroundImage,
  //       }),
  //     500
  //   );

  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [backgroundImage, content, subtitle, title, draft, isFirstRender]);

  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  const editor = useEditor({
    extensions,
    editorProps: {
      attributes: {
        class: "outline-none pb-40 min-h-screen",
      },
    },
    content: draft.description,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  const [isAddSubtitle, setIsAddSubtitle] = useState(!!draft.brief);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    handleUploadToCloudinary(file);
  };

  const titleTextareaRef = useRef<HTMLTextAreaElement>(null);
  const subtitleTextareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTitleKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    const titleTextarea = titleTextareaRef.current;
    const subtitleTextarea = subtitleTextareaRef.current;

    if (!titleTextarea) return;

    if (
      (event.key === "ArrowDown" || event.key === "Enter") &&
      isLastLine(titleTextarea)
    ) {
      event.preventDefault();

      subtitleTextarea ? subtitleTextarea.focus() : editor?.commands.focus();
    }
  };

  const handleSubtitleKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    const titleTextarea = titleTextareaRef.current;
    const subtitleTextarea = subtitleTextareaRef.current;

    if (!titleTextarea || !subtitleTextarea) return;

    if (
      (event.key === "ArrowDown" || event.key === "Enter") &&
      isLastLine(subtitleTextarea)
    ) {
      event.preventDefault();
      editor?.commands.focus();
    }

    if (event.key === "ArrowUp" && isFirstLine(subtitleTextarea)) {
      event.preventDefault();
      titleTextarea.focus();
    }
  };

  return (
    <>
      <Box px="24px">
        <HStack spacing="20px" mb="10px">
          {!backgroundImage && (
            <Popover placement="bottom-start">
              <PopoverTrigger>
                <Button
                  variant="text"
                  leftIcon={
                    isUploading ? (
                      <Icons.Loading
                        className="animate-spin"
                        width="24px"
                        height="24px"
                      />
                    ) : (
                      <Icons.Photo width="24px" height="24px" />
                    )
                  }
                >
                  {isUploading ? "Đang tải lên" : "Tải ảnh lên"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[732px]">
                <PopoverCloseButton />
                <PopoverHeader>Tải ảnh lên</PopoverHeader>
                <PopoverBody className="p-5">
                  <div
                    className="flex items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer select-none hover:bg-gray-100"
                    onClick={() => inputRef.current?.click()}
                  >
                    <div className="flex items-center gap-2 p-2 text-xl font-semibold rounded-lg cursor-pointer text-slate-500">
                      <Icons.Photo width={24} height={24} /> Thêm ảnh
                      <input
                        className="hidden"
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        onChange={handleFileChange}
                        ref={inputRef}
                      />
                    </div>
                  </div>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          )}
          {!isAddSubtitle && (
            <Button
              variant="text"
              leftIcon={<Icons.Bars3BottomLeft width="24px" height="24px" />}
              onClick={() => setIsAddSubtitle(true)}
            >
              Thêm phụ đề
            </Button>
          )}

          <Button
            onClick={() =>
              updateDraft.mutate({
                id: draft.id,
                description: content,
                title: title,
                brief: subtitle,
                mainImage: backgroundImage,
              })
            }
          >
            Update
          </Button>
        </HStack>
        {backgroundImage && (
          <Box className="relative aspect-[40/21]">
            <Tooltip label="Xóa ảnh bìa">
              <IconButton
                colorScheme="gray"
                className="absolute top-1 right-1"
                aria-label={"Delete background image"}
                onClick={() => setBackgroundImage("")}
              >
                <Icons.XMark width="24px" height="24px" />
              </IconButton>
            </Tooltip>
            <div
              style={{
                width: "100%",
                height: "100%",
                background: `url(${backgroundImage}) no-repeat center center / cover`,
              }}
            />
          </Box>
        )}
        <TextareaAutosize
          className="w-full text-4xl font-bold leading-relaxed border-none outline-none resize-none"
          placeholder="Tiêu đề..."
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleTitleKeyDown}
          ref={titleTextareaRef}
        />

        {isAddSubtitle && (
          <TextareaAutosize
            className="w-full text-3xl font-medium border-none outline-none resize-none"
            placeholder="Phụ đề..."
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            onKeyDown={handleSubtitleKeyDown}
            ref={subtitleTextareaRef}
          />
        )}

        <EditorContent
          editor={editor}
          titleTextareaRef={titleTextareaRef}
          subtitleTextareaRef={subtitleTextareaRef}
        />
      </Box>
      <CommonToolbar editor={editor} />
      <LinkToolbar editor={editor} />
    </>
  );
};

export default Editor;

const isLastLine = (textarea: HTMLTextAreaElement) => {
  const { value, selectionEnd } = textarea;
  const lastLineIndex = value.lastIndexOf("\n", selectionEnd - 1);
  const lastLineLength = value.length - lastLineIndex - 1;

  return lastLineLength === selectionEnd;
};

const isFirstLine = (textarea: HTMLTextAreaElement) => {
  const { value, selectionStart } = textarea;
  const firstLineIndex = value.lastIndexOf("\n", selectionStart - 1);
  const firstLineLength =
    firstLineIndex === -1
      ? selectionStart
      : selectionStart - firstLineIndex - 1;

  return firstLineLength === selectionStart;
};
