import { Article } from "@/components/Article";
import Icons from "@/components/Icons";
import { useGlobalContext } from "@/context/GlobalContext";

export default function ListTab() {
  const { articlesBookmarked } = useGlobalContext();

  return (
    <div className="flex flex-col gap-8">
      {articlesBookmarked.length > 0 ? (
        articlesBookmarked.map((article) => (
          <Article key={article.id} article={article} hasBookmarked />
        ))
      ) : (
        <div className="flex items-center justify-center p-10 border border-gray-300 border-dashed text-text-secondary">
          Nhấp vào <Icons.Bookmark className="inline-block px-1" width={30} />
          trên bất kỳ bài viết nào để thêm vào danh sách đọc sau.
        </div>
      )}
    </div>
  );
}
