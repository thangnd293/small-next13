import { ToolbarButton } from "@/components/Editor";
import Icons from "@/components/Icons";
import Select from "@/components/Select";
import { NodeViewContent, NodeViewProps, NodeViewWrapper } from "@tiptap/react";

const options = [
  { value: "plaintext", label: "Plain Text" },
  { value: "javascript", label: "Javascript" },
  { value: "typescript", label: "Typescript" },
  { value: "java", label: "Java" },
];

export const CodeBlock = (props: NodeViewProps) => {
  const { updateAttributes, editor, deleteNode, node, extension } = props;
  const { language } = node.attrs;

  return (
    <NodeViewWrapper
      className="relative px-4 pt-12 pb-8 bg-black rounded-md"
      draggable="true"
      data-drag-handle=""
    >
      <div className="absolute flex items-center justify-between w-full gap-4 pr-2 top-1 left-1">
        <Select
          options={options}
          value={options.find((o) => o.value === language)}
          onChange={(v) => {
            const { value } = v as { value: string; label: string };
            updateAttributes({
              language: value,
            });
          }}
        />
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
          <ToolbarButton
            onClick={deleteNode}
            label={"Delete"}
            Icon={Icons.Trash}
          />
        </div>
      </div>

      <NodeViewContent className={`content`} />
    </NodeViewWrapper>
  );
};
