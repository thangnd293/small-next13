import {
  Avatar,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { Form, Formik, useField, useFormikContext } from "formik";
import * as Yup from "yup";

import { useUserInfoContext } from "@/context/UserContext";
import { useUpdateUserInfo } from "@/services/use-user-info";
import InputField from "../InputField";
import useCloudinaryUpload from "@/hooks/useCloudinaryUpload";
import { useRef } from "react";

interface Values {
  name: string;
  bio: string;
  image?: string;
}

const EditProfileSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

export default function EditProfile() {
  const { userInfo, refeshUserInfo } = useUserInfoContext();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { mutate: updateUserInfo, isLoading } = useUpdateUserInfo();
  const handleSubmit = (values: Values) => {
    updateUserInfo(
      { id: userInfo?.id, ...values },
      {
        onSuccess: () => {
          refeshUserInfo();
          onClose();
        },
      }
    );
  };
  return (
    <>
      <Button colorScheme="teal" variant="link" mt="14px" onClick={onOpen}>
        Sửa thông tin
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="lg">Cập nhật thông tin</ModalHeader>
          <ModalCloseButton />
          <Formik
            initialValues={{
              name: userInfo?.name || "",
              bio: userInfo?.bio || "",
              image: userInfo?.image || "",
            }}
            onSubmit={handleSubmit}
            validationSchema={EditProfileSchema}
          >
            {() => (
              <Form>
                <ModalBody>
                  <VStack spacing="32px">
                    <AvatarInputField name="image" />
                    <InputField
                      name="name"
                      label="Tên"
                      placeholder="VD: Nguyễn Văn A"
                      isRequired
                    />
                    <InputField
                      name="bio"
                      label="Mô tả"
                      placeholder="VD: Lorem Ipsum is simply dummy text of the printing"
                    />
                  </VStack>
                </ModalBody>

                <ModalFooter>
                  <Button mr={3} onClick={onClose}>
                    Huỷ
                  </Button>
                  <Button
                    isLoading={isLoading}
                    colorScheme="teal"
                    type="submit"
                  >
                    Cập nhật
                  </Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  );
}

interface AvatarInputFieldProps {
  name: string;
}
const AvatarInputField = ({ name }: AvatarInputFieldProps) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(name);

  const inputRef = useRef<HTMLInputElement>(null);
  const { handleUploadToCloudinary, isUploading } = useCloudinaryUpload(
    (value) => setFieldValue(name, value)
  );

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    handleUploadToCloudinary(file);
  };

  return (
    <>
      <VStack>
        <Avatar size="xl" src={field.value} />
        <Button
          isLoading={isUploading}
          size="sm"
          onClick={() => inputRef.current?.click()}
        >
          Đổi ảnh đại diện
        </Button>
      </VStack>

      <input
        className="hidden"
        type="file"
        accept=".png, .jpg, .jpeg"
        onChange={handleFileChange}
        ref={inputRef}
      />
    </>
  );
};
