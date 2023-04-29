import { Metadata } from "next";
import { DraftProvider } from "./DraftContext";

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
    <div className="w-full flex min-h-screen max-w-full 2xl:max-w-[1328px] justify-between">
      <DraftProvider>{children}</DraftProvider>
    </div>
  );
}
