import { Editor } from "@tiptap/core";
import { BubbleMenu } from "@tiptap/react";
import { Fragment } from "react";

import Icons from "../Icons";
import { ToolbarButton } from "./ToolbarButton";

interface IProps {
  editor: Editor | null;
}
const CommonBubbleMenu = ({ editor }: IProps) => {
  if (!editor) return null;

  const actions = [
    {
      label: "Tiêu đề 1",
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      Icon: Icons.Heading1,
      isActive: editor.isActive("heading", { level: 1 }),
      isDisabled: !editor
        .can()
        .chain()
        .focus()
        .toggleHeading({ level: 1 })
        .run(),
    },
    {
      label: "Tiêu đề 2",
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      Icon: Icons.Heading2,
      isActive: editor.isActive("heading", { level: 2 }),
      isDisabled: !editor
        .can()
        .chain()
        .focus()
        .toggleHeading({ level: 2 })
        .run(),
    },
    {
      label: "Tiêu đề 3",
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      Icon: Icons.Heading3,
      isActive: editor.isActive("heading", { level: 3 }),
      hasDivider: true,
      isDisabled: !editor
        .can()
        .chain()
        .focus()
        .toggleHeading({ level: 3 })
        .run(),
    },
    {
      label: "Chữ đậm",
      onClick: () => editor.chain().focus().toggleBold().run(),
      Icon: Icons.Bold,
      isActive: editor.isActive("bold"),
      isDisabled: !editor.can().chain().focus().toggleBold().run(),
    },
    {
      label: "Chữ nghiêng",
      onClick: () => editor.chain().focus().toggleItalic().run(),
      Icon: Icons.Italic,
      isActive: editor.isActive("italic"),
      isDisabled: !editor.can().chain().focus().toggleItalic().run(),
    },
    {
      label: "Chữ gạch ngang",
      onClick: () => editor.chain().focus().toggleStrike().run(),
      Icon: Icons.Strike,
      isActive: editor.isActive("strike"),
      isDisabled: !editor.can().chain().focus().toggleStrike().run(),
    },
    {
      label: "Highlight",
      onClick: () => editor.chain().focus().toggleHighlight().run(),
      Icon: Icons.OutlineHighlight,
      isActive: editor.isActive("highlight"),
      isDisabled: !editor.can().chain().focus().toggleHighlight().run(),
    },
    {
      label: "Inline code",
      onClick: () => editor.chain().focus().toggleCode().run(),
      Icon: Icons.Code,
      isActive: editor.isActive("code"),
      isDisabled: !editor.can().chain().focus().selectNodeBackward().run(),
    },
    {
      label: "Đường dẫn",
      onClick: () => {
        editor.chain().focus().toggleLink({ href: "" }).run();
        // displayEditLinkPopup(editor);
      },
      Icon: Icons.Link,
      isActive: editor.isActive("link"),
      isDisabled: !editor.can().chain().focus().toggleLink({ href: "" }).run(),
    },
  ];

  return (
    <BubbleMenu
      className="flex items-center p-1 bg-white border border-slate-200 rounded-xl shadow-sm space-x-1"
      editor={editor}
      tippyOptions={{ duration: 100 }}
      shouldShow={({ editor, state }) => {
        return !editor.isActive("link") && !state.selection.empty;
      }}
    >
      {actions.map((item) => (
        <Fragment key={item.label}>
          <ToolbarButton {...item} />
          {item.hasDivider && <hr className="h-7 border-l " />}
        </Fragment>
      ))}
    </BubbleMenu>
  );
};

export default CommonBubbleMenu;
