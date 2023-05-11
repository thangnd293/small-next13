import { Text } from "@chakra-ui/react";
import React from "react";
import CreatableSelect, { CreatableProps } from "react-select/creatable";
interface Props extends CreatableProps<any, any, any> {
  label?: string;
}
export default function SelectCreatable({ label, ...props }: Props) {
  return (
    <>
      {label && (
        <Text fontWeight="500" mb="4px">
          {label}
        </Text>
      )}
      <CreatableSelect
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setTimeout(() => {
              (e.target as HTMLInputElement).focus();
            }, 100);
          }
        }}
        {...props}
      />
    </>
  );
}
