import { getDraft, getDrafts } from "@/services/server";
import Aside from "./Aside";
import EditDraft from "./EditDraft";

export default async function DraftDetailPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;
  const [draft, drafts] = await Promise.all([getDraft(id), getDrafts()]);

  return (
    <>
      <Aside drafts={drafts} currentDraft={draft} />
      <EditDraft draft={draft} />
    </>
  );
}
