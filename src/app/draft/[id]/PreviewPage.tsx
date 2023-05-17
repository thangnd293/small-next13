import LaptopScreen from "@/components/LaptopScreen";
import { Box, Button, Text } from "@chakra-ui/react";
import { HiOutlineDocumentMagnifyingGlass } from "react-icons/hi2";
import { useDraftContext } from "./DraftContext";
import { Article } from "@/types/common";

interface Props {
  currentDraft: Article;
}
export default function PreviewPage({ currentDraft }: Props) {
  const { changeIsPreviewMode } = useDraftContext();

  return (
    <>
      <Box
        as="header"
        className="py-5 border-b border-gray-200 bg-gray-50"
        _dark={{
          borderColor: "gray.700",
          bg: "gray.800",
        }}
      >
        <div className="flex flex-row items-center justify-between mx-auto max-w-7xl">
          <Text
            className="flex items-center gap-2 text-lg font-bold"
            _dark={{
              color: "gray.300",
            }}
          >
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
      </Box>
      <div className="w-full flex min-h-screen max-w-full 2xl:max-w-[1328px] justify-between mx-auto">
        <main className="relative py-10 mx-auto w-fit">
          <LaptopScreen url={`/preview/${currentDraft.id}`} />
        </main>
      </div>
    </>
  );
}
