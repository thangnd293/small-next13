import { useGlobalContext } from "@/context/GlobalContext";
import { useRegisterWriter } from "@/services/client";
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Textarea,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function RegisterWriterDialog() {
  const { userInfo } = useGlobalContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [reason, setReason] = useState("");

  const registerWriter = useRegisterWriter({
    onSuccess: () => {
      toast("Đăng ký của bạn đã được cho quản trị viên chờ xét duyệt");
      onClose();
    },
  });

  if (!userInfo) return null;

  const onSubmit = () => {
    registerWriter.mutate({
      userId: userInfo.id,
      reason,
    });
  };

  return (
    <>
      <Button colorScheme="teal" size="sm" onClick={onOpen}>
        Đăng ký ngay
      </Button>

      <Modal
        isOpen={isOpen || registerWriter.isLoading}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="22px">Trở thành tác giả</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Lý do</FormLabel>
              <Textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Cho chúng tôi biết lý do bạn muốn trở thành tác giả"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Bỏ qua
            </Button>
            <Button
              isLoading={registerWriter.isLoading}
              isDisabled={!reason.trim()}
              colorScheme="teal"
              onClick={onSubmit}
            >
              Gửi
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
