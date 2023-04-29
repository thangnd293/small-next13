import Icons from "@/components/Icons";
import { getDraftsKey, useUpdateDraft } from "@/services";
import { Article, ArticleStatus } from "@/types/common";
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

interface Props {
  draft: Partial<Article>;
  isActive?: boolean;
}
export default function DraftItem({ draft, isActive }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const updateDraft = useUpdateDraft({
    onSuccess: () => {
      queryClient.invalidateQueries(getDraftsKey);
    },
  });

  const handleDelete = () => {
    updateDraft.mutate({ id: draft.id, status: ArticleStatus.Delete });
  };

  return (
    <Flex
      borderRadius="4px"
      bg={isActive ? "gray.50" : "transparent"}
      color="gray.500"
      px="10px"
      py="6px"
      w="full"
      cursor="pointer"
      align="center"
      _hover={{ bg: "gray.50" }}
      onClick={() => router.push(`/draft/${draft.id}`)}
    >
      <Icons.DocumentChartBar width="22px" height="22px" />
      <Text flex={1} noOfLines={1}>
        {draft.title || "Bản nháp"}
      </Text>
      <Menu>
        <MenuButton onClick={(e) => e.stopPropagation()}>
          <Icons.EllipsisVertical width={16} />
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
