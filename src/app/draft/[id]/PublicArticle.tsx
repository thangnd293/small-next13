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
  VStack,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { toast } from "react-toastify";

import Icons from "@/components/Icons";
import Select from "@/components/Select";
import SelectCreatable from "@/components/SelectCreatable";
import { useGlobalContext } from "@/context/GlobalContext";
import useUpdateImage from "@/hooks/useUpdateImage";
import {
  useCategories,
  usePublicDraft,
  useUpdateDraft,
} from "@/services/client";
import { Article } from "@/types/common";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Option = {
  label: string;
  value: number;
};

interface Props {
  draft: Article;
  isDisabled?: boolean;
}
const PublicArticle = ({ draft, isDisabled }: Props) => {
  const router = useRouter();
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    mainImage,
    thumbnail: _thumbnail,
    title: _title,
    shortDescription,
    category: _category,
    description: _description,
    id,
    brief,
  } = draft;

  const { userInfo } = useGlobalContext();

  const [title, setTitle] = useState(_title);
  const [description, setDescription] = useState(shortDescription);
  const [thumbnail, setThumbnail] = useState(_thumbnail || mainImage);
  const [category, setCategory] = useState<Option | undefined>(() => {
    if (!_category) return;

    return {
      label: _category.name,
      value: _category.id,
    };
  });
  const [keywords, setKeywords] = useState<any>();

  const { categories } = useCategories();
  const [ref, hiddenInput, isUploading] = useUpdateImage((value) =>
    setThumbnail(value)
  );

  const publicDraft = usePublicDraft({
    onSuccess: () => {
      toast.success("Bài viết của bạn đã gửi về admin để duyệt.");
      router.replace("/draft");
    },
    onError: (err) => {
      toast.error(err.response?.data.message || "Đã có lỗi xảy ra.");
    },
  });

  const updateDraft = useUpdateDraft({
    onSuccess: (data) => {
      publicDraft.mutate(data.data.data.id);
    },
    onError: (err) => {
      toast.error(err.response?.data.message || "Đã có lỗi xảy ra.");
    },
  });

  const categoriesOptions: Option[] =
    categories?.map((category) => ({
      label: category.name,
      value: category.id,
    })) || [];

  useEffect(() => {
    setTitle(_title);
    setDescription(shortDescription);
    setThumbnail(_thumbnail || mainImage);
  }, [_title, shortDescription, mainImage, _thumbnail]);

  const isFilled = title?.trim() && description?.trim() && category;
  const handleSendDraft = () => {
    if (!isFilled)
      return toast.error(
        "Để bài viết của bạn xuất hiện với chất lượng tốt vui lòng điền đầy đủ thông tin."
      );
    const payload = {
      id,
      description: _description,
      brief,
      title,
      shortDescription: description,
      thumbnail,
      categoryId: category?.value,
      keyword: keywords?.map((keyword: any) => keyword.value).join(","),
    };

    updateDraft.mutate(payload);

    onClose();
  };

  const isLoading = updateDraft.isLoading || publicDraft.isLoading;

  return (
    <>
      <Button
        colorScheme="teal"
        size="sm"
        onClick={onOpen}
        isDisabled={isDisabled}
      >
        Đăng bài
      </Button>

      <Modal
        isOpen={isOpen || isLoading}
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
                <Box className="relative aspect-[40/21] mt-3 group">
                  {thumbnail ? (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        background: `url(${thumbnail}) no-repeat center center / cover`,
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
                  <div className="absolute inset-0 z-10 items-center justify-center hidden group-hover:flex bg-modal">
                    <div ref={ref} className="w-fit h-fit">
                      <Button
                        isLoading={isUploading}
                        colorScheme="gray"
                        leftIcon={<Icons.Image width={16} />}
                      >
                        {thumbnail ? "Thay đổi" : "Chọn"} thumbnail
                      </Button>
                    </div>
                  </div>
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
                  placeholder="Viết mô tả cho bài viết của bạn"
                  variant="flushed"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <Alert status="info" mt="4">
                  <AlertIcon />
                  Những thay đổi ở đây sẽ ảnh hưởng đến cách bài viết của bạn
                  xuất hiện như trang chủ của Small và trong hộp thư đến của
                  người đăng ký — chứ không phải nội dung của chính câu chuyện
                  đó.
                </Alert>
              </Box>
              <VStack flex={1} align="stretch">
                <Text>
                  Xuất bản dưới tên:{" "}
                  <Text as="span" fontWeight="500">
                    {userInfo?.username}
                  </Text>
                </Text>
                <Select
                  label="Chọn chuyên mục"
                  colorMode={colorMode}
                  options={categoriesOptions}
                  value={category}
                  onChange={(value) => setCategory(value as Option)}
                  isSearchable
                />
                <SelectCreatable
                  label="Chọn từ khóa"
                  value={keywords}
                  onChange={(value) => setKeywords(value)}
                  isMulti
                  options={[]}
                />
                <HStack pt="10px" spacing="4" justify="end">
                  <Button
                    colorScheme="teal"
                    mr={3}
                    isLoading={isLoading}
                    isDisabled={!isFilled}
                    onClick={handleSendDraft}
                  >
                    Gửi bài
                  </Button>
                  <Button variant="ghost" onClick={onClose}>
                    Để sau
                  </Button>
                </HStack>
              </VStack>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
      {hiddenInput}
    </>
  );
};

export default PublicArticle;
