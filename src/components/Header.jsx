
import Image from "next/image";
import React from "react";
import Navlinks from "./Navlinks";
import Link from "next/link";

const Header = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <header className=" bg-white">
      <div className="container mx-auto max-w-[1200px] flex min-h-20 items-center justify-between px-4">

  
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50">
            <Image
              height={50}
              width={50}
              className="h-10 w-10 object-contain"
              src="/logo-icon.png"
              alt="বাজার দর"
            />
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              বাজার দর
            </h2>

            <p className="mt-0.5 text-xs text-gray-500">
              {date}
            </p>
          </div>
        </div>

     
        <div className="flex items-center gap-2">
         <Link href="/login">
             <button className="rounded-lg border cursor-pointer border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
            সাইন ইন
          </button>
         </Link>

          <Link href="/register">
            <button className="rounded-lg cursor-pointer bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700">
            সাইন আপ
          </button>
          </Link>
        </div>

      </div>

      <Navlinks />
    </header>
  );
};

export default Header;