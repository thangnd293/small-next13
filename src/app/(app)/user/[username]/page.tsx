import { getArticlesOfUser, getUser } from "@/services/server";
import { redirect } from "next/navigation";
import React from "react";
import Articles from "./Articles";
import Tabs from "@/components/Tabs";

interface Props {
  params: {
    username: string;
  };
}
export default async function HomePage({ params }: Props) {
  const { username } = params;
  const user = await getUser(username);

  if (!user) return redirect("/404");

  const articles = await getArticlesOfUser(user.username);

  const tabs = [
    {
      label: "Trang chủ",
      href: `/user/${username}`,
      isActive: true,
    },
    {
      label: "Giới thiệu",
      href: `/user/${username}/about`,
    },
  ];

  return (
    <>
      <Tabs items={tabs} />
      <Articles articles={articles} />
    </>
  );
}
