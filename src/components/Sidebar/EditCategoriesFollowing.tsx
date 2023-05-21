import { CategoryTag } from "@/app/(app)/ChoseCategoryDialog";
import { useGlobalContext } from "@/context/GlobalContext";
import { useCategories, useUpdateCategories } from "@/services/client";
import { Category } from "@/types/common";
import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function EditCategoriesFollowing() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { userInfo, refreshUserInfo } = useGlobalContext();

  const [categoriesSelected, setCategoriesSelected] = useState<number[]>(
    userInfo?.categories?.map((c) => c.id) || []
  );

  useEffect(() => {
    setCategoriesSelected(userInfo?.categories.map((c) => c.id) || []);
  }, [userInfo?.categories]);

  const { categories, isLoading } = useCategories();
  const { mutate: updateCategoriesFollow, isLoading: isUpdating } =
    useUpdateCategories({
      onSuccess: () => {
        refreshUserInfo();
        onClose();
      },
    });

  const toggleCategory = (category: Category) => {
    if (categoriesSelected.includes(category.id)) {
      handleRemoveCategory(category);
    } else {
      handleSelectCategory(category);
    }
  };

  const handleSelectCategory = (category: Category) => {
    setCategoriesSelected([...categoriesSelected, category.id]);
  };

  const handleRemoveCategory = (category: Category) => {
    setCategoriesSelected(
      categoriesSelected.filter((item) => item !== category.id)
    );
  };

  const handleUpdateCategories = async () => {
    if (!userInfo) return;
    updateCategoriesFollow({
      userId: userInfo.id,
      categories: categoriesSelected,
    });
  };

  const canSave = categoriesSelected.length >= 3;

  return (
    <>
      <Button colorScheme="teal" variant="link" mt="14px" onClick={onOpen}>
        Chỉnh sửa
      </Button>
      <Modal
        isOpen={isOpen || isUpdating}
        isCentered
        size="lg"
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text
              fontSize="20px"
              _dark={{
                color: "gray.300",
              }}
            >
              Chọn chủ đề theo dõi
            </Text>
          </ModalHeader>
          <ModalCloseButton
            _dark={{
              color: "gray.300",
            }}
          />
          <ModalBody>
            <Text
              align="center"
              _dark={{
                color: "gray.300",
              }}
            >
              Chọn tối thiểu 3 loại dưới đây
            </Text>
            <Flex w="full" mt="20px" gap="6px" wrap="wrap" justify="center">
              {!isLoading
                ? categories?.map((category) => (
                    <CategoryTag
                      key={category.id}
                      isActive={categoriesSelected.includes(category.id)}
                      category={category}
                      toggleCategory={toggleCategory}
                    />
                  ))
                : Array.from({ length: 5 }).map((_, index) => (
                    <Skeleton
                      key={index}
                      borderRadius="full"
                      w="100px"
                      h="28px"
                    />
                  ))}
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button
              size="sm"
              variant="ghost"
              mr={3}
              onClick={() => {
                setCategoriesSelected(
                  userInfo?.categories.map((c) => c.id) || []
                );
                onClose();
              }}
            >
              Bỏ qua
            </Button>
            <Button
              size="sm"
              colorScheme="teal"
              isDisabled={!canSave}
              isLoading={isUpdating}
              onClick={handleUpdateCategories}
            >
              Lưu
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
