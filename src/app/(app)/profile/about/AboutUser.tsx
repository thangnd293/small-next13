"use client";

import { useGlobalContext } from "@/context/GlobalContext";
import { useUpdateUserInfo } from "@/services/client";
import {
  Button,
  ButtonGroup,
  Editable,
  EditablePreview,
  EditableTextarea,
  Text,
  Textarea,
  VStack,
  useEditableControls,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function AboutUser() {
  const { userInfo, refreshUserInfo } = useGlobalContext();
  const { mutate: updateUserInfo } = useUpdateUserInfo();
  const [bio, setBio] = useState(userInfo?.bio || "");

  const handleUpdate = (value: string) => {
    updateUserInfo(
      { id: userInfo?.id, bio: value },
      {
        onSuccess: () => refreshUserInfo(),
      }
    );
  };

  useEffect(() => {
    setBio(userInfo?.bio || "");
  }, [userInfo?.bio]);

  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="end" size="sm" w="full" spacing={2} mt={2}>
        <Button
          _dark={{
            color: "gray.300",
          }}
          {...getCancelButtonProps()}
        >
          Huỷ
        </Button>
        <Button colorScheme="teal" {...getSubmitButtonProps()}>
          Lưu
        </Button>
      </ButtonGroup>
    ) : (
      <VStack
        align="flex-end"
        pt="20px"
        pb="40px"
        borderBottom="1px"
        borderStyle="solid"
        borderColor="gray.50"
        _dark={{
          borderColor: "gray.700",
        }}
      >
        <Button
          colorScheme="blackAlpha"
          variant="outline"
          borderRadius="full"
          fontWeight="normal"
          _dark={{
            borderColor: "gray.700",
            color: "gray.300",
            _hover: {
              bg: "gray.700",
            },
          }}
          {...getEditButtonProps()}
        >
          {bio ? "Chỉnh sửa" : "Thêm"}
        </Button>
      </VStack>
    );
  }

  return (
    <>
      <Editable
        value={bio}
        placeholder="Thêm mô tả về bạn để mọi người dễ tiếp cận hơn"
        selectAllOnFocus={false}
        isPreviewFocusable={false}
        submitOnBlur={false}
        onChange={(value) => setBio(value)}
        onCancel={() => setBio(userInfo?.bio || "")}
        onSubmit={handleUpdate}
      >
        <EditablePreview
          _dark={{
            color: "gray.300",
          }}
        />
        <Textarea
          as={EditableTextarea}
          _dark={{
            color: "gray.300",
          }}
        />
        <EditableControls />
      </Editable>
      <Text
        mt="10px"
        _dark={{
          color: "gray.300",
        }}
      >
        3 người theo dõi · Đang theo dõi 4
      </Text>
    </>
  );
}
