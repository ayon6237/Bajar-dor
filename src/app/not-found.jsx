import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md text-center">
        <p className="text-7xl font-extrabold tracking-tight text-green-600 sm:text-8xl">
          404
        </p>

        <h1 className="mt-4 text-xl font-bold text-gray-900 sm:text-2xl">
          পেজটি খুঁজে পাওয়া যায়নি
        </h1>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          আপনি যে পেজটি খুঁজছেন সেটি নেই, অথবা লিংকটি ভুল।
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}