
import { Suspense } from "react";
import NavlinksClient from "./NavlinksClient";

const API_URL = "https://api.abcz.workers.dev/api/bazardor/categories";

async function getCategories() {
  try {
    const res = await fetch(API_URL, {
      cache: "force-cache",
    });

    if (!res.ok) {
      throw new Error(`API Error: ${res.status}`);
    }

    const data = await res.json();

    return Array.isArray(data)
      ? data
      : Array.isArray(data?.categories)
        ? data.categories
        : [];
  } catch (error) {
    console.error("Categories fetch failed:", error);
    return [];
  }
}

export default async function Navlinks() {
  const categories = await getCategories();

  return (
    <Suspense
      fallback={
        <nav className="bg-white">
          <div className="mx-auto w-full max-w-[1200px] px-3 sm:px-4">
            <div className="flex gap-2 overflow-hidden py-3">
              <div className="h-8 w-20 animate-pulse rounded-full bg-gray-100" />
              <div className="h-8 w-24 animate-pulse rounded-full bg-gray-100" />
              <div className="h-8 w-20 animate-pulse rounded-full bg-gray-100" />
            </div>
          </div>
        </nav>
      }
    >
      <NavlinksClient categories={categories} />
    </Suspense>
  );
}
