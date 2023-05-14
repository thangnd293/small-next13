import { getUser } from "@/services/server";
import { redirect } from "next/navigation";
import React from "react";
import Title from "./Title";

interface Props {
  children: React.ReactNode;
  params: {
    username: string;
  };
}
export default async function UserInfoLayout({ params, children }: Props) {
  const { username } = params;
  const user = await getUser(username);
  if (!user) return redirect("/404");

  return (
    <>
      <Title fullname={user.name} />
      {children}
    </>
  );
}
