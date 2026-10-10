import { notFound } from "next/navigation";
import CategoryContent from "./CategoryContent";

const API_URL = "https://api.abcz.workers.dev/api/bazardor";

export default async function CategoryPage({ params }) {
  const { category } = await params;

  const [categoryRes, productRes] = await Promise.all([
    fetch(`${API_URL}/categories`, {
      cache: "no-store",
    }),

    fetch(
      `${API_URL}/products?category=${encodeURIComponent(category)}`,
      {
        cache: "no-store",
      }
    ),
  ]);

  // API error হলে 404 নয়, error boundary দেখাবে
  if (!categoryRes.ok || !productRes.ok) {
    throw new Error("পণ্যের তথ্য লোড করা যায়নি।");
  }

  const [categoryData, productData] = await Promise.all([
    categoryRes.json(),
    productRes.json(),
  ]);

  // Category list normalize করা
  const categories = Array.isArray(categoryData)
    ? categoryData
    : Array.isArray(categoryData?.categories)
      ? categoryData.categories
      : [];

  // Product list normalize করা
  const products = Array.isArray(productData)
    ? productData
    : Array.isArray(productData?.products)
      ? productData.products
      : Array.isArray(productData?.data)
        ? productData.data
        : [];

  // URL-এর category slug বৈধ কি না যাচাই
  const currentCategory = categories.find(
    (item) => item.slug === category
  );

  // Category না থাকলে 404 page
  if (!currentCategory) {
    notFound();
  }

  return (
    <CategoryContent
      category={currentCategory}
      categorySlug={category}
      products={products}
    />
  );
}