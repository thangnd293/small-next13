import { getDraft, getDrafts } from "@/services/server";
import PageContent from "./PageContent";
import { getCurrentUser } from "@/utils/session";

export default async function DraftDetailPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;
  const user = await getCurrentUser();
  if (!user) return null;
  const [draft, drafts] = await Promise.all([
    getDraft(id),
    getDrafts(user.username),
  ]);

  return <PageContent drafts={drafts} currentDraft={draft} />;
}
