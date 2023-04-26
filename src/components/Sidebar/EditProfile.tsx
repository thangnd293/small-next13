import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, VStack } from "@chakra-ui/react"
import { Form, FormikProps, Formik } from 'formik';
import * as Yup from 'yup';

import InputField from "../InputField";

interface Values {
    fullName: string;
    bio: string;
}

const EditProfileSchema = Yup.object().shape({
    fullName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
});

export default function EditProfile() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return <>
        <Button colorScheme="teal" variant="link" mt="14px" onClick={onOpen}>
            Sửa thông tin
        </Button>
        <Modal isOpen={isOpen} onClose={onClose} isCentered size='xl'>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader fontSize='lg'>Cập nhật thông tin</ModalHeader>
                <ModalCloseButton />
                <Formik
                    initialValues={{
                        fullName: '',
                        bio: '',
                    }}
                    onSubmit={(values, actions) => {
                        setTimeout(() => {
                            alert(JSON.stringify(values, null, 2));
                            actions.setSubmitting(false);
                        }, 1000);
                    }}
                    validationSchema={EditProfileSchema}
                >
                    {(props: FormikProps<Values>) => (
                        <Form>
                            <ModalBody>
                                <VStack spacing='32px'>


                                    <InputField name="fullName" label='Tên' placeholder="VD: Nguyễn Văn A" isRequired />
                                    <InputField name="bio" label='Mô tả' placeholder="VD: Lorem Ipsum is simply dummy text of the printing" />

                                </VStack>
                            </ModalBody>

                            <ModalFooter>
                                <Button mr={3} onClick={onClose}>
                                    Huỷ
                                </Button>
                                <Button colorScheme='teal' type='submit'>Cập nhật</Button>
                            </ModalFooter>
                        </Form>
                    )}
                </Formik>
            </ModalContent>
        </Modal></>
}