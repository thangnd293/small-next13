import { useLayoutContext } from "@/app/(app)/LayoutContext";
import { Flex, HStack, Text } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import AuthorInfoSidebar from "./AuthorInfoSidebar";
import InfoSidebar from "./InfoSidebar";
import RecommendSidebar from "./RecommendSidebar";

const Sidebar = () => {
  const { headerRef, isScrollUp } = useLayoutContext();
  const header = headerRef.current as HTMLElement;
  const pathname = usePathname();

  const currentYear = new Date().getFullYear();

  const SidebarShow = getSidebar(pathname);

  return (
    <Flex
      as="aside"
      display={{
        base: "none",
        lg: "flex",
      }}
      flexDir="column"
      w="450px"
      h="100vh"
      p="40px 24px 0px 40px"
      position="sticky"
      top={isScrollUp ? "0" : header?.offsetHeight}
      transition="top 0.2s ease-in-out"
    >
      {<SidebarShow />}
      <HStack as="footer" spacing="10px" mt="auto">
        <Text color="gray.500" py="24px">
          Nhóm 6 © {currentYear}
        </Text>
      </HStack>
    </Flex>
  );
};

export default Sidebar;

const getSidebar = (pathname: string | null) => {
  const firstPath = pathname?.split("/")[1];

  switch (firstPath) {
    case "profile":
      return InfoSidebar;
    case "user":
      return AuthorInfoSidebar;
    default:
      return RecommendSidebar;
  }
};
