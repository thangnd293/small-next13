import {
  InputGroup,
  InputLeftElement,
  Input as ChakraInput,
  InputProps,
  InputGroupProps,
} from "@chakra-ui/react";
import Icons from "./Icons";

interface IProps extends InputProps {
  containerProps?: InputGroupProps;
}

export function SearchBar({ containerProps, ...restProps }: IProps) {
  const { size } = restProps;

  const dimension = size === "sm" ? "18px" : "24px";
  return (
    <InputGroup {...containerProps} size={size}>
      <InputLeftElement color="gray.500" pointerEvents="none">
        <Icons.Search
          width={dimension}
          height={dimension}
          color="currentColor"
        />
      </InputLeftElement>
      <ChakraInput borderRadius="9999px" maxWidth="512px" {...restProps} />
    </InputGroup>
  );
}
