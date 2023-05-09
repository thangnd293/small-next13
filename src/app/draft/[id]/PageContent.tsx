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
    <>
      <Aside drafts={drafts} currentDraft={currentDraft} />
      <EditDraft draft={currentDraft} />
    </>
  );
}
