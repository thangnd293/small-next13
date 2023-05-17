"use client";

import { useLayoutContext } from "@/app/(app)/LayoutContext";
import { useGlobalContext } from "@/context/GlobalContext";
import { Link } from "@chakra-ui/next-js";
import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Icons, { renderIcon } from "../Icons";
import { SearchBar } from "./SearchBar";
import IconButton from "../IconButton";

export default function Header() {
  const { userInfo } = useGlobalContext();

  const router = useRouter();

  const { colorMode, setColorMode } = useColorMode();
  const { headerRef, isScrollUp } = useLayoutContext();

  const toggleColorMode = () => {
    setColorMode(colorMode === "light" ? "dark" : "light");
  };

  const menuLinkItems = [
    {
      label: "Viết bài",
      href: "/draft",
      icon: Icons.PencilSquare,
    },
    {
      label: "Lưu trữ",
      href: "/profile/library",
      icon: Icons.Bookmark,
    },
    {
      label: "Thống kê",
      href: "/",
      icon: Icons.ChartBar,
    },
  ];

  return (
    <Box
      as="header"
      borderBottom="1px"
      borderBottomColor="gray.50"
      bg="white"
      transform={isScrollUp ? "translateY(-100%)" : "translateY(0)"}
      position="sticky"
      top="0"
      zIndex="500"
      transition="transform 0.2s ease-in-out"
      _dark={{
        borderBottomColor: "gray.700",
        bg: "gray.800",
      }}
      ref={headerRef}
    >
      <Container
        as={Flex}
        maxW={{
          base: "100%",
          "2xl": "1328px",
        }}
        px="24px"
        py="16px"
        justify="space-between"
        gap="20px"
      >
        <HStack spacing="20px" flex="1">
          <HStack spacing="8px" as={Link} href="/" color="teal.500">
            <Icons.Logo />
            <Text fontSize="lg" fontWeight="bold">
              Small
            </Text>
          </HStack>
          <SearchBar placeholder="Tìm kiếm trên Small" />
        </HStack>

        <HStack spacing="20px">
          <Button
            as={Link}
            href="/draft"
            variant="link"
            leftIcon={<Icons.PencilSquare width="20px" height="20px" />}
            display={{
              base: "none",
              md: "flex",
            }}
          >
            Viết bài
          </Button>
          <HStack spacing="10px">
            <IconButton
              aria-label="Toggle Dark mode"
              _dark={{
                color: "gray.300",
                _hover: {
                  bg: "gray.700",
                },
              }}
              onClick={toggleColorMode}
            >
              {colorMode === "light"
                ? renderIcon(Icons.Moon)
                : renderIcon(Icons.Sun)}
            </IconButton>

            <Popover placement="bottom-end">
              <PopoverTrigger>
                <IconButton
                  aria-label="Notification"
                  _dark={{
                    color: "gray.300",
                    _hover: {
                      bg: "gray.700",
                    },
                  }}
                >
                  {renderIcon(Icons.Bell)}
                </IconButton>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverHeader
                  _dark={{
                    color: "gray.300",
                  }}
                >
                  Thông báo!
                </PopoverHeader>
                <PopoverBody>
                  <VStack p={2} justify="center">
                    <Image
                      width={64}
                      height={64}
                      src="/images/work-in-progress.png"
                      alt="Work in progress"
                    />
                    <Text
                      align="center"
                      _dark={{
                        color: "gray.300",
                      }}
                    >
                      Chức năng còn đang trong quá trình phát triển!
                    </Text>
                  </VStack>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </HStack>

          <Menu placement={"bottom-end"}>
            <MenuButton
              as={Avatar}
              w="40px"
              h="40px"
              cursor="pointer"
              src={userInfo?.image || ""}
            />
            {userInfo ? (
              <MenuList>
                <MenuItem>
                  <HStack as={Link} href={"/profile/home"} px={3} py={1}>
                    <Avatar src={userInfo.image || ""} />
                    <Text
                      noOfLines={1}
                      _dark={{
                        color: "gray.300",
                      }}
                    >
                      {userInfo.name}
                    </Text>
                  </HStack>
                </MenuItem>
                <MenuDivider />
                {menuLinkItems.map((item) => {
                  return (
                    <MenuItem
                      key={item.label}
                      as={Link}
                      icon={renderIcon(item.icon)}
                      href={item.href}
                      color="gray.500"
                      _dark={{
                        color: "gray.300",
                      }}
                    >
                      {item.label}
                    </MenuItem>
                  );
                })}
                <MenuDivider />
                <MenuItem
                  color="gray.500"
                  _dark={{
                    color: "gray.300",
                  }}
                  onClick={() => signOut()}
                >
                  Đăng xuất
                </MenuItem>
              </MenuList>
            ) : (
              <MenuList>
                <VStack maxW={300} p={4}>
                  <Avatar size="lg" />
                  <Text fontSize="22" fontWeight="semibold">
                    Đăng ký hoặc đăng nhập vào tài khoản Small của bạn
                  </Text>
                  <Text alignSelf="flex-start">Mất ít hơn một vài giây.</Text>
                  <HStack>
                    <Button
                      colorScheme="teal"
                      onClick={() => router.push("/sign-up")}
                    >
                      Đăng ký
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => router.push("/login")}
                    >
                      Đăng nhập
                    </Button>
                  </HStack>
                </VStack>
              </MenuList>
            )}
          </Menu>
        </HStack>
      </Container>
    </Box>
  );
}
