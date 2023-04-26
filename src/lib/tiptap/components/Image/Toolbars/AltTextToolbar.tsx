import Icons from "@/components/Icons";
import { Button, IconButton, Input } from "@chakra-ui/react";
import { NodeViewProps } from "@tiptap/react";
import { useRef } from "react";

type TProps = Pick<NodeViewProps, "updateAttributes"> & {
  updateToolbar: (toolbar: string) => void;
  alt: string;
};
export const AltTextToolbar = ({
  updateAttributes,
  updateToolbar,
  alt,
}: TProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onUpdate = () => {
    if (!inputRef.current) return;

    updateAttributes({
      alt: inputRef.current.value,
    });
    updateToolbar("setting");
  };

  return (
    <>
      <div className="flex items-center justify-between p-4 font-bold w-96">
        <span>Thêm văn bản thay thế</span>
        <IconButton
          size="xs"
          onClick={() => updateToolbar("setting")}
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

        <div className="ml-auto w-fit">
          <Button colorScheme="teal" size="sm" onClick={onUpdate}>
            Cập nhật
          </Button>
        </div>
      </div>
    </>
  );
};
