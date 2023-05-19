import Icons from "@/components/Icons";
import { getDraftsKey, useDeleteArticle } from "@/services/client";
import { Article } from "@/types/common";
import {
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";

interface Props {
  draft: Partial<Article>;
  isActive?: boolean;
}
export default function DraftItem({ draft, isActive }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const draftName = draft.title || "Bản nháp";
  const deleteDraft = useDeleteArticle({
    onSuccess: () => {
      queryClient.invalidateQueries(getDraftsKey);
      toast.success(`Xóa ${draftName} thành công`);
      router.replace("/draft");
    },
  });

  const handleDelete = () => {
    deleteDraft.mutate(draft.id!);
  };

  return (
    <Flex
      className="group"
      borderRadius="4px"
      bg={isActive ? "gray.50" : "transparent"}
      color="gray.500"
      px="10px"
      py="6px"
      w="full"
      cursor="pointer"
      align="center"
      _hover={{ bg: "gray.50" }}
      _dark={{
        bg: isActive ? "gray.700" : "transparent",
        color: "gray.300",
        _hover: {
          bg: "gray.700",
        },
      }}
      onClick={() => router.replace(`/draft/${draft.id}`)}
    >
      <Icons.DocumentChartBar width="22px" height="22px" />
      <Text
        flex={1}
        noOfLines={1}
        _dark={{
          color: "gray.400",
        }}
      >
        {draftName}
      </Text>
      <Menu>
        <MenuButton onClick={(e) => e.stopPropagation()}>
          <Icons.EllipsisVertical
            width={20}
            className="hidden group-hover:block"
          />
        </MenuButton>
        <MenuList minW="100px">
          <ConfirmDeleteDialog
            isDeleting={deleteDraft.isLoading}
            onDelete={handleDelete}
            {...draft}
          />
        </MenuList>
      </Menu>
    </Flex>
  );
}
