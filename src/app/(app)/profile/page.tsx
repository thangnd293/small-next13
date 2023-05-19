import Tabs from "@/components/Tabs";
import { getArticlesOfUser } from "@/services/server";
import { getCurrentUser } from "@/utils/session";
import Articles from "./Articles";

export const metadata = {
  title: "Quản lý bài viết",
  description: "Trang cá nhân của người dùng",
};

export default async function HomePage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const articles = await getArticlesOfUser(user.username);

  const tabs = [
    {
      label: "Trang chủ",
      href: `/profile`,
      isActive: true,
    },
    {
      label: "Lưu trữ",
      href: `/profile/library`,
    },
    {
      label: "Giới thiệu",
      href: `/profile/about`,
    },
  ];

  return (
    <>
      <Tabs mb="10" items={tabs} />
      <Articles username={user.username} />
    </>
  );
}
