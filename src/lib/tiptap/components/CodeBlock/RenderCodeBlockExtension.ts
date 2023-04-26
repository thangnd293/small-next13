import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";

import { CodeBlock } from "./CodeBlock";
export default Node.create({
  name: "codeBlockComponent",

  group: "block",

  content: "block",

  selectable: false,
  draggable: false,

  addAttributes() {
    return {
      language: {
        default: "javascript",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "code-block",
      },
    ];
  },


  renderHTML({ HTMLAttributes }) {
    return ["code-block", mergeAttributes(HTMLAttributes), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(CodeBlock);
  },
});

