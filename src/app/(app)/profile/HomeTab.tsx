import { Article } from "@/components/Article";

export default function HomeTab() {
  return (
    <div className="flex flex-col gap-8">
      {Array.from({ length: 5 }).map((_, index) => (
        <Article key={index} />
      ))}
    </div>
  );
}
