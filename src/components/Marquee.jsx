import React from "react";
import MarqueeText from "react-marquee-text";

const Marquee = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products"
  );

  const data = await res.json();



  return (
    <div className="border-b border-gray-200 bg-gray-50">
      <MarqueeText direction="right" duration={10}>
        <div className="flex items-center gap-3 py-2">
          {data.map((item) => {
            return (
              <div
                key={item.id}
                className="flex shrink-0 items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 shadow-sm transition hover:border-green-200 hover:shadow"
              >
                {/* Icon */}
                <span className="text-lg">
                  {item.image}
                </span>

                {/* Product Name */}
                <span className="text-xs font-medium text-gray-700">
                  {item.nameBn}
                </span>

                {/* Price */}
                <span className="text-xs font-bold text-green-600">
                  {item.today} টাকা/কেজি
                </span>

               <span
                  className={`flex items-center gap-0.5 text-xs font-semibold ${
                    item.change.pct < 0
                      ? "text-red-500"
                      : item.change.pct > 0
                      ? "text-green-600"
                      : "text-gray-400"
                  }`}
                >
                  {item.change.pct < 0 ? "↑" : item.change.pct > 0 ? "↓" : "→"}

                  {Math.abs(item.change.pct)}%
                </span>
              </div>
            );
          })}
        </div>
      </MarqueeText>
    </div>
  );
};

export default Marquee;