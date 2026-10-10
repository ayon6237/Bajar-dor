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

// দাম বাড়লে লাল down icon, কমলে সবুজ up icon
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
      className="group flex h-full min-w-0 flex-col rounded-xl border border-gray-200 bg-white p-3 transition duration-200 hover:-translate-y-1 hover:border-green-300 hover:shadow-lg sm:rounded-2xl sm:p-4"
    >
      {/* Product Information */}
      <div className="flex min-w-0 items-center gap-3">
        {/* Product Icon */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-3xl sm:h-16 sm:w-16 sm:text-4xl">
          {item.image || item.categoryIcon || "🛒"}
        </div>

        {/* Product Name and Category */}
        <div className="min-w-0 flex-1">
          <h2 className="break-words text-sm font-bold text-gray-900 transition group-hover:text-green-700 sm:text-base">
            {item.nameBn || "নামহীন পণ্য"}
          </h2>

          <p className="mt-1 text-xs text-gray-500 sm:text-sm">
            {getUnit(item.unit)}
          </p>

          {item.categoryNameBn && (
            <p className="mt-1 break-words text-[11px] text-gray-400 sm:text-xs">
              {item.categoryNameBn}
            </p>
          )}
        </div>
      </div>

      {/* Today's Price and Change */}
      <div className="mt-auto flex flex-wrap items-end justify-between gap-3 border-t border-gray-100 pt-3 sm:mt-4 sm:pt-4">
        <div className="min-w-0">
          <p className="text-xs text-gray-500 sm:text-sm">
            আজকের দাম
          </p>

          <p className="mt-1 break-words text-lg font-extrabold text-gray-900 sm:text-xl">
            {toBengaliNumber(item.today)}{" "}
            <span className="text-xs font-medium sm:text-sm">
              টাকা
            </span>
          </p>
        </div>

        <span
          className={`inline-flex shrink-0 items-center rounded-lg px-2 py-1.5 text-xs font-bold sm:px-2.5 sm:py-2 sm:text-sm ${changeInfo.style}`}
        >
          {changeInfo.label}
        </span>
      </div>
    </Link>
  );
}

export default async function ProductsPage() {
  const res = await fetch(API_URL, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("পণ্যের তথ্য লোড করা যায়নি।");
  }

  const data = await res.json();

  const products = Array.isArray(data)
    ? data
    : Array.isArray(data?.products)
      ? data.products
      : Array.isArray(data?.data)
        ? data.data
        : [];

  return (
    <main id="products" className="scroll-mt-4 min-h-screen w-full bg-gray-50">
      <div className="mx-auto w-full max-w-[1200px] px-3 py-6 sm:px-5 sm:py-8 md:px-6 lg:py-10">
        {/* Page Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl font-extrabold text-gray-900 sm:text-3xl lg:text-4xl">
            সব পণ্য
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
            নিত্যপ্রয়োজনীয় পণ্যের আজকের বাজারদর ও দামের পরিবর্তন
            এক নজরে দেখে নিন।
          </p>

          <div className="mt-4 inline-flex max-w-full items-center rounded-full bg-white px-3 py-2 text-xs font-medium text-gray-600 shadow-sm sm:px-4 sm:text-sm">
            মোট {toBengaliNumber(products.length)}টি পণ্য দেখানো হচ্ছে
          </div>
        </div>

        {/* All Products */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 items-stretch gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-5">
            {products.map((item, index) => (
              <ProductCard
                key={item.id ?? item.slug ?? index}
                item={item}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="rounded-xl border border-gray-200 bg-white px-4 py-10 text-center sm:rounded-2xl sm:py-14">
            <p className="text-4xl sm:text-5xl">🛒</p>

            <h2 className="mt-3 text-base font-bold text-gray-800 sm:text-lg">
              কোনো পণ্য পাওয়া যায়নি
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              পণ্যের তালিকা এখন পাওয়া যাচ্ছে না। পরে আবার চেষ্টা করুন।
            </p>
          </div>
        )}
      </div>
    </main>
  );
}