import { Node } from "@tiptap/core";
import classNames from "classnames";

export const ImageComponent = Node.create({
  name: "imageComponent",

  group: "block",

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
    const { align, ...rest } = HTMLAttributes;

    return [
      "div",
      {
        class: classNames("flex overflow-hidden max-w-full", {
          "justify-start": align === "start",
          "justify-center": align === "center",
          "justify-end": align === "end",
        }),
      },
      ["img", { ...rest, class: "block max-w-full" }],
    ];
  },
});
