import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import Image from "./Image";

export const ImageComponent = Node.create({
  name: "imageComponent",

  group: "block",

  draggable: true,

  selectable: false,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      title: {
        default: null,
      },
      isOpenToolbar: {
        default: true,
      },
      toolbar: {
        default: "upload",
      },
      align: {
        default: "center",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "image-component",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["image-component", mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(Image);
  },
});
