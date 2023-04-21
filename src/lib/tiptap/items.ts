import Icons from "@/components/Icons";
import { Editor, Range } from "@tiptap/core";
import { IconType } from "react-icons";
import "tippy.js/animations/scale.css";
import { displayEditLinkPopup } from "./utils";

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
        .extendMarkRange("link")
        .setLink({ href: "" })
        .command(({ tr }) => {
          tr.insertText("Edit this text");
          return true;
        })
        .run();

      displayEditLinkPopup(editor);
    },
  },
  {
    icon: Icons.Image,
    title: "Image",
    description: "Tải ảnh lên",
    command: ({ editor, range }) => {
      return editor
        .chain()
        .focus()
        .deleteRange(range)
        .insertContentAt(range.from, {
          type: "imageComponent",
        })
        .run();
    },
  },
  {
    icon: Icons.Code,
    title: "Code",
    description: "Thêm một khối mã",
    command: ({ editor, range }) => {
      return editor
        .chain()
        .focus()
        .deleteRange(range)
        .insertContent({
          type: "codeBlockComponent",
          content: [
            {
              type: "codeBlock",
            },
          ],
        })
        .run();
    },
  },
];

export const getSuggestionItems = ({ query }: { query: string }): any => {
  return items
    .filter((item) => item.title.toLowerCase().startsWith(query.toLowerCase()))
    .slice(0, 10);
};
