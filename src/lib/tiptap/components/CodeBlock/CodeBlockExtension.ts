import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";

import { ContentMatch } from "@tiptap/pm/model";
import { Selection } from "prosemirror-state";
import { CodeBlock } from "./CodeBlock";
export default Node.create({
  name: "codeBlockComponent",

  group: "block",

  content: "block",

  draggable: true,

  selectable: false,

  addAttributes() {
    return {
      language: {
        default: "plaintext",
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

  addKeyboardShortcuts() {
    return {
      ArrowDown: ({ editor }) => {
        const { state } = editor;
        const { selection } = state;
        const { empty, $head, $anchor } = selection;

        if (!empty) {
          return false;
        }

        const node = $head.node(-1);
        const doc = $head.node(-2);

        if (node.type.name !== "codeBlockComponent") return false;

        const isAtEnd = doc.lastChild === node;

        if (!isAtEnd) {
          return false;
        }

        if (!$head.parent.type.spec.code || !$head.sameParent($anchor))
          return false;

        return editor
          .chain()
          .command(({ dispatch, tr }) => {
            const after = $head.indexAfter(-1);

            const type = defaultBlockAt(doc.contentMatchAt(after));

            if (!type || !doc.canReplaceWith(after, after, type)) return false;

            if (dispatch) {
              const pos = $head.after();

              const newTr = tr.replaceWith(pos, pos, type.createAndFill()!);
              const temp = newTr.doc.resolve(pos);

              newTr.setSelection(Selection.near(temp, 1));
              dispatch(newTr.scrollIntoView());
            }

            return true;
          })
          .run();
      },
    };
  },

  renderHTML({ HTMLAttributes }) {
    return ["code-block", mergeAttributes(HTMLAttributes), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(CodeBlock);
  },
});

function defaultBlockAt(match: ContentMatch) {
  for (let i = 0; i < match.edgeCount; i++) {
    let { type } = match.edge(i);
    if (type.isTextblock && !type.hasRequiredAttrs()) return type;
  }
  return null;
}
