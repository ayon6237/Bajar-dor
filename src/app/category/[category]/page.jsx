
import CategoryContent from "./CategoryContent";

const API_URL =
  "https://api.abcz.workers.dev/api/bazardor";

export default async function CategoryPage({ params }) {
  const { category } = await params;

  const [categoryRes, productRes] = await Promise.all([
    fetch(`${API_URL}/categories`, {
      cache: "no-store",
    }),
    fetch(
      `${API_URL}/products?category=${encodeURIComponent(category)}`,
      { cache: "no-store" }
    ),
  ]);

  if (!categoryRes.ok || !productRes.ok) {
    throw new Error("পণ্যের তথ্য লোড করা যায়নি।");
  }

  const categoryData = await categoryRes.json();
  const productData = await productRes.json();

  const categories = Array.isArray(categoryData)
    ? categoryData
    : categoryData.categories || [];

  const products = Array.isArray(productData)
    ? productData
    : Array.isArray(productData.products)
      ? productData.products
      : Array.isArray(productData.data)
        ? productData.data
        : [];

  const currentCategory = categories.find(
    (item) => item.slug === category
  );

  return (
    <CategoryContent
      category={currentCategory}
      categorySlug={category}
      products={products}
    />
  );
}
