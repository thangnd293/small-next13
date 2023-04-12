import Icons from "@/components/Icons";
import { IconButton } from "@chakra-ui/react";
import { NodeViewProps } from "@tiptap/react";
import { useRef } from "react";

type TProps = Pick<NodeViewProps, "updateAttributes"> & {
  handleUploadToCloudinary: (files: File) => void;
};
export const UploadToolbar = ({
  updateAttributes,
  handleUploadToCloudinary,
}: TProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    handleUploadToCloudinary(file);
    updateAttributes({
      isOpenToolbar: false,
    });
  };

  return (
    <>
      <div className="w-96 p-4 flex justify-between items-center font-bold">
        <span>Tải ảnh</span>
        <IconButton
          size="xs"
          onClick={() => updateAttributes({ toolbar: "common" })}
          aria-label={"Close"}
        >
          <Icons.XMark width={24} height={24} />
        </IconButton>
      </div>
      <div className="px-4 pb-4">
        <div
          className="px-10 py-5 flex items-center justify-center border border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-slate-50"
          onClick={() => inputRef.current?.click()}
        >
          <p className="flex items-center gap-2 text-slate-500">
            <Icons.Upload width={28} height={28} /> Tải ảnh lên
          </p>
          <input
            className="hidden"
            type="file"
            accept=".png, .jpg, .jpeg"
            onChange={handleFileChange}
            ref={inputRef}
          />
        </div>
      </div>
    </>
  );
};
