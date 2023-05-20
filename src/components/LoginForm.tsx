"use client";

import { Button, Text } from "@chakra-ui/react";
import { Formik, FormikHelpers } from "formik";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import * as Yup from "yup";

import { toast } from "react-toastify";
import InputField from "./InputField";
import { Link } from "@chakra-ui/next-js";

type Input = {
  usernameOrEmail: string;
  password: string;
};

const initialValues: Input = {
  usernameOrEmail: "",
  password: "",
};

const validateSchema = Yup.object().shape({
  usernameOrEmail: Yup.string().required(),
  password: Yup.string().required(),
});

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = async (
    values: Input,
    { setSubmitting }: FormikHelpers<Input>
  ) => {
    const signInResult = await signIn("credentials", {
      redirect: false,
      usernameOrEmail: values.usernameOrEmail,
      password: values.password,
    });

    setSubmitting(false);

    if (!signInResult?.ok) {
      return toast.error(
        "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin đăng nhập"
      );
    }
    router.push(searchParams?.get("from") || "/");
    toast.success("Đăng nhập thành công");
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
              label="Email"
              name="usernameOrEmail"
              placeholder="VD: A@gmail.com"
            />
            <InputField
              label="Password"
              name="password"
              placeholder="VD: @13a@12aaa"
              type="password"
            />

            <div className="ml-auto w-fit">
              <Button colorScheme="teal" type="submit" isLoading={isSubmitting}>
                Đăng nhập
              </Button>
            </div>
          </form>
        )}
      </Formik>
      <Text
        mt="20px"
        _dark={{
          color: "gray.300",
        }}
      >
        Chưa có tài khoản?{" "}
        <Link href="/sign-up" className="text-primary" fontWeight="semibold">
          Đăng ký ngay
        </Link>
      </Text>
    </>
  );
}
