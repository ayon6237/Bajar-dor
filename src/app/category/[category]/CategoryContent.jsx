
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

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
    label: `— ${toBengaliNumber(0)}%`,
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
      <div className="flex items-center gap-3">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-4xl">
          {item.image || item.categoryIcon || "🛒"}
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="text-base font-bold text-gray-900 transition group-hover:text-green-700">
            {item.nameBn}
          </h2>

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

export default function CategoryContent({
  category,
  categorySlug,
  products,
}) {
  const [sort, setSort] = useState("default");

  const sortedProducts = useMemo(() => {
    const list = [...products];

    if (sort === "ascending") {
      list.sort(
        (a, b) => Number(a.today) - Number(b.today)
      );
    } else if (sort === "descending") {
      list.sort(
        (a, b) => Number(b.today) - Number(a.today)
      );
    }

    return list;
  }, [products, sort]);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-[1200px] space-y-5 px-4 py-8 sm:py-10">

        {/* 1. Category Header */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-4xl">
              {category?.icon || products[0]?.categoryIcon || "🛒"}
            </div>

            <div>
              <h1 className="text-2xl font-extrabold text-gray-900">
                {category?.nameBn || categorySlug}
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                মোট {toBengaliNumber(products.length)}টি পণ্য
              </p>
            </div>
          </div>

          <div className="mt-5 border-t border-gray-100 pt-4">
            <h2 className="text-lg font-bold text-gray-900">
              ৪টি পণ্যের আজকের দাম ও পরিবর্তন
            </h2>
          </div>
        </div>

        {/* 2. Sorting Options */}
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-white p-4">
          <h2 className="font-bold text-gray-800">
            পণ্য সাজান
          </h2>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 outline-none focus:border-green-500"
          >
            <option value="default">Default</option>
            <option value="ascending">
              Ascending — কম দাম আগে
            </option>
            <option value="descending">
              Descending — বেশি দাম আগে
            </option>
          </select>
        </div>

        {/* 3. Products Grid */}
        <div>
          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {sortedProducts.map((item) => (
                <ProductCard
                  key={item.id}
                  item={item}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-gray-200 bg-white px-4 py-12 text-center">
              <p className="text-4xl">🛒</p>

              <h2 className="mt-3 text-lg font-bold text-gray-800">
                কোনো পণ্য পাওয়া যায়নি
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                পরে আবার চেষ্টা করুন।
              </p>
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
