import {
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  IconButtonProps,
} from "@chakra-ui/react";
import React from "react";
import Icons from "./Icons";

interface Props extends IconButtonProps {
  actions: {
    label: string;
    icon: React.ReactElement;
    color?: string;
    onClick: () => void;
  }[];
}
export default function ActionButton({ actions, ...rest }: Props) {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        onClick={(e) => e.stopPropagation()}
        className="hidden group-hover:block"
        size="sm"
        variant="link"
        position="absolute"
        right={2}
        top={4}
        {...rest}
      >
        <Icons.EllipsisVertical width={24} height={24} />
      </MenuButton>
      <MenuList minW="100px">
        {actions.map((action) => (
          <MenuItem
            key={action.label}
            fontSize="14px"
            icon={action.icon}
            color={action.color}
            onClick={action.onClick}
          >
            {action.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
