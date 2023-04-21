import {
  Button,
  Flex,
  Input,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Tag,
  TagCloseButton,
  TagLabel,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";

import { faker } from "@faker-js/faker";

type Option = {
  label: string;
  value: string;
};

const makeData = (length: number) => {
  return Array.from({ length }).map((_, index) => ({
    label: faker.name.jobTitle(),
    value: faker.name.jobTitle(),
  }));
};

const DATA = makeData(10);

export default function MultiSelect() {
  const [options, setOptions] = useState<Option[]>(DATA);
  const [selected, setSelected] = useState<Option[]>([]);

  const selectOption = (option: Option) => {
    const isExist = selected.find((o) => o.value === option.value);
    if (isExist) return;
    setSelected((prev) => [...prev, option]);
  };

  const removeOption = (option: Option) => {
    setSelected((prev) => prev.filter((o) => o.value !== option.value));
  };

  return (
    <Flex
      p="10px 12px"
      flexWrap="wrap"
      gap="8px"
      maxW="440px"
      border="1px solid"
      borderColor="gray.50"
      borderRadius="2px"
    >
      {selected.map((option) => (
        <SelectedOption
          key={option.value}
          option={option}
          onRemove={() => removeOption(option)}
        />
      ))}
      <Popover placement="bottom-start">
        <PopoverTrigger>
          <Input w={100} variant="unstyled" placeholder="Tìm kiếm..." />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverBody>
            <VStack spacing="4px">
              {options.map((option) => (
                <Button
                  key={option.value}
                  w="full"
                  onClick={() => selectOption(option)}
                >
                  {option.label}
                </Button>
              ))}
            </VStack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  );
}

interface SelectedOptionProps {
  option: Option;
  onRemove?: (option: Option) => void;
}
const SelectedOption = ({ option, onRemove }: SelectedOptionProps) => {
  return (
    <Tag variant="outline" py="6px">
      <TagLabel>{option.label}</TagLabel>
      <TagCloseButton onClick={() => onRemove?.(option)} />
    </Tag>
  );
};
