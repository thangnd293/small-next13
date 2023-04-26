import {
  Button,
  ButtonGroup,
  Editable,
  EditablePreview,
  EditableTextarea,
  Text,
  Textarea,
  VStack,
  useEditableControls
} from "@chakra-ui/react";
import { useState } from "react";

const BIO = 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore id molestiae saepe et, temporibus sit voluptas porro totam voluptate, at alias. Voluptas repellat beatae, explicabo nihil eos ea ad odit?'
export default function AboutTab() {
  const [bio, setBio] = useState(BIO)

  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="end" size="sm" w="full" spacing={2} mt={2}>
        <Button {...getCancelButtonProps()}>Huỷ</Button>
        <Button colorScheme='teal' {...getSubmitButtonProps()}>Lưu</Button>
      </ButtonGroup>
    ) : (
      <VStack align='flex-end' pt='20px' pb='40px' borderBottom='1px' borderStyle='solid' borderColor='gray.50'>
        <Button colorScheme="blackAlpha" variant="outline" borderRadius='full' fontWeight='normal' {...getEditButtonProps()}>
          {bio ? 'Chỉnh sửa' : 'Thêm'}
        </Button>
      </VStack>
    );
  }

  return (
    <>
      <Editable
        value={''}
        placeholder="Thêm mô tả về bạn để mọi người dễ tiếp cận hơn"
        selectAllOnFocus={false}
        isPreviewFocusable={false}
        onChange={value => setBio(value)}
        onSubmit={value => setBio(value)}

      >
        <EditablePreview />
        <Textarea as={EditableTextarea} />
        <EditableControls />
      </Editable>
      <Text mt='10px'>3 người theo dõi · Đang theo dõi 4</Text>
    </>
  );
}
