import { Avatar, HStack, IconButton, Text, VStack } from "@chakra-ui/react";
import { Image, Link } from "@chakra-ui/next-js";
import Icons from "./Icons";

export default function Collection() {
  return (
    <div className="relative flex justify-between gap-4 p-4 pr-10 border border-gray-200 rounded-lg bg-gray-50">
      <IconButton
        className="absolute right-1 top-2.5"
        variant="ghost"
        size="sm"
        color="gray.500"
        aria-label={"Option menu"}
      >
        <Icons.EllipsisVertical />
      </IconButton>
      <VStack align="flex-start" spacing="14px">
        <HStack as={Link} href="/" spacing="10px">
          <Avatar size="xs" />
          <Text fontSize="xs">Nguyễn Đắc Thắng</Text>
          <Text fontSize="xs" color="gray.500">
            ·
          </Text>
          <Text fontSize="xs" color="gray.500">
            02/04/2023
          </Text>
          <Text fontSize="xs" color="gray.500">
            ·
          </Text>
          <Icons.Lock />
        </HStack>
        <Text fontSize="lg">Nào rảnh đọc</Text>
        <Text fontSize="md" color="gray.500">
          3 lưu trữ
        </Text>
      </VStack>
      <Image
        width={120}
        height={120}
        src={"/images/thumbnail.png"}
        alt={"thumbnail"}
      />
    </div>
  );
}
