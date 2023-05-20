import { getCurrentUser } from "@/utils/session";
import ArticlesSection from "./ArticlesSection";
import ChoseCategoryDialog from "./ChoseCategoryDialog";
import RecommendUserRegister from "./RecommendUserRegister";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Small",
  description: "Small",
};

export default async function Home() {
  const user = await getCurrentUser();

  return (
    <>
      <RecommendUserRegister isAuth={!!user} />
      <ArticlesSection />
      <ChoseCategoryDialog isOpen={user?.categories?.length === 0} />
    </>
  );
}
