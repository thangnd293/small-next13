import { ReactRenderer } from "@tiptap/react";
import tippy from "tippy.js";

import Commands from "@/components/Commands";

export const render = () => {
  let component;
  let popup;

  return {
    onStart: (props) => {
      component = new ReactRenderer(Commands, {
        props,
        editor: props.editor,
      });

      if (!props.clientRect) {
        return;
      }

      popup = tippy("body", {
        getReferenceClientRect: props.clientRect,
        appendTo: () => document.body,
        content: component.element,
        showOnCreate: true,
        interactive: true,
        trigger: "manual",
        placement: "bottom-start",
      });
    },
    onUpdate(props) {
      component.updateProps(props);

      if (!props.clientRect) {
        return;
      }

      popup[0].setProps({
        getReferenceClientRect: props.clientRect,
      });
    },
    onKeyDown(props) {
      if (props.event.key === "Escape") {
        popup[0].hide();

        return true;
      }

      return component.ref?.onKeydown(props.event);
    },
    onExit() {
      popup[0].destroy();
      component.destroy();
    },
  };
};
