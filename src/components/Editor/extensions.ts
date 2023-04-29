import {
  BoilerplateDocument,
  SlashCommands,
  getSuggestionItems,
  render,
} from "@/lib/tiptap";

import css from "highlight.js/lib/languages/css";
import java from "highlight.js/lib/languages/java";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import { lowlight } from "lowlight/lib/core";

import Code from "@tiptap/extension-code";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";

import { ImageComponent } from "@/lib/tiptap/components/Image";

lowlight.registerLanguage("html", html);
lowlight.registerLanguage("css", css);
lowlight.registerLanguage("js", js);
lowlight.registerLanguage("ts", ts);
lowlight.registerLanguage("java", java);

import { Extensions } from "@tiptap/react";
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

export const extensions: Extensions = [
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
];
