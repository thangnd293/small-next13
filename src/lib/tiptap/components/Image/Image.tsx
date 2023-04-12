import { useRef } from "react";
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

  const { src, alt, isOpenToolbar, toolbar, align } = node.attrs;

  const ref = useRef<HTMLDivElement>(null);

  const { handleUploadToCloudinary, isUploading } = useCloudinaryUpload(
    (value) => updateAttributes({ src: value })
  );

  const showUploader = () => {
    updateAttributes({
      isOpenToolbar: true,
      toolbar: src ? "setting" : "upload",
    });
  };

  const hiddenUploader = () => {
    updateAttributes({
      isOpenToolbar: false,
    });
  };

  useOnClickOutside(ref, hiddenUploader);

  const Toolbar = {
    common: (
      <CommonToolbar
        updateAttributes={updateAttributes}
        deleteNode={deleteNode}
      />
    ),
    upload: (
      <UploadToolbar
        updateAttributes={updateAttributes}
        handleUploadToCloudinary={handleUploadToCloudinary}
      />
    ),
    setting: (
      <SettingToolbar
        updateAttributes={updateAttributes}
        deleteNode={deleteNode}
        align={align}
      />
    ),
    alt: <AltTextToolbar updateAttributes={updateAttributes} alt={alt} />,
  };

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
              className={classNames("flex flex-col", {
                "items-start": align === "left",
                "items-center": align === "center",
                "items-end": align === "right",
              })}
              onClick={showUploader}
            >
              {isUploading || !src ? (
                <div className="w-full h-32 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 hover:bg-gray-100 cursor-pointer select-none">
                  {isUploading ? (
                    <div className="flex items-center gap-2">
                      <Spinner /> Đang tải ảnh
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-slate-500 text-xl font-semibold cursor-pointer  rounded-lg p-2">
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
