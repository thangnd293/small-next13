import { Link } from "@chakra-ui/next-js";
import { Button, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";

export default function Custom404() {
  return (
    <VStack w="full" h="100vh" alignItems="center" justifyContent="center">
      <Image src={"/images/404.png"} alt={"404"} width={400} height={400} />
      <Text pt={10} fontSize="28px" fontWeight="bold" fontFamily="sans-serif">
        Chúng tôi không thể tìm thấy trang bạn đang tìm kiếm!
      </Text>
      <Link
        href="/"
        style={{
          borderRadius: "999px",
          padding: "10px 20px",
          border: "1px solid #319795",
          color: "#319795",
          textDecoration: "unset",
        }}
      >
        Về trang chủ
      </Link>
    </VStack>
  );
}
