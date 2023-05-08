import Article from "@/components/Article";
import { getCurrentUser } from "@/utils/session";
import ChoseCategoryDialog from "./ChoseCategoryDialog";
import RecommendUserRegister from "./RecommendUserRegister";
export default async function Home() {
  const user = await getCurrentUser();
  console.log("user", user);

  return (
    <>
      <RecommendUserRegister isAuth={!!user} />
      <div className="flex flex-col gap-8">
        {Array.from({ length: 10 }).map((_, index) => (
          <Article key={index} />
        ))}
      </div>
      <ChoseCategoryDialog isOpen={user?.categories.length === 0} />
    </>
  );
}
