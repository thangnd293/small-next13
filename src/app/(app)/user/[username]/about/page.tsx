import Tabs from "@/components/Tabs";
import { getUser } from "@/services/server";
import { redirect } from "next/navigation";
import React from "react";
import AboutUser from "./AboutUser";

interface Props {
  params: {
    username: string;
  };
}
export default async function AboutPage({ params }: Props) {
  const { username } = params;
  const user = await getUser(username);

  if (!user) return redirect("/404");

  const tabs = [
    {
      label: "Trang chủ",
      href: `/user/${username}`,
    },
    {
      label: "Giới thiệu",
      href: `/user/${username}/about`,
      isActive: true,
    },
  ];

  return (
    <>
      <Tabs items={tabs} />
      <AboutUser {...user} />
    </>
  );
}
