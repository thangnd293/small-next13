import { useGlobalContext } from "@/context/GlobalContext";
import { Image, Link } from "@chakra-ui/next-js";
import {
  Box,
  Button,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import Icons from "../Icons";
import RegisterWriterDialog from "./RegisterWriterDialog";

export default function WriteArticleControl() {
  const { userInfo } = useGlobalContext();

  if (!userInfo) return null;

  const hasRegistered = !!userInfo.reason;

  return userInfo.contentCreator ? (
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
  ) : (
    <Popover>
      <PopoverTrigger>
        <Button
          variant="link"
          leftIcon={<Icons.PencilSquare width="20px" height="20px" />}
          display={{
            base: "none",
            md: "flex",
          }}
        >
          Viết bài
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverBody p={4} className="space-y-2">
          {hasRegistered ? (
            <>
              <Image
                width={100}
                height={100}
                src="/images/process.png"
                alt="Become a blogger"
                mx="auto"
              />
              <Text pt={2} color="gray.500">
                Chúng tôi đang xử lý đơn đăng ký của bạn. Vui lòng chờ...
              </Text>
            </>
          ) : (
            <>
              <Image
                width={100}
                height={100}
                src="/images/blogger.png"
                alt="Become a blogger"
                mx="auto"
              />
              <Text>
                Bạn cần đăng ký trở thành tác giả để có thể viết bài trên trang
                web
              </Text>
              <Box w="fit-content" ml="auto">
                <RegisterWriterDialog />
              </Box>
            </>
          )}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
