import { displayEditLinkPopup } from "@/lib/tiptap";
import { Editor } from "@tiptap/core";
import { BubbleMenu } from "@tiptap/react";
import Icons from "../Icons";
import classNames from "classnames";

interface IProps {
  editor: Editor | null;
}
const LinkBubbleMenu = ({ editor }: IProps) => {
  if (!editor) return null;

  const actions = [
    {
      name: "Go to",
      action: () => {
        const anchorEl = window.getSelection()?.anchorNode?.parentElement;
        const href = anchorEl?.getAttribute("href");
        if (href) window.open(href, "_blank");
      },
      icon: Icons.Goto,
      isDisabled: () => {
        const anchorEl = window.getSelection()?.anchorNode?.parentElement;
        return !anchorEl?.getAttribute("href");
      },
    },
    {
      name: "Edit",
      action: () => {
        displayEditLinkPopup(editor);
      },
      icon: Icons.Pencil,
    },
    {
      name: "Unlink",
      action: () => {
        editor.chain().focus().unsetLink().run();
      },
      icon: Icons.Unlink,
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
        <button
          key={item.name}
          className={classNames(
            "py-1.5 px-2.5 rounded-full hover:bg-slate-100",
            {
              "text-slate-300 cursor-not-allowed pointer-events-none":
                item.isDisabled?.(),
            }
          )}
          onClick={() => {
            if (item.isDisabled?.()) return;
            item.action();
          }}
        >
          {<item.icon />}
        </button>
      ))}
    </BubbleMenu>
  );
};

export default LinkBubbleMenu;
