import { useEffect, useMemo, useRef, useState } from "react";
import useCloudinaryUpload from "./useCloudinaryUpload";

type Cb = (url: string) => void;

const useUpdateImage = <T extends HTMLElement = HTMLDivElement>(
  onSuccess: Cb
): [(node: T | null) => void, JSX.Element, boolean] => {
  const [ref, setRef] = useState<T | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { handleUploadToCloudinary, isUploading } =
    useCloudinaryUpload(onSuccess);

  const hiddenInput = useMemo(() => {
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      handleUploadToCloudinary(file);
    };

    return (
      <input
        className="hidden"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={inputRef}
      />
    );
  }, [inputRef]);

  useEffect(() => {
    if (ref) {
      ref.addEventListener("click", () => {
        inputRef.current?.click();
      });
    }

    return () => {
      if (ref) {
        ref.removeEventListener("click", () => {
          inputRef.current?.click();
        });
      }
    };
  }, [ref]);

  return [setRef, hiddenInput, isUploading];
};

export default useUpdateImage;
