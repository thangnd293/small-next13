export default function CategoryPage({
    params,
  }: {
    params: { category: string };
  }) {
    const {category} = params;
    return <div>{category}</div>
}