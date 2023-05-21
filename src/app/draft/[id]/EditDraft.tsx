"use client";

import IconButton from "@/components/IconButton";
import Icons from "@/components/Icons";
import PublicArticle from "@/app/draft/[id]/PublicArticle";
import {
  Box,
  Button,
  Divider,
  HStack,
  Spinner,
  Text,
  VisuallyHidden,
} from "@chakra-ui/react";
import { useDraftContext } from "./DraftContext";
import { Article } from "@/types/common";
import { BsCloudCheck } from "react-icons/bs";
import { Fragment, useEffect, useRef } from "react";
import Editor from "./Editor";
import { useArticle } from "@/services/client/use-article";

interface Props {
  draft: Article;
}
export default function EditDraft({ draft }: Props) {
  const {
    isOpenSidebar,
    toggleSidebar,
    isSaved,
    isSaving,
    changeIsPreviewMode,
  } = useDraftContext();
  const headerRef = useRef<HTMLDivElement>(null);

  const { article } = useArticle(draft.id);

  const currentArticle = article || draft;

  const SaveStateWrapper = isSaved ? Fragment : VisuallyHidden;

  const isDisabled =
    !currentArticle.title.trim() ||
    currentArticle.description.trim() === "<p></p>";

  useEffect(() => {
    const handleScroll = () => {
      const header = headerRef.current;
      if (!header) return;
      if (window.scrollY !== 0) header.style.borderBlockColor = "#F2F2F2";
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box
      as="main"
      flex="1"
      borderLeft="1px"
      borderColor="gray.50"
      _dark={{
        borderColor: "gray.700",
      }}
      maxW={`calc(100% - ${isOpenSidebar ? "304px" : "0px"})`}
    >
      <HStack
        ref={headerRef}
        h="72px"
        px="16px"
        justify="space-between"
        position="sticky"
        top="0"
        zIndex="10"
        bg="white"
        borderBottom="1px solid"
        borderColor="transparent"
        _dark={{
          bg: "gray.800",
        }}
      >
        <IconButton
          aria-label={"Toggle sidebar"}
          onClick={toggleSidebar}
          _dark={{
            color: "gray.300",
            _hover: {
              bg: "gray.700",
            },
          }}
        >
          <Icons.Sidebar />
        </IconButton>
        <HStack>
          <SaveStateWrapper>
            <Text
              className="flex items-center gap-1.5"
              color={isSaving ? "gray.500" : "green.500"}
              size="sm"
              mr={3}
              _dark={{
                color: isSaving ? "gray.400" : "green.400",
              }}
            >
              {isSaving ? <Spinner size="sm" /> : <BsCloudCheck size={18} />}
              {isSaving ? "Đang lưu" : "Đã lưu"}
            </Text>
            <Divider height="40px" orientation="vertical" pr={3} />
          </SaveStateWrapper>
          <Button
            variant="outline"
            colorScheme="teal"
            size="sm"
            onClick={() => changeIsPreviewMode(true)}
            isDisabled={isDisabled}
          >
            Xem trước
          </Button>
          <PublicArticle draft={currentArticle} isDisabled={isDisabled} />
        </HStack>
      </HStack>
      <Box minH="calc(100% - 72px)">
        <Editor draft={currentArticle} />
      </Box>
    </Box>
  );
}
