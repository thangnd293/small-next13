import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { toast } from "react-toastify";

import MultiSelect from "./MultiSelect";
import { Article, ArticleStatus } from "@/types/common";
import { useEffect, useState } from "react";
import { getDraftsKey, useUpdateDraft } from "@/services/client";
import { getArticleKey } from "@/services/client/use-article";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  draft: Article;
}
const PublicArticle = ({ draft }: Props) => {
  const queryClient = useQueryClient();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { mainImage, title: _title, brief: _brief } = draft;

  const [title, setTitle] = useState(_title);
  const [brief, setBrief] = useState(_brief);

  const sendDraft = useUpdateDraft({
    onSuccess: () => {
      queryClient.invalidateQueries(getDraftsKey);
      toast.success("Bài viết của bạn đã gửi về admin để duyệt.");
    },
    onError: (err) => {
      toast.error(err.response?.data.message || "Đã có lỗi xảy ra.");
    },
  });

  useEffect(() => {
    setTitle(_title);
    setBrief(_brief);
  }, [_title, _brief]);

  const handleSendDraft = () => {
    sendDraft.mutate({
      ...draft,
      title,
      brief,
      status: ArticleStatus.Create,
    });

    onClose();
  };

  return (
    <>
      <Button colorScheme="teal" size="sm" onClick={onOpen}>
        Đăng bài
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="4xl"
        isCentered
        closeOnOverlayClick={false}
      >
        <ModalOverlay bg="white" backdropFilter="auto" backdropBlur="2px" />
        <ModalContent shadow="none">
          <ModalHeader />
          <ModalCloseButton />
          <ModalBody>
            <HStack spacing="80px" align="flex-start">
              <Box flex={1}>
                <Text fontSize="md" fontWeight="semibold">
                  Xem lại
                </Text>
                <Box className="relative aspect-[40/21] mt-3">
                  {mainImage ? (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        background: `url(${mainImage}) no-repeat center center / cover`,
                      }}
                    />
                  ) : (
                    <Flex
                      w="full"
                      height="full"
                      bg="gray.100"
                      align="center"
                      justify="center"
                    >
                      <Text fontSize="md" w="70%" align="center">
                        Thêm một hình ảnh chất lượng cao trong câu chuyện của
                        bạn để làm cho nó hấp dẫn hơn đối với độc giả.
                      </Text>
                    </Flex>
                  )}
                </Box>
                <Input
                  mt="4"
                  placeholder="Viết tiêu đề..."
                  variant="flushed"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Input
                  mt="4"
                  placeholder="Viết phụ đề..."
                  variant="flushed"
                  value={brief}
                  onChange={(e) => setBrief(e.target.value)}
                />
                <Alert status="info" mt="4">
                  <AlertIcon />
                  Những thay đổi ở đây sẽ ảnh hưởng đến cách bài viết của bạn
                  xuất hiện như trang chủ của Small và trong hộp thư đến của
                  người đăng ký — chứ không phải nội dung của chính câu chuyện
                  đó.
                </Alert>
              </Box>
              <Box flex={1}>
                <MultiSelect />
                <Button colorScheme="teal" mr={3} onClick={handleSendDraft}>
                  Gửi bài
                </Button>
                <Button variant="ghost" onClick={onClose}>
                  Để sau
                </Button>
              </Box>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PublicArticle;

const options = [
  {
    label: "Option 1",
    value: "option1",
  },
  {
    label: "Option 2",
    value: "option2",
  },
  {
    label: "Option 3",
    value: "option3",
  },
  {
    label: "Option 4",
    value: "option4",
  },
];
