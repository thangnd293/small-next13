"use client";

import { Editor, EditorContent as TiptapEditorContent } from "@tiptap/react";

interface IProps {
  editor: Editor | null;
  titleTextareaRef: React.RefObject<HTMLTextAreaElement>;
  subtitleTextareaRef: React.RefObject<HTMLTextAreaElement>;
}

const EditorContent = ({
  editor,
  titleTextareaRef,
  subtitleTextareaRef,
}: IProps) => {
  const handleArrowUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowUp") {
      if (!editor) return;
      const { selection } = editor.state;
      const { $from, $to } = selection;
      const paragraphRange = $from.blockRange($to);
      let isFirstLine = false;

      try {
        $from.before(paragraphRange?.start) === $from.start();
      } catch (error) {
        isFirstLine = true;
      }

      if (isFirstLine) {
        e.preventDefault();
        const titleTextarea = titleTextareaRef.current;
        const subtitleTextarea = subtitleTextareaRef.current;

        subtitleTextarea ? subtitleTextarea.focus() : titleTextarea?.focus();
      }
    }
  };

  return <TiptapEditorContent editor={editor} onKeyDown={handleArrowUp} />;
};

export default EditorContent;
