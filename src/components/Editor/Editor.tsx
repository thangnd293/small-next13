import "@/styles/tiptap.scss";

import {
  BoilerplateDocument,
  SlashCommands,
  getSuggestionItems,
  render,
} from "@/lib/tiptap";
import { useRef, useState } from "react";

import css from "highlight.js/lib/languages/css";
import java from "highlight.js/lib/languages/java";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import { lowlight } from "lowlight/lib/core";

import { Box, Button, HStack } from "@chakra-ui/react";
import Code from "@tiptap/extension-code";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextareaAutosize from "react-textarea-autosize";

import { ImageComponent } from "@/lib/tiptap/components/Image";
import Icons from "../Icons";
import EditorContent from "./EditorContent";
import { CommonToolbar, LinkToolbar } from "./Toolbars";

lowlight.registerLanguage("html", html);
lowlight.registerLanguage("css", css);
lowlight.registerLanguage("js", js);
lowlight.registerLanguage("ts", ts);
lowlight.registerLanguage("java", java);

import CodeBlockExtension from "@/lib/tiptap/components/CodeBlock/CodeBlockExtension";

const CustomLink = Link.extend({
  selectable: true,
  addAttributes() {
    return {
      ...this.parent?.(),
      "data-id": {
        default: null,
      },
    };
  },
});

const Editor = () => {
  const [isAddSubtitle, setIsAddSubtitle] = useState(false);

  const titleTextareaRef = useRef<HTMLTextAreaElement>(null);
  const subtitleTextareaRef = useRef<HTMLTextAreaElement>(null);
  const editor = useEditor({
    extensions: [
      CodeBlockExtension,
      ImageComponent,
      BoilerplateDocument,
      CustomLink.configure({
        openOnClick: false,
        autolink: false,
      }),
      StarterKit.configure({
        document: false,
        codeBlock: false,
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
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
      Code,

      CodeBlockLowlight.configure({
        lowlight,
        exitOnTripleEnter: false,
        exitOnArrowDown: false,
        defaultLanguage: "js",
      }),
    ],
    editorProps: {
      attributes: {
        class: "outline-none pb-40 min-h-screen",
      },
    },
    content: ``,
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
          className="w-full text-4xl font-bold leading-relaxed border-none outline-none resize-none"
          placeholder="Tiêu đề..."
          autoFocus
          onKeyDown={handleTitleKeyDown}
          ref={titleTextareaRef}
        />

        {isAddSubtitle && (
          <TextareaAutosize
            className="w-full text-3xl font-medium border-none outline-none resize-none"
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
