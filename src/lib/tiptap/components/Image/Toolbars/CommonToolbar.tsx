import { ToolbarButton } from "@/components/Editor";
import Icons from "@/components/Icons";
import { NodeViewProps } from "@tiptap/react";
import { Fragment } from "react";

type TProps = Pick<NodeViewProps, "deleteNode"> & {
  updateToolbar: (toolbar: string) => void;
};
export const CommonToolbar = ({ updateToolbar, deleteNode }: TProps) => {
  const actions = [
    {
      name: "Tải ảnh lên",
      icon: Icons.Upload,
      onClick: () => updateToolbar("upload"),
      hasDivider: true,
    },
    {
      name: "Xóa",
      icon: Icons.Trash,
      onClick: () => deleteNode(),
    },
  ];

  return (
    <div className="flex items-center gap-2 p-2">
      {actions.map((item) => (
        <Fragment key={item.name}>
          <ToolbarButton
            label={item.name}
            Icon={item.icon}
            onClick={item.onClick}
          />
          {item.hasDivider && <hr className="border-l h-7 " />}
        </Fragment>
      ))}
    </div>
  );
};
