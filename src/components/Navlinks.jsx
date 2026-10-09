import Link from "next/link";
import React from "react";

const Navlinks = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/categories"
  );

  const data = await res.json();

  return (
    <nav className=" bg-white">
      <div className="container max-w-[1200px] mx-auto px-4">
        <div className="flex gap-1.5 overflow-x-auto py-2.5">

          {data.map((item) => (
            <Link
              key={item.id}
              href={`/category/${item.slug}`}
              className="
                group flex shrink-0 items-center gap-1.5
                rounded-full border border-gray-200
                bg-white px-3 py-1.5
                text-xs font-medium text-gray-600
                transition-all duration-200
                hover:border-green-200
                hover:bg-green-50
                hover:text-green-700
              "
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