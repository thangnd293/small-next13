import { ToolbarButton } from "@/components/Editor";
import Icons from "@/components/Icons";
import { NodeViewProps } from "@tiptap/react";
import { Fragment } from "react";

type TProps = Pick<NodeViewProps, "updateAttributes" | "deleteNode">;
export const CommonToolbar = ({ updateAttributes, deleteNode }: TProps) => {
  const actions = [
    {
      name: "Tải ảnh lên",
      icon: Icons.Upload,
      onClick: () =>
        updateAttributes({
          toolbar: "upload",
        }),
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
          {item.hasDivider && <hr className="h-7 border-l " />}
        </Fragment>
      ))}
    </div>
  );
};
