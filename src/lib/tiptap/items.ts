import Icons from "@/components/Icons";
import { Editor, Range } from "@tiptap/core";
import { IconType } from "react-icons";
import tippy, { Instance, Props } from "tippy.js";
import "tippy.js/animations/scale.css";

let popup: Instance<Props> | null;

export type TCommand = ({
  editor,
  range,
}: {
  editor: Editor;
  range: Range;
}) => void;
export type TItem = {
  icon: IconType;
  title: string;
  description: string;
  command: TCommand;
};

const items: TItem[] = [
  {
    icon: Icons.Text,
    title: "Văn bản",
    description: "Bắt đầu viết bằng văn bản thuần",
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setNode("paragraph").run();
    },
  },
  {
    icon: Icons.Heading1,
    title: "Heading 1",
    description: "Tiêu đề lớn",
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 1 })
        .run();
    },
  },
  {
    icon: Icons.Heading2,
    title: "Heading 2",
    description: "Tiêu đề trung bình",
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 2 })
        .run();
    },
  },
  {
    icon: Icons.Heading3,
    title: "Heading 3",
    description: "Tiêu đề nhỏ",
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 3 })
        .run();
    },
  },
  {
    icon: Icons.BulletList,
    title: "Bullet List",
    description: "Tạo một danh sách dấu đầu dòng đơn giản",
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBulletList().run();
    },
  },
  {
    icon: Icons.NumberedList,
    title: "Numbered List",
    description: "Tạo một danh sách đánh số đơn giản",
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleOrderedList().run();
    },
  },
  {
    icon: Icons.Link,
    title: "Link",
    description: "Chèn một liên kết",
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .insertContent("Edit this text")
        .setTextSelection({
          from: range.from,
          to: range.from + "Edit this text".length + 1,
        })
        .toggleLink({ href: "" })
        .run();

      const anchorEl = window.getSelection()?.anchorNode?.parentElement;

      if (!anchorEl) return;

      // if (popup) {
      //   popup.destroy();
      //   popup = null;
      // }

      popup = tippy(anchorEl, {
        content: `
        <div class='wrapper'>
          <input id='text-input' class='input' placeholder='Test'/>
          <input id='link-input' class='input' placeholder='Test'/>
          <button id='btn-insert'>Insert link</button>
        </div>
        `,
        appendTo: () => document.body,
        showOnCreate: true,
        interactive: true,
        trigger: "manual",
        placement: "bottom-start",
        allowHTML: true,
        onMount: (instance) => {
          const textInput = instance.popper.querySelector(
            "#text-input"
          ) as HTMLInputElement;
          const linkInput = instance.popper.querySelector(
            "#link-input"
          ) as HTMLInputElement;

          const btnInsert = instance.popper.querySelector(
            "#btn-insert"
          ) as HTMLButtonElement;

          if (!textInput || !linkInput || !btnInsert) return;
          textInput.focus();
          linkInput.value = anchorEl.getAttribute("href") || "";

          btnInsert.onclick = () => {
            console.log("insert", editor);
            console.log("range", range);
            editor
              .chain()
              .focus()
              .setLink({ href: linkInput.value })
              .selectNodeBackward()
              .run();
            instance.destroy();
          };
        },
      });
    },
  },
  {
    icon: Icons.Text,
    title: "image",
    description: "Văn bản",
    command: ({ editor, range }) => {
      console.log(range);

      console.log(
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .insertContent("Edit this text")
          .setTextSelection({
            from: range.from,
            to: range.from + "Edit this text".length + 1,
          })
          .toggleLink({ href: "" })

          .run()
      );
    },
  },
];

export const getSuggestionItems = ({ query }: { query: string }): any => {
  return items
    .filter((item) => item.title.toLowerCase().startsWith(query.toLowerCase()))
    .slice(0, 10);
};
