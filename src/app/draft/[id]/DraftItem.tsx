import Icons from "@/components/Icons";
import { getDraftsKey, useDeleteDraft } from "@/services/client";
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

interface Props {
  draft: Partial<Article>;
  isActive?: boolean;
}
export default function DraftItem({ draft, isActive }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const draftName = draft.title || "Bản nháp";
  const deleteDraft = useDeleteDraft({
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
      onClick={() => router.replace(`/draft/${draft.id}`)}
    >
      <Icons.DocumentChartBar width="22px" height="22px" />
      <Text flex={1} noOfLines={1}>
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
          <MenuItem
            fontSize="14px"
            icon={<Icons.Trash width={14} />}
            onClick={handleDelete}
          >
            Delete
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}
