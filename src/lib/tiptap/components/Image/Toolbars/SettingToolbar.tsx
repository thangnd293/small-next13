import { ToolbarButton } from "@/components/Editor";
import Icons from "@/components/Icons";
import { NodeViewProps } from "@tiptap/react";
import React, { Fragment } from "react";

type TProps = Pick<NodeViewProps, "updateAttributes" | "deleteNode"> & {
  updateToolbar: (toolbar: string) => void;
  align: string;
};

export const SettingToolbar = ({
  updateAttributes,
  deleteNode,
  align,
  updateToolbar,
}: TProps) => {
  const actions = [
    {
      label: "Đổi ảnh",
      Icon: Icons.Replace,
      onClick: () => updateToolbar("upload"),
      hasDivider: true,
    },
    {
      label: "Căn lề trái",
      Icon: Icons.AlignLeft,
      onClick: () => updateAttributes({ align: "start" }),
      isActive: align === "start",
    },
    {
      label: "Căn giữa",
      Icon: Icons.AlignCenter,
      onClick: () => updateAttributes({ align: "center" }),
      isActive: align === "center",
    },
    {
      label: "Căn lề phải",
      Icon: Icons.AlignRight,
      onClick: () => updateAttributes({ align: "end" }),
      isActive: align === "end",
      hasDivider: true,
    },
    {
      label: "Cập nhật văn bản thay thế",
      Icon: Icons.Text,
      onClick: () => updateToolbar("alt"),
      hasDivider: true,
    },
    {
      label: "Xóa",
      Icon: Icons.Trash,
      onClick: () => deleteNode(),
    },
  ];

  return (
    <div className="flex items-center gap-2 p-2">
      {actions.map((item) => (
        <Fragment key={item.label}>
          <ToolbarButton {...item} />
          {item.hasDivider && <hr className="border-l h-7 " />}
        </Fragment>
      ))}
    </div>
  );
};
