"use client";

export default function ErrorPage({ error, reset }) {
  return (
    <main className="flex min-h-[60vh] items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm sm:p-8">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-3xl">
          ⚠️
        </div>

        <h1 className="mt-4 text-xl font-bold text-gray-900 sm:text-2xl">
          দুঃখিত! কিছু একটা সমস্যা হয়েছে
        </h1>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          পেজটি লোড করা যায়নি। ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।
        </p>

        <button
          onClick={() => reset()}
          className="mt-6 min-h-11 rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
        >
          আবার চেষ্টা করুন
        </button>
      </div>
    </main>
  );
}