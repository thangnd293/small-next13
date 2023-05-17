"use client";

import Icons from "@/components/Icons";
import { SearchBar } from "@/components/SearchBar";
import { useCreateDraft, useDrafts } from "@/services/client";
import { Article } from "@/types/common";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDraftContext } from "./DraftContext";
import DraftItem from "./DraftItem";

interface Props {
  drafts: Article[];
  currentDraft: Article;
}
export default function Aside({ drafts: _drafts, currentDraft }: Props) {
  const router = useRouter();

  const { isOpenSidebar } = useDraftContext();

  const { drafts } = useDrafts();
  const createDraft = useCreateDraft({
    onSuccess: () => {
      router.replace("/draft");
    },
  });

  useEffect(() => {
    if (drafts && drafts.length === 0) {
      router.replace("/draft");
    }
  }, [drafts]);

  const allDrafts = drafts || _drafts;

  return (
    <Box
      as="aside"
      w="304px"
      borderLeft="1px"
      borderColor="gray.50"
      display={isOpenSidebar ? "block" : "none"}
      _dark={{
        borderColor: "gray.700",
      }}
    >
      <Flex
        align="center"
        h="72px"
        borderBottom="1px"
        borderColor="gray.50"
        _dark={{
          borderColor: "gray.700",
        }}
      >
        <Button
          variant="text"
          leftIcon={<Icons.ChevronLeft width="16px" height="16px" />}
          fontSize="sm"
          fontWeight="normal"
          color="gray.500"
          ml="16px"
          _dark={{
            color: "gray.300",
            _hover: {
              bg: "gray.700",
            },
          }}
          onClick={() => router.back()}
        >
          Trở lại
        </Button>
      </Flex>
      <VStack p="16px" spacing="30px">
        <SearchBar placeholder="Tìm bản nháp" size="sm" />

        <Accordion defaultIndex={[0, 1]} allowMultiple w="100%">
          <AccordionItem pb="20px">
            <AccordionButton>
              <Box
                as="span"
                flex="1"
                textAlign="left"
                _dark={{
                  color: "gray.300",
                }}
              >
                YÊU THÍCH
              </Box>
              <AccordionIcon />
            </AccordionButton>

            <AccordionPanel
              _dark={{
                color: "gray.300",
              }}
            >
              Bản nháp yêu thích của bạn sẽ xuất hiện ở đây.
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionButton>
              <Box
                as="span"
                flex="1"
                textAlign="left"
                _dark={{
                  color: "gray.300",
                }}
              >
                BẢN NHÁP ( {allDrafts.length} )
              </Box>
              <AccordionIcon />
            </AccordionButton>

            <AccordionPanel
              as={VStack}
              spacing="1px"
              maxH={200}
              overflow="auto"
            >
              {allDrafts.map((draft: Article) => (
                <DraftItem
                  key={draft.id}
                  draft={draft}
                  isActive={currentDraft.id === draft.id}
                />
              ))}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        <Button
          variant="outline"
          colorScheme="teal"
          size="sm"
          w="full"
          leftIcon={<Icons.DocumentPlus width="24px" height="24px" />}
          onClick={() => {
            createDraft.mutate();
          }}
        >
          Bản nháp mới
        </Button>
      </VStack>
    </Box>
  );
}
