import Tabs from "@/components/Tabs";
import React from "react";
import AboutUser from "./AboutUser";
export const metadata = {
  title: "Trang cá nhân",
  description: "Trang cá nhân của người dùng",
};

export default function AboutPage() {
  const tabs = [
    {
      label: "Trang chủ",
      href: `/profile`,
    },
    {
      label: "Lưu trữ",
      href: `/profile/library`,
    },
    {
      label: "Giới thiệu",
      href: `/profile/about`,
      isActive: true,
    },
  ];

  return (
    <>
      <Tabs mb="10" items={tabs} />
      <AboutUser />
    </>
  );
}
