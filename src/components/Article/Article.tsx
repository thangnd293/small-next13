"use client";

import {
  Avatar,
  Badge,
  Box,
  HStack,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import Icons from "../Icons";

import { Image, Link } from "@chakra-ui/next-js";
import IconButton from "../IconButton";
import { ArticleSkeleton } from "./ArticleSkeleton";
import { ArticleStatus, Article as TArticle } from "@/types/common";
import {
  getArticleBookmarkedKey,
  useBookmarkArticle,
  useDeleteArticle,
  useUnBookmarkArticle,
} from "@/services/client";
import { useQueryClient } from "@tanstack/react-query";
import { useGlobalContext } from "@/context/GlobalContext";
import { usePathname, useRouter } from "next/navigation";
import ActionButton from "../ActionButton";
import { useState } from "react";
import { toast } from "react-toastify";
import { getUserArticleOfUserKey } from "@/services/client/use-articles-of-user";
import ConfirmDialog from "../ConfirmDialog";
import { useChangeStatusArticle } from "@/services/client/use-change-status-article";

const MAX_KEYWORDS_SHOW = 3;
interface Props {
  article: TArticle;
  hasBookmarked?: boolean;
}
export const Article = ({ article, hasBookmarked }: Props) => {
  const { user, category } = article;
  const { userInfo } = useGlobalContext();

  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const onSuccess = () =>
    queryClient.invalidateQueries(getArticleBookmarkedKey(userInfo?.id));

  const bookmarkArticle = useBookmarkArticle({ onSuccess });
  const unbookmarkArticle = useUnBookmarkArticle({ onSuccess });

  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  const handleToggleBookmark = () => {
    if (!userInfo) {
      return router.push(`/login?from=${pathname}`);
    }
    const payload = { articleId: article.id, userId: userInfo.id };

    if (hasBookmarked) {
      unbookmarkArticle.mutate(payload);
    } else {
      bookmarkArticle.mutate(payload);
    }
  };

  const keywords = article.keyword?.split(",") || [];
  const keywordsLeft = keywords.length - MAX_KEYWORDS_SHOW;

  const IconBookmark = hasBookmarked ? Icons.Bookmarked : Icons.Bookmark;

  const isSelfArticle = userInfo?.id === article.user?.id;
  const deleteArticle = useDeleteArticle();
  const changeStatus = useChangeStatusArticle();

  const onOpenConfirmDelete = () => {
    setIsOpenDelete(true);
  };

  const onDelete = () => {
    if (!userInfo) return;

    deleteArticle.mutate(article.id, {
      onSuccess: () => {
        queryClient.invalidateQueries(
          getUserArticleOfUserKey(userInfo.username, article.status)
        );
        queryClient.invalidateQueries(getArticleBookmarkedKey(userInfo.id));
        toast.success("Xóa bài viết thành công");
        setIsOpenDelete(false);
      },
    });
  };

  const onOpenConfirmEdit = () => {
    setIsOpenEdit(true);
  };

  const onEdit = () => {
    if (!userInfo) return;

    changeStatus.mutate(
      {
        articleId: article.id,
        status: ArticleStatus.Draft,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(
            getUserArticleOfUserKey(userInfo.username, article.status)
          );

          queryClient.invalidateQueries(getArticleBookmarkedKey(userInfo.id));

          router.push(`/draft/${article.id}`);
        },
      }
    );
  };

  const actions = [
    {
      label: "Chỉnh sửa",
      icon: <Icons.Pencil width={14} />,
      onClick: onOpenConfirmEdit,
    },
    {
      label: "Xóa",
      icon: <Icons.Trash width={14} />,
      color: "red.500",
      onClick: onOpenConfirmDelete,
    },
  ];

  const isNotPublished = article.status !== ArticleStatus.Approve;
  if (!user) {
    console.log("article", article);
  }
  return (
    <>
      <Box
        className="group"
        pb="20px"
        borderBottom="1px"
        borderColor="gray.50"
        _dark={{
          borderColor: "gray.700",
        }}
        position="relative"
      >
        <VStack align="flex-start" spacing="16px">
          <HStack>
            <HStack
              as={Link}
              href={isSelfArticle ? `/profile` : `/user/${user.username}`}
              spacing="10px"
            >
              <Avatar size="xs" src={user.image || undefined} />
              <Text
                fontSize="xs"
                _dark={{
                  color: "gray.300",
                }}
              >
                {isSelfArticle ? "Bạn" : user.name}
              </Text>
            </HStack>
            <Text
              fontSize="xs"
              ml="4px !important"
              _dark={{
                color: "gray.300",
              }}
            >
              <Text
                as="span"
                color="gray.500"
                _dark={{
                  color: "gray.400",
                }}
              >
                đăng trong
              </Text>
              <Link href={`/search?category=${category?.name}`}>
                {" "}
                {category?.name}
              </Link>
              <Text as="span" color="gray.500" px="10px">
                ·
              </Text>
              {article.updatedAt?.toDateString() ||
                article.updatedAt.toDateString()}
            </Text>
          </HStack>
          <HStack
            as={isNotPublished ? undefined : Link}
            href={`/${encodeURIComponent(article.slug)}`}
            align="flex-start"
            spacing="64px"
            w="full"
          >
            <Box flex={1}>
              <Heading
                fontSize="lg"
                _dark={{
                  color: "gray.300",
                }}
              >
                {article.title}
              </Heading>
              <Text
                mt="16px"
                noOfLines={3}
                _dark={{
                  color: "gray.300",
                }}
              >
                {article.shortDescription}
              </Text>
            </Box>
            <Image
              className="object-cover"
              width={120}
              height={120}
              src={article.thumbnail || article.mainImage}
              alt={"thumbnail"}
            />
          </HStack>
        </VStack>
        <HStack mt="22px" align="center" justify="space-between">
          <HStack>
            {!isSelfArticle && (
              <IconButton
                aria-label="Bookmark"
                onClick={handleToggleBookmark}
                _dark={{
                  color: "gray.300",
                  _hover: {
                    bg: "gray.700",
                  },
                }}
              >
                {unbookmarkArticle.isLoading || bookmarkArticle.isLoading ? (
                  <Icons.Loading width={24} className="animate-spin" />
                ) : (
                  <IconBookmark width={24} />
                )}
              </IconButton>
            )}
            {keywords.slice(0, MAX_KEYWORDS_SHOW).map((keyword) => (
              <Badge
                key={keyword}
                as={Link}
                href={`/search?keyword=${keyword}`}
                _dark={{
                  color: "gray.300",
                  bg: "gray.700",
                }}
              >
                {keyword}
              </Badge>
            ))}
            {keywordsLeft > 0 && (
              <Badge
                _dark={{
                  color: "gray.300",
                  bg: "gray.700",
                }}
              >{`+${keywordsLeft}`}</Badge>
            )}
          </HStack>
          <HStack
            color="gray.500"
            _dark={{
              color: "gray.300",
            }}
          >
            <Icons.Heart width="24px" height="24px" color="currentColor" />
            <Text>{article.totalLike}</Text>
          </HStack>
        </HStack>
        <ActionButton
          actions={actions}
          aria-label={"Action"}
          w="fit-content"
          position="absolute"
          right={0}
          top={0}
        />
      </Box>
      <ConfirmDialog
        title="Sửa bài viết"
        content="Bạn có chắc chắn muốn sửa bài viết này? Thao tác này sẽ khiến bài viết của bạn chuyển về trạng thái cá nhân và phải chờ duyệt lại."
        okText="Sửa"
        isOpen={isOpenEdit}
        isProcessing={changeStatus.isLoading}
        onClose={() => setIsOpenEdit(false)}
        onOk={onEdit}
      />
      <ConfirmDialog
        title="Xóa bài viết"
        content="Bạn có chắc chắn muốn xóa bài viết này? Thao tác này không thể hoàn tác."
        okText="Xóa"
        isOpen={isOpenDelete}
        isProcessing={deleteArticle.isLoading}
        onClose={() => setIsOpenDelete(false)}
        onOk={onDelete}
      />
    </>
  );
};

Article.Skeleton = ArticleSkeleton;
