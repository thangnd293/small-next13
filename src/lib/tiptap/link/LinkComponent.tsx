import { NodeViewWrapper } from "@tiptap/react";
import { NodeViewProps } from "@tiptap/core";
import React from "react";
import {
  Input,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";

export default function ReactComponentNodeView({
  node,
  updateAttributes,
  editor,
  selected,
}: NodeViewProps) {
  const setText = (value: string) => {
    updateAttributes({
      text: value,
    });
  };

  const setHref = (value: string) => {
    updateAttributes({
      href: value,
    });
  };

  return (
    <NodeViewWrapper className="inline-block">
      <Popover isOpen={selected}>
        <PopoverTrigger>
          <a href={node.attrs.href} onClick={(e) => e.preventDefault()}>
            {node.attrs.text}
          </a>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverCloseButton />
          <PopoverHeader>Edit link!</PopoverHeader>
          <PopoverBody>
            <Input
              value={node.attrs.text}
              onChange={(e) => setText(e.target.value)}
            />
            <Input
              value={node.attrs.href}
              onChange={(e) => setHref(e.target.value)}
            />
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </NodeViewWrapper>
  );
}
