"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrorMessage("");
    setSuccessMessage("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (loading) return;

    setErrorMessage("");
    setSuccessMessage("");

    const name = formData.name.trim();
    const email = formData.email.trim();

    if (!name) {
      setErrorMessage("আপনার নাম লিখুন।");
      return;
    }

    if (!email) {
      setErrorMessage("আপনার ইমেইল লিখুন।");
      return;
    }

    if (formData.password.length < 8) {
  setErrorMessage(
    "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।"
  );
  return;
}

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage(
        "পাসওয়ার্ড এবং কনফার্ম পাসওয়ার্ড মিলছে না।"
      );
      return;
    }

    setLoading(true);

    try {
      const result = await authClient.signUp.email({
        name,
        email,
        password: formData.password,
        callbackURL: "/login",
      });

      if (result.error) {
        setErrorMessage(
          result.error.message ||
            "নিবন্ধন করা যায়নি। আবার চেষ্টা করুন।"
        );
        return;
      }

      setSuccessMessage(
        "আপনার অ্যাকাউন্ট তৈরি হয়েছে। Login page-এ নেওয়া হচ্ছে..."
      );

      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Registration error:", error);

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "নিবন্ধনের সময় সমস্যা হয়েছে। আবার চেষ্টা করুন।"
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
          অ্যাকাউন্ট তৈরি করুন
        </h1>

        <p className="mt-2 text-xs text-gray-500">
          সহজেই আপনার অ্যাকাউন্ট তৈরি করুন।
        </p>
      </div>

      {/* Register Card */}
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
        {/* Error Message */}
        {errorMessage && (
          <div
            role="alert"
            className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600"
          >
            {errorMessage}
          </div>
        )}

        {/* Success Message */}
        {successMessage && (
          <div
            role="status"
            className="mb-4 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700"
          >
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-1.5 block text-xs font-semibold text-gray-700"
            >
              নাম
            </label>

            <input
              id="name"
              name="name"
              type="text"
              placeholder="যেমন: রহিম উদ্দিন"
              value={formData.name}
              onChange={handleChange}
              autoComplete="name"
              required
              disabled={loading}
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100 disabled:bg-gray-100"
            />
          </div>

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
              autoComplete="email"
              required
              disabled={loading}
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100 disabled:bg-gray-100"
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
              placeholder="কমপক্ষে ৬ অক্ষর"
              minLength={6}
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
              required
              disabled={loading}
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100 disabled:bg-gray-100"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-1.5 block text-xs font-semibold text-gray-700"
            >
              পাসওয়ার্ড নিশ্চিত করুন
            </label>

            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="আবার পাসওয়ার্ড লিখুন"
              value={formData.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
              required
              disabled={loading}
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100 disabled:bg-gray-100"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-green-700 py-3 text-sm font-bold text-white shadow-md transition hover:bg-green-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "অ্যাকাউন্ট তৈরি হচ্ছে..."
              : "অ্যাকাউন্ট তৈরি করুন"}
          </button>
        </form>

        {/* Login Link */}
        <p className="mt-5 text-center text-xs text-gray-600">
          অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/login"
            className="font-bold text-green-700 hover:text-green-800 hover:underline"
          >
            সাইন ইন করুন
          </Link>
        </p>
      </div>

      {/* Home Link */}
      <Link
        href="/"
        className="mt-5 text-xs text-gray-500 transition hover:text-green-700"
      >
        ← হোম পেজে ফিরে যান
      </Link>
    </main>
  );
}