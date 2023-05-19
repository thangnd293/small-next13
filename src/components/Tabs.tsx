"use client";

import { Link } from "@chakra-ui/next-js";
import { Box, BoxProps } from "@chakra-ui/react";
import classNames from "classnames";

type TItem = {
  label: string;
  href: string;
  isActive?: boolean;
};

interface Props extends BoxProps {
  items: TItem[];
}

export default function Tabs({ items, ...rest }: Props) {
  return (
    <Box
      className="space-x-8"
      borderBottom="1px solid"
      borderColor="gray.50"
      _dark={{
        borderColor: "gray.700",
      }}
      {...rest}
    >
      {items.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className={classNames(
            "inline-block py-2 text-sm translate-y-[1px] border-b text-text-primary hover:border-b-text-primary "
          )}
          borderColor={item.isActive ? "gray.900" : "transparent"}
          _dark={{
            color: "gray.300",
            borderColor: item.isActive ? "gray.300" : "transparent",
            _hover: {
              borderColor: "gray.300",
            },
          }}
        >
          {item.label}
        </Link>
      ))}
    </Box>
  );
}
