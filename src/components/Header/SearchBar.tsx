import { useSearchArticle } from "@/services/client";
import { Article } from "@/types/common";
import { Image } from "@chakra-ui/next-js";
import {
  Box,
  Input as ChakraInput,
  HStack,
  InputGroup,
  InputLeftElement,
  InputProps,
  Text,
  VStack,
} from "@chakra-ui/react";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { useDebounce, useOnClickOutside } from "usehooks-ts";
import Icons from "../Icons";

interface IProps extends InputProps {}

export function SearchBar({ ...restProps }: IProps) {
  const router = useRouter();

  const ref = useRef<HTMLDivElement>(null);
  const [keyword, setKeyword] = useState("");
  const keywordDebound = useDebounce(keyword, 300);

  const [isOpenSearchResult, setIsOpenSearchResult] = useState(false);

  const { articleFound, isLoading, isFetching } =
    useSearchArticle(keywordDebound);

  const handleClickOutside = () => {
    setIsOpenSearchResult(false);
  };

  useOnClickOutside(ref, handleClickOutside);

  const handleEnterSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsOpenSearchResult(false);
      router.push(`/search?q=${keyword}`);
    }
  };

  return (
    <InputGroup>
      <InputLeftElement color="gray.500" pointerEvents="none">
        {isLoading && isFetching ? (
          <AiOutlineLoading className="animate-spin" size={18} />
        ) : (
          <Icons.Search width="24px" height="24px" color="currentColor" />
        )}
      </InputLeftElement>
      <Box ref={ref} maxWidth="512px" w="full" position="relative">
        <ChakraInput
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          borderRadius="9999px"
          pl="40px"
          onFocus={() => setIsOpenSearchResult(true)}
          onKeyDown={handleEnterSearch}
          {...restProps}
        />
        {articleFound.length > 0 && (
          <div
            className={classNames(
              "absolute flex-col gap-1 w-full mt-2 py-4 bg-white border border-solid shadow-lg border-border max-h-96 overflow-auto",
              {
                flex: isOpenSearchResult,
                hidden: !isOpenSearchResult,
              }
            )}
          >
            {articleFound.map((article) => (
              <SearchItem
                key={article.id}
                {...article}
                onNavigate={() => setKeyword("")}
              />
            ))}
          </div>
        )}
      </Box>
    </InputGroup>
  );
}

interface ISearchItemProps extends Article {
  onNavigate?: () => void;
}
const SearchItem = ({
  mainImage,
  title,
  totalLike,
  slug,
  user,
  createdAt,
  onNavigate,
}: ISearchItemProps) => {
  const router = useRouter();
  const onClick = () => {
    router.push(`/${slug}`);
    onNavigate?.();
  };

  return (
    <HStack
      px={4}
      py={1}
      _hover={{
        bg: "gray.100",
      }}
      cursor="pointer"
      onClick={onClick}
    >
      <Image
        className="object-cover object-center"
        width={12}
        height={12}
        src={mainImage}
        alt={title}
      />
      <VStack align="start">
        <Text fontSize="14px" noOfLines={1}>
          {title}
        </Text>
        <Text fontSize="14px" color="gray.500" noOfLines={1}>
          {user.name} · {totalLike} lượt thích · {createdAt.toDateString()}
        </Text>
      </VStack>
    </HStack>
  );
};
