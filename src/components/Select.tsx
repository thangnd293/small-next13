import { Text } from "@chakra-ui/react";
import classNames from "classnames";
import ReactSelect, { Props as ReactSelectProps } from "react-select";

interface Props<T> extends ReactSelectProps<T> {
  label?: string;
  colorMode?: string;
  required?: boolean;
}

export default function Select<T>({
  colorMode = "dark",
  required = false,
  label,
  ...props
}: Props<T>) {
  return (
    <>
      {label && (
        <Text fontWeight="500" mb="4px">
          {label}
          {required && (
            <Text as="span" color="red.500">
              *
            </Text>
          )}
        </Text>
      )}
      <ReactSelect
        classNames={{
          control: () =>
            classNames(
              "min-w-[166px] min-h-[30px] border overflow-hidden rounded-md",
              {
                "bg-slate-900 border-slate-700 hover:border-slate-500 focus:border-slate-500 focus:ring-slate-500":
                  colorMode === "dark",
                "bg-white ": colorMode === "light",
              }
            ),
          indicatorSeparator: () =>
            classNames({
              "bg-slate-700": colorMode === "dark",
              "bg-slate-300": colorMode === "light",
            }),
          indicatorsContainer: () =>
            classNames({
              "bg-slate-900": colorMode === "dark",
              "bg-white": colorMode === "light",
            }),
          input: () => "my-0",
          valueContainer: () => "py-0",
          singleValue: () =>
            classNames({
              "text-slate-100": colorMode === "dark",
              "text-slate-900": colorMode === "light",
            }),
          menu: () =>
            classNames({
              "bg-slate-900": colorMode === "dark",
              "bg-white": colorMode === "light",
            }),
          option: ({ isSelected }) =>
            classNames("hover:bg-primary hover:text-white", {
              "text-slate-100 bg-slate-900": colorMode === "dark",
              "text-slate-900 bg-white": colorMode === "light",
              "!bg-primary !text-white": isSelected,
            }),
        }}
        {...props}
      />
    </>
  );
}
