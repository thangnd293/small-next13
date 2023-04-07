"use client";

import { Editor } from "@/components/Editor";
import IconButton from "@/components/IconButton";
import Icons from "@/components/Icons";
import { SearchBar } from "@/components/SearchBar";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  VStack,
  Text,
  HStack,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EditorPage() {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  const router = useRouter();

  return (
    <>
      <Box
        as="aside"
        w="304px"
        borderLeft="1px"
        borderColor="gray.50"
        display={isOpenSidebar ? "block" : "none"}
      >
        <Flex align="center" h="72px" borderBottom="1px" borderColor="gray.50">
          <Button
            variant="text"
            leftIcon={<Icons.ChevronLeft width="16px" height="16px" />}
            fontSize="sm"
            fontWeight="normal"
            color="gray.500"
            ml="16px"
            onClick={() => router.back()}
          >
            Trở lại
          </Button>
        </Flex>
        <VStack p="16px" spacing="30px">
          <SearchBar placeholder="Tìm bản nháp" size="sm" />
          <Accordion allowMultiple w="100%">
            <AccordionItem pb="20px">
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  YÊU THÍCH
                </Box>
                <AccordionIcon />
              </AccordionButton>

              <AccordionPanel>
                Bản nháp yêu thích của bạn sẽ xuất hiện ở đây.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  BẢN NHÁP ( 2 )
                </Box>
                <AccordionIcon />
              </AccordionButton>

              <AccordionPanel as={VStack} spacing="1px">
                {Array.from({ length: 2 }).map((_, index) => (
                  <Flex
                    key={index}
                    borderRadius="4px"
                    bg="gray.50"
                    color="gray.500"
                    px="10px"
                    py="6px"
                    w="full"
                  >
                    <Icons.DocumentChartBar width="22px" height="22px" />
                    <Text noOfLines={1}>Draft name</Text>
                  </Flex>
                ))}
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
          <Button
            variant="outline"
            colorScheme="teal"
            size="sm"
            w="full"
            leftIcon={<Icons.DocumentPlus width="24px" height="24px" />}
          >
            Bản nháp mới
          </Button>
        </VStack>
      </Box>

      <Box
        as="main"
        flex="1"
        borderLeft="1px"
        borderColor="gray.50"
        maxW={`calc(100% - ${isOpenSidebar ? "304px" : "0px"})`}
      >
        <HStack h="72px" px="16px" justify="space-between">
          <IconButton
            aria-label={"Toggle sidebar"}
            onClick={() => setIsOpenSidebar((prev) => !prev)}
          >
            <Icons.Sidebar />
          </IconButton>
          <HStack>
            <Button variant="outline" colorScheme="teal" size="sm">
              Xem trước
            </Button>
            <Button colorScheme="teal" size="sm">
              Đăng bài
            </Button>
          </HStack>
        </HStack>
        <Box minH="calc(100% - 72px)">
          <Editor />
        </Box>
      </Box>
    </>
  );
}
