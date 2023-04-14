import { displayEditLinkPopup } from "@/lib/tiptap";
import { Editor } from "@tiptap/core";
import { BubbleMenu } from "@tiptap/react";
import Icons from "../../Icons";
import { ToolbarButton } from "../ToolbarButton";

interface IProps {
  editor: Editor | null;
}
export const LinkToolbar = ({ editor }: IProps) => {
  if (!editor) return null;

  const actions = [
    {
      label: "Truy cập",
      onClick: () => {
        const anchorEl = window.getSelection()?.anchorNode?.parentElement;
        const href = anchorEl?.getAttribute("href");
        if (href) window.open(href, "_blank");
      },
      Icon: Icons.Goto,
      isDisabled: () => {
        const anchorEl = window.getSelection()?.anchorNode?.parentElement;
        return !anchorEl?.getAttribute("href");
      },
    },
    {
      label: "Chỉnh sửa",
      onClick: () => {
        displayEditLinkPopup(editor);
      },
      Icon: Icons.Pencil,
    },
    {
      label: "Unlink",
      onClick: () => {
        editor.chain().focus().unsetLink().run();
      },
      Icon: Icons.Unlink,
    },
  ];

  return (
    <BubbleMenu
      className="p-1 bg-white border border-slate-200 rounded-xl shadow-sm space-x-1"
      editor={editor}
      tippyOptions={{ duration: 100 }}
      shouldShow={({ editor }) => {
        return editor.isActive("link");
      }}
    >
      {actions.map((item) => (
        <ToolbarButton
          key={item.label}
          {...item}
          isDisabled={item.isDisabled?.()}
        />
      ))}
    </BubbleMenu>
  );
};
