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
    <div className="flex shrink-0 items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 shadow-sm transition hover:border-green-200 hover:shadow sm:gap-2 sm:px-4 sm:py-2">
      {/* Product Icon */}
      <span className="shrink-0 text-base sm:text-lg">
        {item.image || item.categoryIcon || "🛒"}
      </span>

      {/* Product Name */}
      <span className="whitespace-nowrap text-[11px] font-medium text-gray-700 sm:text-xs">
        {item.nameBn || "পণ্য"}
      </span>

      {/* Today's Price */}
      <span className="whitespace-nowrap text-[11px] font-bold text-green-600 sm:text-xs">
        {item.today ?? "—"} টাকা
        {item.unit ? `/${item.unit}` : ""}
      </span>

      {/* Price Change */}
      <span
        className={`flex shrink-0 items-center gap-0.5 whitespace-nowrap text-[11px] font-semibold sm:text-xs ${changeStyle}`}
      >
        <span aria-hidden="true">{changeIcon}</span>
        {Math.abs(pct)}%
      </span>
    </div>
  );
}

export default async function Marquee() {
  let products = [];

  try {
    products = await getProducts();
  } catch (error) {
    console.error("Marquee products fetch error:", error);
    return null;
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="w-full overflow-hidden border-b border-gray-200 bg-gray-50">
      <MarqueeText direction="right" duration={10}>
        <div className="flex w-max items-center gap-2 py-2 sm:gap-3 sm:py-2.5">
          {products.map((item, index) => (
            <MarqueeItem
              key={item.id ?? item.slug ?? `${item.nameBn}-${index}`}
              item={item}
            />
          ))}
        </div>
      </MarqueeText>
    </div>
  );
}