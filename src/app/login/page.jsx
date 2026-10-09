"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const result = await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
        callbackURL: "/",
      });

      if (result.error) {
        setError(
          result.error.message ||
            "লগইন করা যায়নি। ইমেইল ও পাসওয়ার্ড যাচাই করো।"
        );
        return;
      }

      // Login সফল হলে home page-এ যাবে
      router.replace("/");
      router.refresh();
    } catch (err) {
      console.error("Login error:", err);

      setError(
        "সার্ভারের সঙ্গে যোগাযোগ করা যায়নি। আবার চেষ্টা করো।"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#f0f5f0] px-4 py-8">
      {/* Heading */}
      <div className="mb-5 text-center">
        <h1 className="text-2xl font-extrabold text-gray-800">
          সাইন ইন
        </h1>

        <p className="mt-2 text-xs leading-5 text-gray-500">
          বিস্তারিত দাম, সেভ করা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white/80 p-5 shadow-sm sm:p-7">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-xs font-semibold text-gray-700"
            >
              ইমেইল
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
              className="w-full rounded-lg border border-gray-200 bg-transparent px-3 py-2.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-xs font-semibold text-gray-700"
            >
              পাসওয়ার্ড
            </label>

            <input
              id="password"
              name="password"
              type="password"
              placeholder="তোমার পাসওয়ার্ড লিখো"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
              className="w-full rounded-lg border border-gray-200 bg-transparent px-3 py-2.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700"
            >
              {error}
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-green-700 py-3 text-sm font-bold text-white shadow-md transition hover:bg-green-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "লগইন হচ্ছে..." : "সাইন ইন"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-4 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />

          <span className="text-xs text-gray-500">
            অথবা
          </span>

          <div className="h-px flex-1 bg-gray-200" />
        </div>

        {/* Social Login */}
        <div className="grid grid-cols-2 gap-2">
          {/* Google */}
          <button
            type="button"
            onClick={() =>
              alert("Google authentication এখনো সেটআপ করা হয়নি।")
            }
            className="flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 px-2 py-2.5 text-xs font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            <span className="text-base font-bold text-blue-600">
              G
            </span>

            Google দিয়ে চালিয়ে যান
          </button>

          {/* GitHub */}
          <button
            type="button"
            onClick={() =>
              alert("GitHub authentication এখনো সেটআপ করা হয়নি।")
            }
            className="flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 px-2 py-2.5 text-xs font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 shrink-0"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.54v-2.1c-3.1.68-3.76-1.32-3.76-1.32-.5-1.3-1.24-1.65-1.24-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.73 1.16 1.73 1.16 1 1.72 2.62 1.22 3.26.93.1-.72.4-1.22.71-1.5-2.48-.28-5.09-1.24-5.09-5.5 0-1.22.44-2.22 1.16-3-.12-.28-.5-1.42.11-2.97 0 0 .95-.3 3.05 1.15a10.6 10.6 0 0 1 5.56 0c2.1-1.45 3.05-1.15 3.05-1.15.61 1.55.23 2.69.11 2.97.72.78 1.16 1.78 1.16 3 0 4.27-2.61 5.21-5.1 5.49.4.35.75 1.02.75 2.06v3.12c0 .3.2.65.76.54A11.1 11.1 0 0 0 12 .9Z" />
            </svg>

            GitHub দিয়ে চালিয়ে যান
          </button>
        </div>

        {/* Register Link */}
        <p className="mt-5 text-center text-xs text-gray-600">
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/register"
            className="font-bold text-green-700 hover:text-green-800 hover:underline"
          >
            সাইন আপ করুন
          </Link>
        </p>
      </div>

      {/* Back to Home */}
      <Link
        href="/"
        className="mt-5 text-xs text-gray-500 transition hover:text-green-700"
      >
        ← হোম পেজে ফিরে যান
      </Link>
    </main>
  );
}