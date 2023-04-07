import { Node } from "@tiptap/core";
import Suggestion, { SuggestionOptions } from "@tiptap/suggestion";

type SlashCommandsOptions = {
  suggestion: Omit<SuggestionOptions, "editor">;
};

export const SlashCommands = Node.create<SlashCommandsOptions>({
  name: "slashCommands",

  addOptions() {
    return {
      suggestion: {
        char: "/",
        startOfLine: false,
        command: ({ editor, range, props }) => {
          props.command({ editor, range, props });
        },
      },
    };
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ];
  },
});
