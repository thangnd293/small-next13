import Icons from "@/components/Icons";
import { Button, IconButton, Input } from "@chakra-ui/react";
import { NodeViewProps } from "@tiptap/react";
import { useRef } from "react";

type TProps = Pick<NodeViewProps, "updateAttributes"> & {
  alt: string;
};
export const AltTextToolbar = ({ updateAttributes, alt }: TProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onUpdate = () => {
    if (!inputRef.current) return;

    updateAttributes({
      alt: inputRef.current.value,
      toolbar: "setting",
    });
  };

  return (
    <>
      <div className="w-96 p-4 flex justify-between items-center font-bold">
        <span>Thêm văn bản thay thế</span>
        <IconButton
          size="xs"
          onClick={() =>
            updateAttributes({
              toolbar: "setting",
            })
          }
          aria-label={"Close"}
        >
          <Icons.XMark width={24} height={24} />
        </IconButton>
      </div>
      <div className="p-4 space-y-4">
        <Input
          ref={inputRef}
          defaultValue={alt}
          placeholder="Nhập văn bản thay thế vào đây"
        />

        <div className="w-fit ml-auto">
          <Button colorScheme="teal" size="sm" onClick={onUpdate}>
            Cập nhật
          </Button>
        </div>
      </div>
    </>
  );
};
