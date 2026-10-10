import NavlinksClient from "./NavlinksClient";

const API_URL = "https://api.abcz.workers.dev/api/bazardor/categories";

const Navlinks = async () => {
  let categories = [];

  try {
    const res = await fetch(API_URL, {
      cache: "force-cache",
    });

    if (!res.ok) {
      throw new Error(`API Error: ${res.status}`);
    }

    const data = await res.json();

    categories = Array.isArray(data)
      ? data
      : Array.isArray(data.categories)
        ? data.categories
        : [];
  } catch (error) {
    console.error("Categories fetch failed:", error);
  }

  return <NavlinksClient categories={categories} />;
};

export default Navlinks;
