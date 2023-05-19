import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import React from "react";

interface Props {
  title: string;
  content: string;
  okText: string;
  isOpen: boolean;
  isProcessing: boolean;
  onClose: () => void;
  onOk: () => void;
}
export default function ConfirmDialog({
  isOpen,
  isProcessing,
  okText,
  content,
  title,
  onClose,
  onOk,
}: Props) {
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  return (
    <AlertDialog
      isOpen={isOpen || isProcessing}
      leastDestructiveRef={cancelRef}
      isCentered
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {title}
          </AlertDialogHeader>

          <AlertDialogBody>{content}</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Bỏ qua
            </Button>
            <Button
              colorScheme="red"
              onClick={onOk}
              ml={3}
              isLoading={isProcessing}
            >
              {okText}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
