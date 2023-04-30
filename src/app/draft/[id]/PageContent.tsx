"use client";

import { Article } from "@/types/common";
import classNames from "classnames";
import Aside from "./Aside";
import { useDraftContext } from "./DraftContext";
import EditDraft from "./EditDraft";
import PreviewPage from "./PreviewPage";

interface Props {
  drafts: Article[];
  currentDraft: Article;
}

export default function PageContent({ drafts, currentDraft }: Props) {
  const { isPreviewMode } = useDraftContext();

  return (
    <>
      <div
        className={classNames("w-full", {
          block: isPreviewMode,
          hidden: !isPreviewMode,
        })}
      >
        <PreviewPage currentDraft={currentDraft} />
      </div>
      <div
        className={classNames(
          "w-full min-h-screen max-w-full 2xl:max-w-[1328px] justify-between",
          {
            flex: !isPreviewMode,
            hidden: isPreviewMode,
          }
        )}
      >
        <Aside drafts={drafts} currentDraft={currentDraft} />
        <EditDraft draft={currentDraft} />
      </div>
    </>
  );
}
