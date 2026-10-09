import Link from "next/link";

const API_URL =
  "https://api.abcz.workers.dev/api/bazardor/categories";

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

  return (
    <nav className="bg-white">
      <div className="container mx-auto max-w-[1200px] px-4">
        <div className="flex gap-1.5 overflow-x-auto py-2.5">
          {categories.map((item) => (
            <Link
              key={item.id || item.slug}
              href={`/category/${item.slug}`}
              className="group flex shrink-0 items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 transition-all duration-200 hover:border-green-200 hover:bg-green-50 hover:text-green-700"
            >
              <span className="text-sm transition-transform duration-200 group-hover:scale-110">
                {item.icon}
              </span>

              <span>{item.nameBn}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navlinks;