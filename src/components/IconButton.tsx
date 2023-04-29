import { IconButton as CkIconButton, IconButtonProps } from "@chakra-ui/react";
import React from "react";

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (props, ref) => {
    return (
      <CkIconButton
        isRound
        color="gray.500"
        bg="transparent"
        _hover={{ bg: "gray.50" }}
        ref={ref}
        {...props}
      />
    );
  }
);

IconButton.displayName = "IconButton";
export default IconButton;
