"use client";

import { Button, Text } from "@chakra-ui/react";
import { Formik, FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

import { toast } from "react-toastify";
import InputField from "./InputField";
import { Link } from "@chakra-ui/next-js";

type Input = {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const initialValues: Input = {
  name: "thang",
  username: "thang",
  email: "thang@gmail.com",
  password: "12345678",
  confirmPassword: "12345678",
};

const validateSchema = Yup.object().shape({
  name: Yup.string().required("Vui lòng nhập tên của bạn"),
  username: Yup.string().required("Vui lòng nhập tên đăng nhập"),
  email: Yup.string().email().required("Vui lòng nhập email của bạn"),
  password: Yup.string().required("Vui lòng nhập mật khẩu"),
  confirmPassword: Yup.string()
    .label("confirm password")
    .required("Vui lòng nhập xác nhận mật khẩu")
    .oneOf([Yup.ref("password"), ""], "Mật khẩu không khớp"),
});

export default function SignUpForm() {
  const router = useRouter();

  const handleSubmit = async (
    values: Input,
    { setSubmitting }: FormikHelpers<Input>
  ) => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "/auth/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    );

    setSubmitting(false);

    if (response.ok) {
      toast.success("Đăng ký thành công");
      router.push("/login");
    } else {
      toast.error("Đăng ký thất bại");
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validateSchema}
      >
        {({ handleSubmit, isSubmitting }) => (
          <form className="w-full mt-12 space-y-5" onSubmit={handleSubmit}>
            <InputField
              label="Full name"
              name="name"
              placeholder="VD: Nguyen Van A"
            />
            <InputField
              label="Username"
              name="username"
              placeholder="VD: andy"
            />
            <InputField
              label="Email"
              name="email"
              placeholder="VD: A@gmail.com"
            />
            <InputField
              label="Password"
              type="password"
              name="password"
              placeholder="VD: @13a@12aaa"
            />
            <InputField
              label="Password"
              type="password"
              name="confirmPassword"
              placeholder="VD: @13a@12aaa"
            />
            <div className="ml-auto w-fit">
              <Button colorScheme="teal" type="submit" isLoading={isSubmitting}>
                Đăng ký
              </Button>
            </div>
          </form>
        )}
      </Formik>
      <Text
        mt="20px"
        _dark={{
          color: "gray.400",
        }}
      >
        Đã có tài khoản?{" "}
        <Link href="/login" className="text-primary" fontWeight="semibold">
          Đăng nhập
        </Link>
      </Text>
    </>
  );
}
