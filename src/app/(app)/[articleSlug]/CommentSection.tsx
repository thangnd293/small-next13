"use client";

import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { HiOutlineChatBubbleOvalLeft } from "react-icons/hi2";
import { RiSendPlaneLine } from "react-icons/ri";

import { useGlobalContext } from "@/context/GlobalContext";
import { getCommentsKey, useAddComment, useComments } from "@/services/client";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Comment from "./Comment";

interface Props {
  articleId: number;
  slug: string;
}

export default function CommentSection({ articleId, slug }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { userInfo } = useGlobalContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  const [comment, setComment] = useState("");
  const addComment = useAddComment({
    onSuccess: () => {
      toast.success("Thêm bình luận thành công");
      queryClient.invalidateQueries(getCommentsKey(articleId));
    },
    onError() {
      toast.error("Có lỗi xảy ra. Vui lòng thử lại sau");
    },
  });

  const { comments } = useComments(articleId);

  const handleOpenComments = () => {
    if (!userInfo) {
      return router.push(`/login?from=${encodeURIComponent(slug)}`);
    }
    onOpen();
  };

  const handleSubmit = () => {
    if (!userInfo || !comment.trim()) return;

    addComment.mutate({ userId: userInfo.id, articleId, description: comment });
    setComment("");
  };

  return (
    <>
      <HStack spacing={1}>
        <Button
          ref={btnRef}
          variant="unstyled"
          color="gray.500"
          _dark={{
            color: "gray.400",
            _hover: {
              color: "gray.300",
            },
          }}
          onClick={handleOpenComments}
          className="flex items-center gap-1 hover:text-text-primary"
        >
          <HiOutlineChatBubbleOvalLeft size={22} />
          <Text as="span" fontSize="13px" fontWeight="normal">
            {comments.length}
          </Text>
        </Button>
      </HStack>

      <Drawer
        isOpen={isOpen}
        placement="right"
        size="sm"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton
            _dark={{
              color: "gray.300",
            }}
          />
          <DrawerHeader>
            <Text
              fontSize="16px"
              _dark={{
                color: "gray.300",
              }}
            >
              Bình luận ( {comments.length} )
            </Text>
          </DrawerHeader>

          <DrawerBody px={0}>
            <Box
              px={6}
              borderBottom="1px solid"
              borderColor="gray.50"
              _dark={{
                borderColor: "gray.600",
              }}
            >
              <HStack mb="10px">
                <Avatar size="sm" src={userInfo?.image || ""} />
                <Text
                  fontWeight="semibold"
                  fontSize="14px"
                  _dark={{
                    color: "gray.300",
                  }}
                >
                  {userInfo?.username}
                </Text>
              </HStack>
              <Textarea
                variant="filled"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Viết bình luận của bạn tại đây..."
                size="sm"
                _dark={{
                  color: "gray.300",
                }}
              />
              <HStack justify="end" py="4">
                <Button
                  size="sm"
                  colorScheme="teal"
                  leftIcon={<RiSendPlaneLine />}
                  isLoading={addComment.isLoading}
                  isDisabled={!comment.trim()}
                  onClick={handleSubmit}
                >
                  Gửi
                </Button>
              </HStack>
            </Box>
            <Box px={6}>
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <Comment
                    key={comment.id}
                    {...comment}
                    isSelf={comment.username === userInfo?.username}
                  />
                ))
              ) : (
                <div className="flex flex-col items-center justify-center p-10">
                  <Image
                    width={150}
                    height={150}
                    src="/images/write.png"
                    alt={"Write comment"}
                  />
                  <Text
                    mt={4}
                    _dark={{
                      color: "gray.300",
                    }}
                  >
                    Trở thành người bình luận đầu tiên
                  </Text>
                </div>
              )}
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
