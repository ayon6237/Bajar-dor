
import MarqueeText from "react-marquee-text";

const API_URL =
  "https://api.abcz.workers.dev/api/bazardor/products";

async function getProducts() {
  const res = await fetch(API_URL, {
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    throw new Error("পণ্যের তালিকা লোড করা যায়নি।");
  }

  const data = await res.json();

  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data?.products)) {
    return data.products;
  }

  if (Array.isArray(data?.data)) {
    return data.data;
  }

  return [];
}

function MarqueeItem({ item }) {
  const pct = Number(item.change?.pct) || 0;

  const changeStyle =
    pct < 0
      ? "text-red-500"
      : pct > 0
        ? "text-green-600"
        : "text-gray-400";

  const changeIcon =
    pct < 0 ? "↓" : pct > 0 ? "↑" : "→";

  return (
    <div className="flex shrink-0 items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 shadow-sm transition hover:border-green-200 hover:shadow">
      {/* Product Icon */}
      <span className="text-lg">
        {item.image || item.categoryIcon || "🛒"}
      </span>

      {/* Product Name */}
      <span className="text-xs font-medium text-gray-700">
        {item.nameBn || "পণ্য"}
      </span>

      {/* Today's Price */}
      <span className="text-xs font-bold text-green-600">
        {item.today ?? "—"} টাকা
        {item.unit ? `/${item.unit}` : ""}
      </span>

      {/* Price Change */}
      <span
        className={`flex items-center gap-0.5 text-xs font-semibold ${changeStyle}`}
      >
        <span aria-hidden="true">{changeIcon}</span>
        {Math.abs(pct)}%
      </span>
    </div>
  );
}

export default async function Marquee() {
  const products = await getProducts();

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="overflow-hidden border-b border-gray-200 bg-gray-50">
      <MarqueeText direction="right" duration={10}>
        <div className="flex items-center gap-3 py-2">
          {products.map((item) => (
            <MarqueeItem key={item.id} item={item} />
          ))}
        </div>
      </MarqueeText>
    </div>
  );
}
