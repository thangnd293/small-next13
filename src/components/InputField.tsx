import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  InputGroup,
  InputRightElement,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { useField } from "formik";
import Icons from "./Icons";

interface Props {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  isRequired?: boolean;
}
export default function InputField({ label, name, type, ...props }: Props) {
  const [field, meta] = useField(name);
  const [show, setShow] = React.useState(type !== "password");
  const handleClick = () => setShow(!show);

  const hasError = meta.touched && meta.error;
  return (
    <FormControl w="full">
      <FormLabel>{label}</FormLabel>
      <InputGroup size="md">
        <Input
          type={show ? "text" : "password"}
          w="full"
          pr={type === "password" ? "3.5rem" : "0"}
          {...field}
          {...props}
        />
        {type === "password" && (
          <InputRightElement width="3.5rem">
            <IconButton
              h="1.75rem"
              size="sm"
              variant="ghost"
              onClick={handleClick}
              aria-label={"Toggle show password"}
            >
              {show ? <Icons.EyeSlash width={18} /> : <Icons.Eye width={18} />}
            </IconButton>
          </InputRightElement>
        )}
      </InputGroup>
      {hasError && (
        <FormHelperText color="red.500">{meta.error}</FormHelperText>
      )}
    </FormControl>
  );
}
