import Icons from "@/components/Icons";
import { Article } from "@/types/common";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  MenuItem,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

interface Props extends Partial<Article> {
  isDeleting: boolean;
  onDelete: () => void;
}

export default function ConfirmDeleteDialog({
  title,
  isDeleting,
  onDelete,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  return (
    <>
      <MenuItem
        fontSize="14px"
        icon={<Icons.Trash width={14} />}
        onClick={onOpen}
      >
        Delete
      </MenuItem>

      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen || isDeleting}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Xóa bản nháp</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Bạn có chắc chắn muốn xóa bản nháp của mình không?{" "}
            {title || "Bản nháp"} sẽ bị xóa.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Bỏ qua
            </Button>
            <Button
              isLoading={isDeleting}
              colorScheme="red"
              ml={3}
              onClick={onDelete}
            >
              Xóa
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
