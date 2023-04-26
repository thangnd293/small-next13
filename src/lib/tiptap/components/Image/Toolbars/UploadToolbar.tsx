import Icons from "@/components/Icons";
import { IconButton } from "@chakra-ui/react";
import { useRef } from "react";

type TProps = {
  hiddenUploader: () => void;
  updateToolbar: (toolbar: string) => void;
  handleUploadToCloudinary: (files: File) => void;
};
export const UploadToolbar = ({
  updateToolbar,
  hiddenUploader,
  handleUploadToCloudinary,
}: TProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    handleUploadToCloudinary(file);
    hiddenUploader();
  };

  return (
    <>
      <div className="flex items-center justify-between p-4 font-bold w-96">
        <span>Tải ảnh</span>
        <IconButton
          size="xs"
          onClick={() => updateToolbar("common")}
          aria-label={"Close"}
        >
          <Icons.XMark width={24} height={24} />
        </IconButton>
      </div>

      <div className="px-4 pb-4">
        <div
          className="flex items-center justify-center px-10 py-5 border border-gray-300 border-dashed rounded-md cursor-pointer hover:bg-slate-50"
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
