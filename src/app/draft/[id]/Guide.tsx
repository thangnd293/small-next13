"use client";

import {
  Box,
  Button,
  CloseButton,
  Flex,
  IconButton,
  Image,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useState } from "react";
import {
  BsQuestionCircleFill,
  BsChevronLeft,
  BsChevronRight,
} from "react-icons/bs";
import { useLocalStorage } from "usehooks-ts";

const Guide = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isShow, setIsShow] = useLocalStorage("guide", true);

  if (!isShow)
    return (
      <Tooltip label="Mở hướng dẫn">
        <IconButton
          display="flex"
          alignItems="center"
          justifyContent="center"
          variant="unstyled"
          position="fixed"
          bottom={2}
          right={2}
          color="gray.500"
          _hover={{ color: "gray.700" }}
          _dark={{ color: "gray.200", _hover: { color: "gray.400" } }}
          onClick={() => setIsShow(true)}
          aria-label={"Open guide"}
        >
          <BsQuestionCircleFill size={26} />
        </IconButton>
      </Tooltip>
    );

  const currentSlide = slides[currentSlideIndex];
  const onNext = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
  };

  const onPrev = () => {
    setCurrentSlideIndex((prev) => (prev - 1) % slides.length);
  };

  return (
    <Box
      id="guide"
      position="fixed"
      bottom={0}
      left={0}
      bg="gray.50"
      h="300px"
      w="full"
    >
      <Box w="fit-content" p="15px" marginLeft="auto">
        <Tooltip label="Đóng hướng dẫn">
          <CloseButton onClick={() => setIsShow(false)} />
        </Tooltip>
      </Box>
      <Box className="flex items-center justify-center">
        <IconButton
          variant="ghost"
          _hover={{
            color: "gray.700",
          }}
          aria-label="Previous guide slide"
          onClick={onPrev}
        >
          <BsChevronLeft size={22} />
        </IconButton>
        <Box className="flex" w="full" maxW="900px" overflow="hidden">
          <Flex
            flexDir="column"
            alignItems="center"
            justifyContent="center"
            mx="auto"
            flexShrink={0}
            height={200}
            w="full"
          >
            <Text align="center" p="10px 50px" fontSize="lg">
              {currentSlide.title}
            </Text>
            {currentSlide.image && (
              <Image
                mx="auto"
                mt="20px"
                src={currentSlide.image}
                width={550}
                height={116}
              />
            )}
          </Flex>
        </Box>
        <IconButton
          variant="ghost"
          _hover={{
            color: "gray.700",
          }}
          aria-label="Next guide slide"
          onClick={onNext}
        >
          <BsChevronRight size={22} />
        </IconButton>
      </Box>
    </Box>
  );
};

const GuideNotSSR = dynamic(() => Promise.resolve(Guide), {
  ssr: false,
});

export default GuideNotSSR;

const slides = [
  {
    title:
      "Chọn văn bản để thay đổi định dạng, thêm tiêu đề và còn nhiều thứ khác...",
    image: "/images/guide/edit-text.gif",
  },
  {
    title:
      "Thêm hình ảnh và đoạn code bằng cách bắt đầu một dòng mới và bấm nút /. Sau đó chọn một trong các tùy chọn.",
    image: "/images/guide/media-image.gif",
  },

  {
    title: (
      <>
        Bạn có thể xem trước bài viết của mình bằng cách bấm vào nút{" "}
        <Button colorScheme="teal" size="sm">
          Xem trước
        </Button>
      </>
    ),
  },
];
