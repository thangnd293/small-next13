import LaptopScreen from "@/components/LaptopScreen";
import { Button, Text } from "@chakra-ui/react";
import { HiOutlineDocumentMagnifyingGlass } from "react-icons/hi2";
import { useDraftContext } from "./DraftContext";
import { Article } from "@/types/common";

interface Props {
  currentDraft: Article;
}
export default function PreviewPage({ currentDraft }: Props) {
  const { changeIsPreviewMode } = useDraftContext();

  return (
    <div className="w-full">
      <header className="py-5 border-b border-gray-200 bg-gray-50">
        <div className="flex flex-row items-center justify-between mx-auto max-w-7xl">
          <Text className="flex items-center gap-2 text-lg font-bold">
            <HiOutlineDocumentMagnifyingGlass size={24} />
            Xem trước bản nháp
          </Text>
          <Button
            colorScheme="teal"
            borderRadius="full"
            variant="outline"
            size="sm"
            onClick={() => changeIsPreviewMode(false)}
          >
            Quay về
          </Button>
        </div>
      </header>
      <main className="relative py-10 mx-auto w-fit">
        <LaptopScreen url={`/preview/${currentDraft.id}`} />
      </main>
    </div>
  );
}
