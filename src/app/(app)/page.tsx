import { getCurrentUser } from "@/utils/session";
import ArticlesSection from "./ArticlesSection";
import ChoseCategoryDialog from "./ChoseCategoryDialog";
import RecommendUserRegister from "./RecommendUserRegister";
export default async function Home() {
  const user = await getCurrentUser();

  return (
    <>
      <RecommendUserRegister isAuth={!!user} />
      <ArticlesSection />
      <ChoseCategoryDialog isOpen={user?.categories.length === 0} />
    </>
  );
}
