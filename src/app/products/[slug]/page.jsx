
import Link from "next/link";
import { notFound } from "next/navigation";

export const instant = false;

const API_URL = "https://api.abcz.workers.dev/api/bazardor/products";

async function fetchProductData(url) {
  const res = await fetch(url, {
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    throw new Error("পণ্যের তথ্য লোড করা যায়নি।");
  }

  return res.json();
}

function toBengaliNumber(value) {
  return new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 2,
  }).format(Number(value) || 0);
}

function getUnit(unit) {
  const units = {
    kg: "কেজি",
    litre: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
    pcs: "পিস",
  };

  return units[unit] || unit || "একক";
}

export default async function ProductDetailsPage({ params }) {
  const { slug } = await params;

  // প্রথমে পণ্যের তালিকা থেকে slug অনুযায়ী পণ্য খুঁজব
  const listData = await fetchProductData(API_URL);

  const products = Array.isArray(listData)
    ? listData
    : Array.isArray(listData?.products)
      ? listData.products
      : Array.isArray(listData?.data)
        ? listData.data
        : [];

  const matchedProduct = products.find((item) => item.slug === slug);

  if (!matchedProduct) {
    notFound();
  }

  // এরপর নির্দিষ্ট পণ্যের বিস্তারিত তথ্য আনব
  const productData = await fetchProductData(
    `${API_URL}/${matchedProduct.id}`
  );

  // API সরাসরি product অথবা { product: ... } ফেরত দিতে পারে
  const product = productData?.product || productData;

  if (!product || !product.id) {
    notFound();
  }

  const change = product.change || {};
  const isUp = change.dir === "up";
  const isDown = change.dir === "down";

  const changeStyle = isUp
    ? "text-red-600"
    : isDown
      ? "text-green-700"
      : "text-gray-600";

  const changeIcon = isUp ? "▲" : isDown ? "▼" : "—";

  const markets = Array.isArray(product.markets) ? product.markets : [];

  const marketPrices = markets
    .map((market) => ({
      ...market,
      min: Number(market.min),
      max: Number(market.max),
      avg:
        market.avg !== undefined && market.avg !== null
          ? Number(market.avg)
          : (Number(market.min) + Number(market.max)) / 2,
    }))
    .filter(
      (market) =>
        Number.isFinite(market.min) &&
        Number.isFinite(market.max)
    );

  const minMarket =
    marketPrices.length > 0
      ? marketPrices.reduce((min, market) =>
          market.min < min.min ? market : min
        )
      : null;

  const maxMarket =
    marketPrices.length > 0
      ? marketPrices.reduce((max, market) =>
          market.max > max.max ? market : max
        )
      : null;

  const overallAvg =
    marketPrices.length > 0
      ? marketPrices.reduce((sum, market) => sum + market.avg, 0) /
        marketPrices.length
      : Number(product.today) || 0;

  return (
    <main className="min-h-screen bg-gray-50 pb-12 font-sans text-gray-800">
      <div className="mx-auto max-w-[1200px] px-4 py-6 sm:py-8">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-500"
        >
          <Link href="/" className="hover:text-green-700">
            হোম
          </Link>

          <span aria-hidden="true">›</span>

          <Link
            href={`/category/${product.category}`}
            className="hover:text-green-700"
          >
            {product.categoryNameBn || "ক্যাটাগরি"}
          </Link>

          <span aria-hidden="true">›</span>

          <span className="text-gray-800">{product.nameBn}</span>
        </nav>

        {/* Product Hero Card */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            {/* Product Information */}
            <div className="flex items-start gap-4 sm:gap-6">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-gray-100 bg-gray-50 text-4xl sm:h-24 sm:w-24 sm:text-5xl">
                {product.image || product.categoryIcon || "🍚"}
              </div>

              <div>
                <h1 className="text-2xl font-black text-gray-900 sm:text-3xl">
                  {product.nameBn}
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                  প্রতি {getUnit(product.unit)} •{" "}
                  {product.categoryNameBn || "নিত্যপ্রয়োজনীয় পণ্য"}
                </p>

                <p className="mt-2 text-xs leading-6 text-gray-500 sm:text-sm">
                  {change.text ||
                    "আজকের দাম ও আগের দিনের দামের পরিবর্তন দেখুন।"}
                </p>
              </div>
            </div>

            {/* Today's Price */}
            <div className="min-w-[150px] self-start rounded-2xl border border-gray-200 bg-gray-50 px-6 py-4 text-center md:self-center">
              <p className="text-xs font-semibold text-gray-400">
                আজকের দাম
              </p>

              <p className="mt-1 text-3xl font-black text-gray-900">
                {toBengaliNumber(product.today)}
              </p>

              <p className="mt-1 text-xs font-medium text-gray-500">
                টাকা / {getUnit(product.unit)}
              </p>

              <div
                className={`mt-2 flex items-center justify-center gap-1 text-xs font-bold ${changeStyle}`}
              >
                <span aria-hidden="true">{changeIcon}</span>
                <span>
                  {toBengaliNumber(
                    Math.abs(Number(change.pct) || 0)
                  )}
                  %
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Price Summary */}
        <h2 className="mt-8 text-lg font-extrabold text-gray-900">
          দামের সারসংক্ষেপ
        </h2>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Minimum Price */}
          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-medium text-gray-400">
              সর্বনিম্ন দাম
            </p>

            <p className="mt-2 text-2xl font-black text-green-700">
              {toBengaliNumber(
                minMarket ? minMarket.min : product.today
              )}{" "}
              টাকা
            </p>

            <p className="mt-1 text-xs text-gray-500">
              {minMarket?.market || "বাজারের তথ্য নেই"}
            </p>
          </section>

          {/* Maximum Price */}
          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-medium text-gray-400">
              সর্বাধিক দাম
            </p>

            <p className="mt-2 text-2xl font-black text-red-600">
              {toBengaliNumber(
                maxMarket ? maxMarket.max : product.today
              )}{" "}
              টাকা
            </p>

            <p className="mt-1 text-xs text-gray-500">
              {maxMarket?.market || "বাজারের তথ্য নেই"}
            </p>
          </section>

          {/* Average Price */}
          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:col-span-2 lg:col-span-1">
            <p className="text-xs font-medium text-gray-400">
              গড় মূল্য
            </p>

            <p className="mt-2 text-2xl font-black text-gray-900">
              {toBengaliNumber(overallAvg)} টাকা
            </p>

            <p className="mt-1 text-xs text-gray-500">
              {markets.length > 0
                ? `${markets.length}টি বাজারের গড়`
                : "বাজারের তথ্য নেই"}
            </p>
          </section>
        </div>

        {/* Market Prices Table */}
        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
          <div>
            <h2 className="text-lg font-extrabold text-gray-900 sm:text-xl">
              বাজারভিত্তিক আজকের দাম
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              বিভিন্ন বাজারে এই পণ্যের সর্বনিম্ন, সর্বাধিক ও গড় দাম।
            </p>
          </div>

          {marketPrices.length > 0 ? (
            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[600px] text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-xs text-gray-400 sm:text-sm">
                    <th className="px-3 py-3 font-medium">বাজার</th>
                    <th className="px-3 py-3 font-medium">বিভাগ</th>
                    <th className="px-3 py-3 font-medium">সর্বনিম্ন</th>
                    <th className="px-3 py-3 font-medium">সর্বাধিক</th>
                    <th className="px-3 py-3 font-medium">গড়</th>
                  </tr>
                </thead>

                <tbody>
                  {marketPrices.map((market, index) => (
                    <tr
                      key={`${market.market || "market"}-${index}`}
                      className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50"
                    >
                      <td className="px-3 py-4 font-semibold text-gray-800">
                        {market.market || "—"}
                      </td>

                      <td className="px-3 py-4 text-gray-600">
                        {market.division || "—"}
                      </td>

                      <td className="px-3 py-4 font-semibold text-gray-800">
                        {toBengaliNumber(market.min)} টাকা
                      </td>

                      <td className="px-3 py-4 font-semibold text-gray-800">
                        {toBengaliNumber(market.max)} টাকা
                      </td>

                      <td className="px-3 py-4 font-semibold text-gray-800">
                        {toBengaliNumber(market.avg)} টাকা
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="mt-5 rounded-xl bg-gray-50 p-4 text-sm text-gray-500">
              এই পণ্যের বাজারভিত্তিক তথ্য পাওয়া যায়নি।
            </p>
          )}
        </section>

        {/* Back to Category */}
        <div className="mt-6">
          <Link
            href={`/category/${product.category}`}
            className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-green-700"
          >
            <span aria-hidden="true">←</span>
            {product.categoryNameBn || "ক্যাটাগরি"}-তে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
}
