import { useEffect, useRef, useState } from "react";
import { NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import { useOnClickOutside } from "usehooks-ts";
import {
  Popover,
  PopoverAnchor,
  PopoverBody,
  PopoverContent,
  Portal,
  Spinner,
} from "@chakra-ui/react";
import classNames from "classnames";

import useCloudinaryUpload from "@/hooks/useCloudinaryUpload";
import Icons from "@/components/Icons";
import {
  AltTextToolbar,
  CommonToolbar,
  SettingToolbar,
  UploadToolbar,
} from "./Toolbars";

const Image = (props: NodeViewProps) => {
  const { updateAttributes, node, editor, deleteNode } = props;
  const { src, alt, align, defaultOpen } = node.attrs;

  const [isOpenToolbar, setIsOpenToolbar] = useState(defaultOpen);
  const [toolbar, setToolbar] = useState("upload");

  const ref = useRef<HTMLDivElement>(null);

  const { handleUploadToCloudinary, isUploading } = useCloudinaryUpload(
    (value) => updateAttributes({ src: value })
  );

  const showUploader = () => {
    setIsOpenToolbar(true);
    setToolbar(src ? "setting" : "upload");
  };

  const hiddenUploader = () => {
    setIsOpenToolbar(false);
  };

  const updateToolbar = (value: string) => {
    setToolbar(value);
  };

  useOnClickOutside(ref, hiddenUploader);

  const Toolbar = {
    common: (
      <CommonToolbar updateToolbar={updateToolbar} deleteNode={deleteNode} />
    ),
    upload: (
      <UploadToolbar
        updateToolbar={updateToolbar}
        hiddenUploader={hiddenUploader}
        handleUploadToCloudinary={handleUploadToCloudinary}
      />
    ),
    setting: (
      <SettingToolbar
        updateAttributes={updateAttributes}
        updateToolbar={updateToolbar}
        deleteNode={deleteNode}
        align={align}
      />
    ),

    alt: (
      <AltTextToolbar
        updateAttributes={updateAttributes}
        updateToolbar={updateToolbar}
        alt={alt}
      />
    ),
  };

  const alignItem = align === "center" ? align : `flex-${align}`;

  useEffect(() => {
    updateAttributes({ defaultOpen: false });
  }, []);

  return (
    <NodeViewWrapper draggable="true" data-drag-handle="">
      <Popover
        isOpen={isOpenToolbar && editor.isEditable}
        onClose={hiddenUploader}
        closeOnBlur={false}
        autoFocus={false}
      >
        <PopoverAnchor>
          <div
            className={classNames("rounded-lg hover:cursor-grab", {
              "outline outline-blue-600 outline-offset-2": isOpenToolbar,
            })}
          >
            <div
              className={classNames("flex flex-col")}
              style={{
                alignItems: alignItem,
              }}
              onClick={showUploader}
            >
              {isUploading || !src ? (
                <div className="flex items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer select-none hover:bg-gray-100">
                  {isUploading ? (
                    <div className="flex items-center gap-2">
                      <Spinner /> Đang tải ảnh
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 p-2 text-xl font-semibold rounded-lg cursor-pointer text-slate-500">
                      <Icons.Photo width={24} height={24} /> Thêm ảnh
                    </div>
                  )}
                </div>
              ) : (
                <div className="max-w-4xl">
                  <img src={src} alt={alt} draggable={false} />
                  {/* <p className="text-center">title</p> */}
                </div>
              )}
            </div>
          </div>
        </PopoverAnchor>
        <Portal>
          <PopoverContent w="fit-content">
            <PopoverBody ref={ref} className="p-0">
              {Toolbar[toolbar as keyof typeof Toolbar]}
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>
    </NodeViewWrapper>
  );
};

export default Image;
