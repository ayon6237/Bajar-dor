import Image from "next/image";
import React from "react";

const Hero = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <section className="bg-white">
      <div className="container mx-auto max-w-[1200px] px-4 py-10 sm:py-14 lg:py-16">
        <div className="grid items-center gap-10 md:grid-cols-2 lg:gap-16">

          {/* Left Content */}
          <div className="order-2 md:order-1">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-green-100 bg-green-50 px-3 py-1.5">
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              <p className="text-xs font-medium text-green-700">
                {date}
              </p>
            </div>

            <h1 className="max-w-xl text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              আজকের বাজারের দাম
              <span className="mt-1 block text-green-600">
                এক নজরে
              </span>
            </h1>

            <p className="mt-5 max-w-lg text-sm leading-7 text-gray-600 sm:text-base">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
              বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং
              দামের পরিবর্তন এক জায়গায়।
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <a
                href="/products"
                className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 hover:shadow-md"
              >
                সব পণ্য দেখুন
                <span aria-hidden="true">→</span>
              </a>

              
            </div>
          </div>

          {/* Right Image */}
          <div className="order-1 flex justify-center md:order-2 md:justify-end">
            <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-green-50">
              <Image
                src="/bazar-hero.png"
                alt="বাজারের নিত্যপ্রয়োজনীয় পণ্য"
                width={600}
                height={500}
                priority
                className="h-auto w-full object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;