import { useRouter, usePathname } from "next/navigation";
import { Link } from "@chakra-ui/next-js";
import { Flex, HStack, Text } from "@chakra-ui/react";
import { useLayoutContext } from "@/app/(app)/context";
import RecommendSidebar from "./RecommendSidebar";
import InfoSidebar from "./InfoSidebar";

const Sidebar = () => {
  const { headerRef, isScrollUp } = useLayoutContext();
  const header = headerRef.current as HTMLElement;
  const pathname = usePathname();
  console.log(pathname);

  return (
    <Flex
      as="aside"
      display={{
        base: "none",
        lg: "flex",
      }}
      flexDir="column"
      w="450px"
      h="fit-content"
      p="40px 24px 0px 40px"
      position="sticky"
      top={isScrollUp ? "0" : header?.offsetHeight}
      transition="top 0.2s ease-in-out"
    >
      {pathname?.startsWith("/me") ? <InfoSidebar /> : <RecommendSidebar />}
      <HStack as="footer" spacing="10px" mt="auto">
        {Array.from({ length: 3 }).map((_, index) => (
          <Text key={index} as={Link} href="/" color="gray.500" py="24px">
            © 2023
          </Text>
        ))}
      </HStack>
    </Flex>
  );
};

export default Sidebar;
