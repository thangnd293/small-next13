import { cookies } from "next/headers";

import Article from "@/components/Article";
import { getCurrentUser } from "@/utils/session";
import ChoseCategoryDialog from "./ChoseCategoryDialog";
import RecommendUserRegister from "./RecommendUserRegister";
export default async function Home() {
  const cookieStore = cookies();

  const token = cookieStore.get("next-auth.session-token");
  const user = await getCurrentUser();

  return (
    <>
      <RecommendUserRegister isAuth={!!token} />
      <div className="flex flex-col gap-8">
        {Array.from({ length: 10 }).map((_, index) => (
          <Article key={index} />
        ))}
      </div>
      <ChoseCategoryDialog isOpen={user?.categories.length === 0} />
    </>
  );
}
