import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
} from "@chakra-ui/react";
import { useField } from "formik";

interface Props {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  isRequired?: boolean;
}
export default function InputField({ label, name, ...props }: Props) {
  const [field, meta] = useField(name);

  const hasError = meta.touched && meta.error;
  return (
    <FormControl w="full">
      <FormLabel>{label}</FormLabel>
      <Input w="full" {...field} {...props} />
      {hasError && (
        <FormHelperText color="red.500">{meta.error}</FormHelperText>
      )}
    </FormControl>
  );
}
