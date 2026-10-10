import Image from "next/image";
import CurrentDate from "./CurrentDate";

const Hero = () => {
  return (
    <section className="w-full overflow-hidden bg-white">
      <div className="mx-auto w-full max-w-[1200px] px-4 py-8 sm:px-6 sm:py-12 lg:px-6 lg:py-16">
        <div className="grid grid-cols-1 items-center gap-8 sm:gap-10 md:grid-cols-2 md:gap-8 lg:gap-16">
          {/* Left Content */}
          <div className="order-2 min-w-0 md:order-1">
            {/* Current Date Badge */}
            <div className="mb-4 inline-flex max-w-full items-center gap-2 rounded-full border border-green-100 bg-green-50 px-3 py-1.5 sm:mb-5">
              <span className="h-2 w-2 shrink-0 rounded-full bg-green-500" />

              <p className="text-xs font-medium text-green-700 sm:text-sm">
                <CurrentDate />
              </p>
            </div>

            {/* Heading */}
            <h1 className="max-w-xl text-3xl font-extrabold leading-snug tracking-tight text-gray-900 sm:text-4xl sm:leading-tight lg:text-5xl">
              আজকের বাজারের দাম
              <span className="mt-1 block text-green-600">এক নজরে</span>
            </h1>

            {/* Description */}
            <p className="mt-4 max-w-lg text-sm leading-7 text-gray-600 sm:mt-5 sm:text-base sm:leading-8">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
              বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>

            {/* CTA Button */}
            <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-7 sm:gap-4">
              <a
                href="#products"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-green-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 sm:px-6 sm:text-base"
              >
                সব পণ্য দেখুন
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          {/* Right Image */}
          <div className="order-1 flex min-w-0 justify-center md:order-2 md:justify-end">
            <div className="relative w-full max-w-[420px] overflow-hidden rounded-2xl bg-green-50 sm:rounded-3xl md:max-w-full">
              <Image
                src="/bazar-hero.png"
                alt="বাজারের নিত্যপ্রয়োজনীয় পণ্য"
                width={600}
                height={500}
                priority
                className="h-auto w-full object-contain"
                sizes="(max-width: 639px) 100vw, (max-width: 767px) 90vw, (max-width: 1023px) 45vw, 540px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
