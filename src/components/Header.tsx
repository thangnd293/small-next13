"use client";

import { useLayoutContext } from "@/app/(app)/context";
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
  useColorMode,
} from "@chakra-ui/react";
import IconButton from "./IconButton";
import Icons, { renderIcon } from "./Icons";
import { SearchBar } from "./SearchBar";

export default function Header() {
  const { colorMode, setColorMode } = useColorMode();
  const { headerRef, isScrollUp } = useLayoutContext();

  const toggleColorMode = () => {
    setColorMode(colorMode === "light" ? "dark" : "light");
  };

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
          <SearchBar
            containerProps={{
              display: {
                base: "none",
                md: "flex",
              },
            }}
            placeholder="Tìm kiếm trên Small"
          />
        </HStack>

        <HStack spacing="20px">
          <Button
            as={Link}
            href="/editor"
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
            <IconButton aria-label="Toggle Dark mode" onClick={toggleColorMode}>
              {colorMode === "light"
                ? renderIcon(Icons.Moon)
                : renderIcon(Icons.Sun)}
            </IconButton>

            <Popover placement="bottom-end">
              <PopoverTrigger>
                <IconButton aria-label="Toggle Dark mode">
                  {renderIcon(Icons.Bell)}
                </IconButton>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverHeader>Thông báo!</PopoverHeader>
                <PopoverBody>
                  Are you sure you want to have that milkshake?
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </HStack>

          <Menu placement={"bottom-end"}>
            <MenuButton as={Avatar} w="40px" h="40px" cursor="pointer" />
            <MenuList>
              <MenuItem
                icon={renderIcon(Icons.PencilSquare)}
                color="gray.500"
                _dark={{
                  color: "gray.300",
                }}
              >
                Viết bài
              </MenuItem>
              <MenuItem
                icon={renderIcon(Icons.Bookmark)}
                color="gray.500"
                _dark={{
                  color: "gray.300",
                }}
              >
                Lưu trữ
              </MenuItem>
              <MenuItem
                icon={renderIcon(Icons.Document)}
                color="gray.500"
                _dark={{
                  color: "gray.300",
                }}
              >
                Bản nháp
              </MenuItem>
              <MenuItem
                icon={renderIcon(Icons.ChartBar)}
                color="gray.500"
                _dark={{
                  color: "gray.300",
                }}
              >
                Thống kê
              </MenuItem>
              <MenuDivider />
              <MenuItem
                color="gray.500"
                _dark={{
                  color: "gray.300",
                }}
              >
                Đăng xuất
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Container>
    </Box>
  );
}
