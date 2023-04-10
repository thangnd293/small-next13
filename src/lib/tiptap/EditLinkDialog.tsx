import { HStack, Input } from "@chakra-ui/react";

const EditLinkDialog = () => {
  return (
    <HStack>
      <Input id="text-input" placeholder="Text" />
      <Input id="link-input" placeholder="Link" />
    </HStack>
  );
};

export default EditLinkDialog;
