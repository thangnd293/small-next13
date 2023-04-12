import { Editor } from "@tiptap/core";
import tippy from "tippy.js";

export const displayEditLinkPopup = (editor: Editor, id?: number) => {
  const anchorEl = id
    ? document.querySelector(`a[data-id="${id}"]`)
    : window.getSelection()?.anchorNode?.parentElement;
  if (!anchorEl) return;

  tippy(anchorEl, {
    content: `
      <div class='edit-link-dialog'>
      <div class='title'>
         <div class='title-text'>
            <svg viewBox="0 0 512 512">
               <path d="M301.148 394.702l-79.2 79.19c-50.778 50.799-133.037 50.824-183.84 0-50.799-50.778-50.824-133.037 0-183.84l79.19-79.2a132.833 132.833 0 013.532-3.403c7.55-7.005 19.795-2.004 20.208 8.286.193 4.807.598 9.607 1.216 14.384.481 3.717-.746 7.447-3.397 10.096-16.48 16.469-75.142 75.128-75.3 75.286-36.738 36.759-36.731 96.188 0 132.94 36.759 36.738 96.188 36.731 132.94 0l79.2-79.2.36-.36c36.301-36.672 36.14-96.07-.37-132.58-8.214-8.214-17.577-14.58-27.585-19.109-4.566-2.066-7.426-6.667-7.134-11.67a62.197 62.197 0 012.826-15.259c2.103-6.601 9.531-9.961 15.919-7.28 15.073 6.324 29.187 15.62 41.435 27.868 50.688 50.689 50.679 133.17 0 183.851zm-90.296-93.554c12.248 12.248 26.362 21.544 41.435 27.868 6.388 2.68 13.816-.68 15.919-7.28a62.197 62.197 0 002.826-15.259c.292-5.003-2.569-9.604-7.134-11.67-10.008-4.528-19.371-10.894-27.585-19.109-36.51-36.51-36.671-95.908-.37-132.58l.36-.36 79.2-79.2c36.752-36.731 96.181-36.738 132.94 0 36.731 36.752 36.738 96.181 0 132.94-.157.157-58.819 58.817-75.3 75.286-2.651 2.65-3.878 6.379-3.397 10.096a163.156 163.156 0 011.216 14.384c.413 10.291 12.659 15.291 20.208 8.286a131.324 131.324 0 003.532-3.403l79.19-79.2c50.824-50.803 50.799-133.062 0-183.84-50.802-50.824-133.062-50.799-183.84 0l-79.2 79.19c-50.679 50.682-50.688 133.163 0 183.851z"></path>
            </svg>
            Edit link
         </div>
         <button id='btn-close'>
            <svg class="icon-close" viewBox="0 0 320 512">
               <path d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"></path>
            </svg>
         </button>
      </div>
      <div>
         <label for='link-input'>Đường dẫn</label>
         <input id='link-input' class='input' placeholder='Nhập đường dẫn'/>
      </div>
      <button id='btn-insert'>Insert link</button>
   </div>
        `,
    appendTo: () => document.body,
    showOnCreate: true,
    interactive: true,
    trigger: "manual",
    placement: "bottom-start",
    allowHTML: true,
    onMount: (instance) => {
      const linkInput = instance.popper.querySelector(
        "#link-input"
      ) as HTMLInputElement;

      const btnInsert = instance.popper.querySelector(
        "#btn-insert"
      ) as HTMLButtonElement;

      const btnClose = instance.popper.querySelector(
        "#btn-close"
      ) as HTMLButtonElement;

      if (!linkInput || !btnInsert || !btnClose) return;
      linkInput.focus();
      linkInput.value = anchorEl.getAttribute("href") || "";
      btnInsert.onclick = () => {
        editor
          .chain()
          .focus()
          .extendMarkRange("link")
          .updateAttributes("link", {
            href: linkInput.value,
          })
          .run();
        instance.destroy();
      };

      btnClose.onclick = () => {
        instance.destroy();
      };
    },
    onHide: () => {
      editor.chain().focus().setTextSelection(editor.state.selection.to).run();
    },
  });
};
