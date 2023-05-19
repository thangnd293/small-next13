import Tabs from "@/components/Tabs";
import React from "react";
import ArticlesBookmarked from "./ArticlesBookmarked";

export const metadata = {
  title: "Lưu trữ",
  description: "Các bài viết đã lưu trữ",
};

export default function LibraryPage() {
  const tabs = [
    {
      label: "Trang chủ",
      href: `/profile`,
    },
    {
      label: "Lưu trữ",
      href: `/profile/library`,
      isActive: true,
    },
    {
      label: "Giới thiệu",
      href: `/profile/about`,
    },
  ];

  return (
    <>
      <Tabs mb="10" items={tabs} />
      <ArticlesBookmarked />
    </>
  );
}
