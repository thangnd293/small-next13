"use client";

import "@/styles/tiptap.scss";

import { Box, Button, HStack } from "@chakra-ui/react";
import Focus from "@tiptap/extension-focus";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import { BubbleMenu, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextareaAutosize from "react-textarea-autosize";

import {
  BoilerplateDocument,
  SlashCommands,
  getSuggestionItems,
  render,
} from "@/lib/tiptap";

import LinkComponent from "@/lib/tiptap/link/Extension";

import { useRef, useState } from "react";
import EditorContent from "./EditorContent";
import Icons from "../Icons";
const Editor = () => {
  const [isAddSubtitle, setIsAddSubtitle] = useState(false);

  const titleTextareaRef = useRef<HTMLTextAreaElement>(null);
  const subtitleTextareaRef = useRef<HTMLTextAreaElement>(null);

  const editor = useEditor({
    extensions: [
      BoilerplateDocument,
      LinkComponent,
      StarterKit.configure({
        document: false,
        bulletList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
      }),
      Highlight,
      SlashCommands.configure({
        suggestion: {
          items: getSuggestionItems,
          render,
        },
      }),
      Placeholder.configure({
        placeholder: ({ node, pos }) => {
          if (node.type.name === "heading") {
            return pos === 0 ? "Tiêu đề bài viết ?" : "Heading 1";
          }

          return 'Nhập " / " để mở các lệnh…';
        },
      }),
      Focus,
    ],
    editorProps: {
      attributes: {
        class: "outline-none",
      },
    },
  });

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
          <Button
            variant="text"
            leftIcon={<Icons.Photo width="24px" height="24px" />}
          >
            Thêm ảnh bìa
          </Button>
          {!isAddSubtitle && (
            <Button
              variant="text"
              leftIcon={<Icons.Bars3BottomLeft width="24px" height="24px" />}
              onClick={() => setIsAddSubtitle(true)}
            >
              Thêm phụ đề
            </Button>
          )}
        </HStack>

        <TextareaAutosize
          className="w-full text-4xl font-bold outline-none border-none resize-none"
          placeholder="Tiêu đề..."
          autoFocus
          onKeyDown={handleTitleKeyDown}
          ref={titleTextareaRef}
        />

        {isAddSubtitle && (
          <TextareaAutosize
            className="w-full text-3xl font-medium outline-none border-none resize-none"
            placeholder="Phụ đề..."
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
      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "is-active" : ""}
          >
            bold
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "is-active" : ""}
          >
            italic
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            className={editor.isActive("strike") ? "is-active" : ""}
          >
            strike
          </button>
        </BubbleMenu>
      )}
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
