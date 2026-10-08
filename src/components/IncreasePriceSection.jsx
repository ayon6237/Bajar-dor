
import Link from "next/link";

const API_URL =
  "https://api.abcz.workers.dev/api/bazardor/products";

function toBengaliNumber(value) {
  return new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 2,
  }).format(Number(value) || 0);
}

function getUnit(unit) {
  const units = {
    kg: "প্রতি কেজি",
    litre: "প্রতি লিটার",
    dozen: "প্রতি ডজন",
    piece: "প্রতি পিস",
    pcs: "প্রতি পিস",
  };

  return units[unit] || "প্রতি কেজি";
}


function getChangeInfo(change) {
  const direction = change?.dir || "flat";
  const percentage = Number(change?.pct) || 0;

  if (direction === "up") {
    return {
      label: `▼ ${toBengaliNumber(Math.abs(percentage))}%`,
      style: "bg-red-50 text-red-600",
    };
  }

  if (direction === "down") {
    return {
      label: `▲ ${toBengaliNumber(Math.abs(percentage))}%`,
      style: "bg-green-50 text-green-700",
    };
  }

  return {
    label: `—${toBengaliNumber(0)}%`,
    style: "bg-gray-100 text-gray-600",
  };
}


function ProductCard({ item }) {
  const changeInfo = getChangeInfo(item.change);

  return (
    <Link
      href={`/products/${item.slug}`}
      className="group block rounded-2xl border border-gray-200 bg-white p-4 transition duration-200 hover:-translate-y-1 hover:border-green-300 hover:shadow-lg"
    >
      {/* Product Image and Name */}
      <div className="flex items-center gap-3">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-4xl">
          {item.image || item.categoryIcon || "🛒"}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-base font-bold text-gray-900 transition group-hover:text-green-700">
            {item.nameBn}
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            {getUnit(item.unit)}
          </p>

          {item.categoryNameBn && (
            <p className="mt-1 text-xs text-gray-400">
              {item.categoryNameBn}
            </p>
          )}
        </div>
      </div>

      {/* Today's Price and Price Change */}
      <div className="mt-4 flex items-end justify-between gap-3 border-t border-gray-100 pt-3">
        <div>
          <p className="text-sm text-gray-500">
            আজকের দাম
          </p>

          <p className="mt-1 text-xl font-extrabold text-gray-900">
            {toBengaliNumber(item.today)}{" "}
            <span className="text-sm font-medium">
              টাকা
            </span>
          </p>
        </div>

        <span
          className={`shrink-0 rounded-lg px-2.5 py-2 text-sm font-bold ${changeInfo.style}`}
        >
          {changeInfo.label}
        </span>
      </div>
    </Link>
  );
}

function ProductSection({
  title,
  subtitle,
  products,
  type,
}) {
  const isUp = type === "up";

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
      {/* Section Heading */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
            <span
              className={
                isUp ? "text-green-600" : "text-red-500"
              }
            >
              {isUp ? "↗" : "↘"}
            </span>{" "}
            {title}
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            {subtitle}
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1.5 text-sm font-semibold ${
            isUp
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-600"
          }`}
        >
          {toBengaliNumber(products.length)}টি পণ্য
        </span>
      </div>

      {/* Product Cards */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((item) => (
            <ProductCard
              key={item.id}
              item={item}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-xl bg-gray-50 px-4 py-10 text-center">
          <span className="text-4xl">
            {isUp ? "📊" : "🛒"}
          </span>

          <p className="mt-3 font-medium text-gray-700">
            এই মুহূর্তে কোনো পণ্যের তথ্য পাওয়া যায়নি।
          </p>

          <p className="mt-1 text-sm text-gray-500">
            পরে আবার চেষ্টা করুন।
          </p>
        </div>
      )}

    
    </section>
  );
}

export default async function PriceSections() {
  const res = await fetch(API_URL, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("পণ্যের তথ্য লোড করা যায়নি।");
  }

  const data = await res.json();

  const products = Array.isArray(data)
    ? data
    : data.products || [];

  const increasedProducts = products
    .filter((item) => item.change?.dir === "up")
    .slice(0, 6);

  const decreasedProducts = products
    .filter((item) => item.change?.dir === "down")
    .slice(0, 6);

  return (
    <main className="bg-gray-50">
      <div className="mx-auto max-w-[1200px] space-y-8 px-4 py-8 sm:py-10">
        <ProductSection
          title="আজ দাম বেড়েছে"
          products={increasedProducts}
          type="up"
        />

        <ProductSection
          title="আজ দাম কমেছে" 
          products={decreasedProducts}
          type="down"
        />
      </div>
    </main>
  );
}
