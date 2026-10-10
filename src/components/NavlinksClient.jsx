"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavlinksClient = ({ categories }) => {
  const pathname = usePathname();

  return (
    <nav className="bg-white">
      <div className="mx-auto w-full max-w-[1200px] px-3 sm:px-4">
        <div className="flex gap-1.5 overflow-x-auto py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map((item) => {
            const href = `/category/${item.slug}`;

            // বর্তমান category active কি না
            const isActive = pathname === href;

            return (
              <Link
                key={item.id || item.slug}
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={`group flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-200 sm:px-4 sm:py-2 sm:text-sm ${
                  isActive
                    ? "border-green-600 bg-green-600 text-white shadow-sm"
                    : "border-gray-200 bg-white text-gray-600 hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                }`}
              >
                <span
                  className={`text-sm transition-transform duration-200 group-hover:scale-110 ${
                    isActive ? "text-white" : ""
                  }`}
                >
                  {item.icon}
                </span>

                <span>{item.nameBn}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default NavlinksClient;