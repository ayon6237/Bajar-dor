import Link from "next/link";
import { notFound } from "next/navigation";

const API_URL = "https://api.abcz.workers.dev/api/bazardor/products";

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

  return units[unit] || unit;
}

export default async function ProductDetailsPage({ params }) {
  const { slug } = await params;

  const listRes = await fetch(API_URL, {
    cache: "no-store",
  });

  if (!listRes.ok) {
    throw new Error("পণ্যের তালিকা লোড করা যায়নি।");
  }

  const listData = await listRes.json();

  const products = Array.isArray(listData)
    ? listData
    : Array.isArray(listData.products)
      ? listData.products
      : Array.isArray(listData.data)
        ? listData.data
        : [];

  const matchedProduct = products.find((item) => item.slug === slug);

  if (!matchedProduct) {
    notFound();
  }

  const res = await fetch(`${API_URL}/${matchedProduct.id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("পণ্যের বিস্তারিত তথ্য লোড করা যায়নি।");
  }

  const product = await res.json();

  const change = product.change || {};
  const isUp = change.dir === "up";
  const isDown = change.dir === "down";

  const changeStyle = isUp
    ? "text-red-600"
    : isDown
      ? "text-green-700"
      : "text-gray-600";

  const changeIcon = isUp ? "▲" : isDown ? "▼" : "—";

  // Calculate summary stats from markets if available
  const markets = product.markets || [];
  let minMarket = null;
  let maxMarket = null;
  let avgPriceSum = 0;

  if (markets.length > 0) {
    minMarket = markets.reduce((min, m) => (m.min < min.min ? m : min), markets[0]);
    maxMarket = markets.reduce((max, m) => (m.max > max.max ? m : max), markets[0]);
    avgPriceSum = markets.reduce((acc, m) => acc + (Number(m.avg) || (Number(m.min) + Number(m.max)) / 2), 0);
  }
  const overallAvg = markets.length > 0 ? avgPriceSum / markets.length : product.today;

  return (
    <main className="min-h-screen bg-gray-50 pb-12 font-sans text-gray-800">
      <div className="mx-auto max-w-[1200px] px-4 py-6 sm:py-8">
        
        {/* Breadcrumb */}
        <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-green-700">
            হোম
          </Link>
          <span>›</span>
          <Link href={`/category/${product.category}`} className="hover:text-green-700">
            {product.categoryNameBn}
          </Link>
          <span>›</span>
          <span className="text-gray-800">{product.nameBn}</span>
        </div>

        {/* Top Hero Card */}
        <div className="relative rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            
            {/* Left: Icon & Info */}
            <div className="flex items-start gap-4 sm:gap-6">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gray-50 text-4xl sm:text-5xl border border-gray-100">
                {product.image || product.categoryIcon || "🍚"}
              </div>

              <div>
                <h1 className="text-2xl font-black text-gray-900 sm:text-3xl">
                  {product.nameBn}
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                  প্রতি {getUnit(product.unit)} • {product.categoryNameBn}
                </p>
                <p className="mt-2 text-xs sm:text-sm text-gray-500">
                  {change.text || "গতকালের তুলনায় আজকের দাম কমেছে - ২ টাকা"}
                </p>
              </div>
            </div>

            {/* Right: Today's Price Badge */}
            <div className="self-start md:self-center rounded-2xl bg-gray-50 border border-gray-200 px-6 py-4 text-center min-w-[140px]">
              <p className="text-xs font-semibold text-gray-400">আজকের দাম</p>
              <p className="mt-1 text-3xl font-black text-gray-900">
                {toBengaliNumber(product.today)}
              </p>
              <div className="mt-1 flex items-center justify-center gap-1 text-xs font-bold">
                <span className="text-gray-500">টাকা / {getUnit(product.unit)}</span>
              </div>
              <div className={`mt-1 flex items-center justify-center gap-1 text-xs font-bold ${changeStyle}`}>
                <span>{changeIcon}</span>
                <span>{toBengaliNumber(Math.abs(Number(change.pct) || 0))}%</span>
              </div>
            </div>

          </div>
        </div>

        {/* Summary Cards */}
        <h2 className="mt-5">দামের সারসংক্ষেপ</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
            
          
          {/* Min Price Card */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-medium text-gray-400">সর্বনিম্ন দাম</p>
            <p className="mt-2 text-2xl font-black text-green-700">
              {minMarket ? toBengaliNumber(minMarket.min) : toBengaliNumber(product.today)} টাকা
            </p>
            <p className="mt-1 text-xs text-gray-500">
              {minMarket ? `${minMarket.market} এর সাথের বাজার` : "তথ্য নেই"}
            </p>
          </div>

          {/* Max Price Card */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-medium text-gray-400">সর্বাধিক দাম</p>
            <p className="mt-2 text-2xl font-black text-red-600">
              {maxMarket ? toBengaliNumber(maxMarket.max) : toBengaliNumber(product.today)} টাকা
            </p>
            <p className="mt-1 text-xs text-gray-500">
              {maxMarket ? `${maxMarket.market} এর বেশি দামের বাজার` : "তথ্য নেই"}
            </p>
          </div>

          {/* Average Price Card */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-medium text-gray-400">গড় মূল্য</p>
            <p className="mt-2 text-2xl font-black text-gray-900">
              {toBengaliNumber(overallAvg)} টাকা
            </p>
            <p className="mt-1 text-xs text-gray-500">
              প্রতি কেজি-র গড় হিসাব
            </p>
          </div>

        </div>

        {/* Market Prices Table Section */}
        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 sm:p-8 shadow-sm">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-gray-900">
              বাজারভিত্তিক আজকের দাম
            </h2>
          </div>

          {markets.length > 0 ? (
            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[600px] text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-400 text-xs sm:text-sm">
                    <th className="px-3 py-3 font-medium">বাজার</th>
                    <th className="px-3 py-3 font-medium">বিভাগ</th>
                    <th className="px-3 py-3 font-medium">সর্বনিম্ন</th>
                    <th className="px-3 py-3 font-medium">সর্বাধিক</th>
                    <th className="px-3 py-3 font-medium">গড়</th>
                  </tr>
                </thead>

                <tbody>
                  {markets.map((market, index) => {
                    const marketAvg = (Number(market.min) + Number(market.max)) / 2;
                    return (
                      <tr
                        key={`${market.market}-${index}`}
                        className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50"
                      >
                        <td className="px-3 py-4 font-semibold text-gray-800">
                          {market.market}
                        </td>
                        <td className="px-3 py-4 text-gray-600">
                          {market.division}
                        </td>
                        <td className="px-3 py-4 font-semibold text-gray-800">
                          {toBengaliNumber(market.min)} টাকা
                        </td>
                        <td className="px-3 py-4 font-semibold text-gray-800">
                          {toBengaliNumber(market.max)} টাকা
                        </td>
                        <td className="px-3 py-4 font-semibold text-gray-800">
                          {toBengaliNumber(market.avg || marketAvg)} টাকা
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="mt-5 text-sm text-gray-500">
              বাজারের তথ্য পাওয়া যায়নি।
            </p>
          )}
        </section>

        {/* Back Link */}
        <div className="mt-6">
          <Link
            href={`/category/${product.category}`}
            className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700 shadow-sm"
          >
            <span>←</span> {product.categoryNameBn} ক্যাটাগরিতে ফিরে যান
          </Link>
        </div>

      </div>
    </main>
  );
}