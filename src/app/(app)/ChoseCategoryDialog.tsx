"use client";

import Icons from "@/components/Icons";
import { useGlobalContext } from "@/context/GlobalContext";
import { useCategories, useUpdateCategories } from "@/services/client";
import { Category } from "@/types/common";
import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Tag,
  TagLabel,
  Text,
} from "@chakra-ui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

interface Props {
  isOpen: boolean;
}
export default function ChoseCategoryDialog({ isOpen }: Props) {
  const { userInfo, refreshUserInfo } = useGlobalContext();

  const [_isOpen, setIsOpen] = useState(isOpen);
  const { categories } = useCategories();
  const [categoriesSelected, setCategoriesSelected] = useState<number[]>([]);
  const { mutate: updateCategoriesFollow } = useUpdateCategories({
    onSuccess: () => {
      setIsOpen(false);
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
    updateCategoriesFollow(
      {
        userId: userInfo.id,
        categories: categoriesSelected,
      },
      {
        onSuccess: () => refreshUserInfo(),
      }
    );
  };

  return (
    <Modal
      isOpen={_isOpen}
      onClose={() => setIsOpen(false)}
      size="3xl"
      isCentered
      closeOnOverlayClick={false}
    >
      <ModalOverlay bg="white" backdropFilter="auto" backdropBlur="2px" />
      <ModalContent shadow="none">
        <ModalBody>
          <Text align="center" fontSize="xl">
            Bạn quan tâm đến lĩnh vực nào?
          </Text>
          <Text mt="10px" align="center">
            Chọn tối thiểu 3 loại dưới đây
          </Text>
          <Flex mt="60px" gap="6px" wrap="wrap" justify="center">
            {categories?.map((category) => (
              <CategoryTag
                key={category.id}
                isActive={categoriesSelected.includes(category.id)}
                category={category}
                toggleCategory={toggleCategory}
              />
            ))}
          </Flex>
          <div className="mx-auto mt-10 w-fit">
            <Button
              isDisabled={categoriesSelected.length < 3}
              colorScheme="teal"
              borderRadius="full"
              w={200}
              onClick={handleUpdateCategories}
            >
              Tiếp tục
            </Button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

interface CategoryTagProps {
  isActive?: boolean;
  category: Category;
  toggleCategory: (category: Category) => void;
}

function CategoryTag({ isActive, category, toggleCategory }: CategoryTagProps) {
  return (
    <Tag
      borderRadius="full"
      variant={isActive ? "solid" : "outline"}
      colorScheme="teal"
      cursor="pointer"
      onClick={() => toggleCategory(category)}
    >
      <TagLabel mr={1}>{category.name}</TagLabel>
      {isActive ? <Icons.X width={18} /> : <PlusIcon width={18} />}
    </Tag>
  );
}
