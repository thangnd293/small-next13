"use client";

import "@/styles/tiptap.scss";

import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { lowlight } from "lowlight/lib/core";

import { RenderCodeBlockExtension } from "@/lib/tiptap/components/CodeBlock";
import { RenderImageComponent } from "@/lib/tiptap/components/Image";
import css from "highlight.js/lib/languages/css";
import java from "highlight.js/lib/languages/java";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";

lowlight.registerLanguage("html", html);
lowlight.registerLanguage("css", css);
lowlight.registerLanguage("js", js);
lowlight.registerLanguage("ts", ts);
lowlight.registerLanguage("java", java);

interface Props {
  content: string;
}
export default function ViewArticle({ content }: Props) {
  const editor = useEditor({
    extensions: [
      Link,
      StarterKit.configure({
        codeBlock: false,
      }),
      Highlight,
      CodeBlockLowlight.configure({
        lowlight,
      }),

      RenderImageComponent,
      RenderCodeBlockExtension,
    ],
    editorProps: {
      attributes: {
        class: "outline-none pb-14",
      },
    },
    content,
    editable: false,
  });

  return <EditorContent editor={editor} />;
}
