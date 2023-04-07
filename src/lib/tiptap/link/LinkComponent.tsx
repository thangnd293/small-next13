import { NodeViewWrapper } from "@tiptap/react";
import { NodeViewProps } from "@tiptap/core";
import React from "react";

export default function ReactComponentNodeView(props: NodeViewProps) {
  const increase = () => {
    props.updateAttributes({
      count: props.node.attrs.count + 1,
    });
  };

  return (
    <NodeViewWrapper className="inline-block">
      <button onClick={increase}>{props.node.attrs.count} times.</button>
    </NodeViewWrapper>
  );
}
