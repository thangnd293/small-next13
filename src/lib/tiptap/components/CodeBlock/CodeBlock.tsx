import { ToolbarButton } from "@/components/Editor";
import Icons from "@/components/Icons";
import { NodeViewContent, NodeViewProps, NodeViewWrapper } from "@tiptap/react";

export const CodeBlock = (props: NodeViewProps) => {
  const { editor, deleteNode } = props;
  const { isEditable } = editor;

  return (
    <NodeViewWrapper
      className="relative pt-12 pb-8 bg-black rounded-md"
      draggable={isEditable}
      data-drag-handle=""
    >
      <div className="absolute flex items-center justify-end w-full gap-4 pr-2 top-1 left-1">
        <div className="flex items-center space-x-2 rounded-md bg-slate-900">
          <ToolbarButton
            onClick={() => {
              const content = editor.view.dom.querySelector("code")?.innerText;
              if (!content) return;
              navigator.clipboard.writeText(content);
            }}
            label={"Copy text"}
            Icon={Icons.Copy}
          />
          {isEditable && (
            <ToolbarButton
              onClick={deleteNode}
              label={"Delete"}
              Icon={Icons.Trash}
            />
          )}
        </div>
      </div>

      <NodeViewContent className={`content`} />
    </NodeViewWrapper>
  );
};
