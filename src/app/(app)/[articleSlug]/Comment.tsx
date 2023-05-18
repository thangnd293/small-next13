"use client";

import Icons from "@/components/Icons";
import {
  getCommentsKey,
  useDeleteComment,
  useUpdateComment,
} from "@/services/client";
import { Comment as TComment } from "@/types/common";
import { Link } from "@chakra-ui/next-js";
import {
  Avatar,
  Box,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Textarea,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { BsCheckLg, BsX } from "react-icons/bs";
import { toast } from "react-toastify";

interface Props extends TComment {
  isSelf?: boolean;
}
export default function Comment({
  name,
  image,
  description,
  createdAt,
  lastModifyDate,
  username,
  isSelf,
  articleId,
  id,
}: Props) {
  const queryClient = useQueryClient();

  const redirectTo = isSelf ? "/profile/home" : `/user/${username}`;
  const displayUsername = isSelf ? "Bạn" : name;
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [value, setValue] = useState(description);

  const updateComment = useUpdateComment({
    onSuccess: () => {
      queryClient.invalidateQueries(getCommentsKey(articleId));
      onClose();
    },
  });

  const deleteComment = useDeleteComment({
    onSuccess: () => {
      queryClient.invalidateQueries(getCommentsKey(articleId));
      toast.success("Xóa bình luận thành công");
    },
  });

  const onCancel = () => {
    onClose();
    setValue(description);
  };

  const onSave = () => {
    updateComment.mutate({
      id,
      description: value,
    });
  };

  const onDelete = () => {
    deleteComment.mutate(id);
  };

  return (
    <Box
      className="group"
      py={6}
      borderBottom="1px solid"
      borderColor="gray.50"
      _dark={{
        borderColor: "gray.600",
      }}
      position="relative"
    >
      <HStack>
        <Avatar size="sm" src={image || undefined} />
        <VStack align="flex-start" spacing={0}>
          <Text
            as={Link}
            href={redirectTo}
            fontSize="14px"
            _dark={{
              color: "gray.300",
            }}
          >
            {displayUsername}
          </Text>

          <Text
            fontSize="14px"
            color="gray.500"
            _dark={{
              color: "gray.400",
            }}
          >
            {lastModifyDate?.fromNow() || createdAt.fromNow()}
          </Text>
        </VStack>
      </HStack>
      {isOpen || updateComment.isLoading ? (
        <>
          <Textarea
            mt={1}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <HStack mt={2} justify="flex-end">
            <IconButton
              variant="ghost"
              size="sm"
              aria-label="Bỏ qua"
              onClick={onCancel}
            >
              <BsX size={24} />
            </IconButton>
            <IconButton
              variant="ghost"
              colorScheme="teal"
              size="sm"
              aria-label="Lưu"
              isLoading={updateComment.isLoading}
            >
              <BsCheckLg size={24} onClick={onSave} />
            </IconButton>
          </HStack>
        </>
      ) : (
        <Text
          mt="10px"
          _dark={{
            color: "gray.300",
          }}
        >
          {description}
        </Text>
      )}

      {isSelf && (
        <Menu>
          <MenuButton
            as={IconButton}
            onClick={(e) => e.stopPropagation()}
            className="hidden group-hover:block"
            size="sm"
            variant="link"
            position="absolute"
            right={2}
            top={4}
            aria-label={"Action"}
          >
            <Icons.EllipsisVertical width={24} height={24} />
          </MenuButton>
          <MenuList minW="100px">
            <MenuItem
              fontSize="14px"
              icon={<Icons.Pencil width={14} />}
              onClick={onOpen}
            >
              Edit
            </MenuItem>
            <MenuItem
              fontSize="14px"
              icon={<Icons.Trash width={14} />}
              onClick={onDelete}
            >
              Delete
            </MenuItem>
          </MenuList>
        </Menu>
      )}
    </Box>
  );
}
