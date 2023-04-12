import { Tooltip } from "@chakra-ui/react";
import classNames from "classnames";
import React from "react";
import { IconType } from "react-icons";

interface IProps {
  label: string;
  Icon: IconType | any;
  onClick: () => void;
  isActive?: boolean;
  isDisabled?: boolean;
}

export const ToolbarButton = ({
  label,
  Icon,
  isActive,
  isDisabled,
  onClick,
}: IProps) => {
  const handleOnClick = () => {
    if (!isDisabled) {
      onClick();
    }
  };

  return (
    <Tooltip label={label} placement="top">
      <button
        className={classNames(
          "p-2 text-text-secondary hover:bg-slate-200 rounded-full",
          {
            "bg-slate-200": isActive,
            "cursor-default pointer-events-none opacity-50": isDisabled,
          }
        )}
        onClick={handleOnClick}
      >
        <Icon width={18} height={18} />
      </button>
    </Tooltip>
  );
};
