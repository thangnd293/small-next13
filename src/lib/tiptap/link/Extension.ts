import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";

import LinkComponent from "./LinkComponent";

export default Node.create({
  name: "linkComponent",

  group: "inline",
  inline: true,
  atom: true,

  addAttributes() {
    return {
      count: {
        default: 0,
      },
      href: {
        default: "",
      },
      text: {
        default: "Edit this text",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "link-component",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["link-component", mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(LinkComponent);
  },
});
