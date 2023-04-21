import Collection from "@/components/Collection";

export default function ListTab() {
  return (
    <div className="flex flex-col gap-8">
      {Array.from({ length: 5 }).map((_, index) => (
        <Collection key={index} />
      ))}
    </div>
  );
}
