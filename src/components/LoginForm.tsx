"use client";

import { Button, Input } from "@chakra-ui/react";
import { Formik } from "formik";
import { signIn, useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const { data } = useSession();
  console.log("data", data);

  return (
    <Formik
      initialValues={{ email: "tesa@gmail.com", password: "1" }}
      onSubmit={async (values, { setSubmitting }) => {
        const result = await signIn("credentials", {
          redirect: false,
          email: values.email,
          password: values.password,
          callbackUrl: searchParams?.get("from") || "/dashboard",
        });
        console.log("result", result);
        setSubmitting(false);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            placeholder="Email"
          />
          {errors.email && touched.email && errors.email}
          <Input
            type="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            placeholder="Password"
          />
          {errors.password && touched.password && errors.password}
          <Button type="submit" isLoading={isSubmitting}>
            Submit
          </Button>
          <Button onClick={() => signIn("github")}>Github</Button>
        </form>
      )}
    </Formik>
  );
}
