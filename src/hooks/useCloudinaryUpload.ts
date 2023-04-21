import { useCallback, useState } from "react";

const CLOUDINARY_URL = process.env.NEXT_PUBLIC_CLOUDINARY_URL || "";
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_UPLOAD_PRESET || "";

const useCloudinaryUpload = (onDone?: (value: string) => void) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [url, setUrl] = useState<string>("");

  const clearUrl = useCallback(() => setUrl(""), []);
  const handleUploadToCloudinary = useCallback(
    async (file: File) => {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);

      try {
        const data = await fetch(CLOUDINARY_URL, {
          method: "POST",
          body: formData,
        });

        const response = await data.json();
        setUrl(response.secure_url);
        onDone?.(response.secure_url);
      } catch (error) {
        setError(error);
      } finally {
        setIsUploading(false);
      }
    },
    [onDone]
  );

  return {
    handleUploadToCloudinary,
    isUploading,
    error,
    url,
    clearUrl,
  } as const;
};

export default useCloudinaryUpload;
