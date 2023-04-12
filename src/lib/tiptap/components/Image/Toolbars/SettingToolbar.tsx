import { ToolbarButton } from "@/components/Editor";
import Icons from "@/components/Icons";
import { NodeViewProps } from "@tiptap/react";
import React, { Fragment } from "react";

type TProps = Pick<NodeViewProps, "updateAttributes" | "deleteNode"> & {
  align: string;
};

export const SettingToolbar = ({
  updateAttributes,
  deleteNode,
  align,
}: TProps) => {
  const actions = [
    {
      label: "Đổi ảnh",
      Icon: Icons.Replace,
      onClick: () => updateAttributes({ toolbar: "upload" }),
      hasDivider: true,
    },
    {
      label: "Căn lề trái",
      Icon: Icons.AlignLeft,
      onClick: () => updateAttributes({ align: "left" }),
      isActive: align === "left",
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
      onClick: () => updateAttributes({ align: "right" }),
      isActive: align === "right",
      hasDivider: true,
    },
    {
      label: "Cập nhật văn bản thay thế",
      Icon: Icons.Text,
      onClick: () => updateAttributes({ toolbar: "alt" }),
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
          {item.hasDivider && <hr className="h-7 border-l " />}
        </Fragment>
      ))}
    </div>
  );
};
