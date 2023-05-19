import { getCurrentUser } from "@/utils/session";
import Title from "./Title";

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  return (
    <>
      <Title fullname={user.name} />
      {children}
    </>
  );
}
