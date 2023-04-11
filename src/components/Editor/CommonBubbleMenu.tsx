import { Editor } from "@tiptap/core";
import { BubbleMenu } from "@tiptap/react";
import classNames from "classnames";
import { Fragment } from "react";
import Icons from "../Icons";
interface IProps {
  editor: Editor | null;
}
const CommonBubbleMenu = ({ editor }: IProps) => {
  if (!editor) return null;

  const actions = [
    {
      name: "Heading 1",
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      icon: Icons.Heading1,
      isActive: () => editor.isActive("heading", { level: 1 }),
      isDisabled: !editor
        .can()
        .chain()
        .focus()
        .toggleHeading({ level: 1 })
        .run(),
    },
    {
      name: "Heading 2",
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      icon: Icons.Heading2,
      isActive: () => editor.isActive("heading", { level: 2 }),
      isDisabled: !editor
        .can()
        .chain()
        .focus()
        .toggleHeading({ level: 2 })
        .run(),
    },
    {
      name: "Heading 3",
      action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      icon: Icons.Heading3,
      isActive: () => editor.isActive("heading", { level: 3 }),
      hasDivider: true,
      isDisabled: !editor
        .can()
        .chain()
        .focus()
        .toggleHeading({ level: 3 })
        .run(),
    },
    {
      name: "Bold",
      action: () => editor.chain().focus().toggleBold().run(),
      icon: Icons.Bold,
      isActive: () => editor.isActive("bold"),
      isDisabled: !editor.can().chain().focus().toggleBold().run(),
    },
    {
      name: "Italic",
      action: () => editor.chain().focus().toggleItalic().run(),
      icon: Icons.Italic,
      isActive: () => editor.isActive("italic"),
      isDisabled: !editor.can().chain().focus().toggleItalic().run(),
    },
    {
      name: "Strike",
      action: () => editor.chain().focus().toggleStrike().run(),
      icon: Icons.Strike,
      isActive: () => editor.isActive("strike"),
      isDisabled: !editor.can().chain().focus().toggleStrike().run(),
    },
    {
      name: "Highlight",
      action: () => editor.chain().focus().toggleHighlight().run(),
      icon: Icons.OutlineHighlight,
      isActive: () => editor.isActive("highlight"),
      isDisabled: !editor.can().chain().focus().toggleHighlight().run(),
    },
    {
      name: "Inline code",
      action: () => editor.chain().focus().toggleCode().run(),
      icon: Icons.Code,
      isActive: () => editor.isActive("code"),
      isDisabled: !editor.can().chain().focus().selectNodeBackward().run(),
    },
    {
      name: "Link",
      action: () => {
        editor
          .chain()
          .focus()
          .toggleLink({ href: "" })
          .extendMarkRange("link")
          .run();

        // displayEditLinkPopup(editor);
      },
      icon: Icons.Link,
      isActive: () => editor.isActive("link"),
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
        <Fragment key={item.name}>
          <button
            className={classNames(
              "py-1.5 px-2.5 rounded-full hover:bg-slate-100",
              {
                "bg-slate-100": item.isActive(),
                "text-slate-300 cursor-not-allowed pointer-events-none":
                  item.isDisabled,
              }
            )}
            onClick={() => {
              if (item.isDisabled) return;
              item.action();
            }}
          >
            {<item.icon width={16} height={16} />}
          </button>
          {item.hasDivider && <div className="w-px h-6 bg-slate-200" />}
        </Fragment>
      ))}
    </BubbleMenu>
  );
};

export default CommonBubbleMenu;
