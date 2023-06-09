import { Metadata } from "next";
import { DraftProvider } from "./DraftContext";
import Guide from "./Guide";

export const metadata: Metadata = {
  title: "Viết bài mới",
  description: "Viết bài mới",
};

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DraftProvider>
      {children}
      <Guide />
    </DraftProvider>
  );
}
