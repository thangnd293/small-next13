"use client";

import { Article } from "@/types/common";
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

  return isPreviewMode ? (
    <PreviewPage currentDraft={currentDraft} />
  ) : (
    <div className="w-full flex min-h-screen max-w-full 2xl:max-w-[1328px] justify-between mx-auto">
      <Aside drafts={drafts} currentDraft={currentDraft} />
      <EditDraft draft={currentDraft} />
    </div>
  );
}
