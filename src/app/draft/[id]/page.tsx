import { getDraft, getDrafts } from "@/services/server";
import PageContent from "./PageContent";

export default async function DraftDetailPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;
  const [draft, drafts] = await Promise.all([getDraft(id), getDrafts()]);

  return <PageContent drafts={drafts} currentDraft={draft} />;
}
