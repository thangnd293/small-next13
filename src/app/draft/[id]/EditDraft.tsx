"use client";

import IconButton from "@/components/IconButton";
import Icons from "@/components/Icons";
import PublicArticle from "@/components/PublicArticle";
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
import { Fragment } from "react";
import Editor from "./Editor";

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
  const SaveStateWrapper = isSaved ? Fragment : VisuallyHidden;

  return (
    <Box
      as="main"
      flex="1"
      borderLeft="1px"
      borderColor="gray.50"
      maxW={`calc(100% - ${isOpenSidebar ? "304px" : "0px"})`}
    >
      <HStack h="72px" px="16px" justify="space-between">
        <IconButton aria-label={"Toggle sidebar"} onClick={toggleSidebar}>
          <Icons.Sidebar />
        </IconButton>
        <HStack>
          <SaveStateWrapper>
            <Text
              color={isSaving ? "gray.500" : "green.500"}
              size="sm"
              mr={3}
              className="flex items-center gap-1.5"
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
          >
            Xem trước
          </Button>
          <PublicArticle />
        </HStack>
      </HStack>
      <Box minH="calc(100% - 72px)">
        <Editor draft={draft} />
      </Box>
    </Box>
  );
}
