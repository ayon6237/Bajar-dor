"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
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

  function showError(message) {
    setErrorMessage(message);
    toast.error(message);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (loading) return;

    setErrorMessage("");
    setSuccessMessage("");

    const name = formData.name.trim();
    const email = formData.email.trim();

    if (!name) {
      showError("আপনার নাম লিখুন।");
      return;
    }

    if (!email) {
      showError("আপনার ইমেইল লিখুন।");
      return;
    }

    if (formData.password.length < 8) {
      showError("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      showError("পাসওয়ার্ড এবং কনফার্ম পাসওয়ার্ড মিলছে না।");
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
        showError(
          result.error.message ||
            "নিবন্ধন করা যায়নি। আবার চেষ্টা করুন।"
        );
        return;
      }

      const message =
        "আপনার অ্যাকাউন্ট তৈরি হয়েছে। Login page-এ নেওয়া হচ্ছে...";

      setSuccessMessage(message);
      toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!");

      setTimeout(() => {
        router.push("/login?registered=1");
        router.refresh();
      }, 800);
    } catch (error) {
      console.error("Registration error:", error);

      showError(
        error instanceof Error
          ? error.message
          : "নিবন্ধনের সময় সমস্যা হয়েছে। আবার চেষ্টা করুন।"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-[#f0f5f0] px-3 py-8 sm:px-6 sm:py-10">
      {/* Heading */}
      <div className="mb-5 w-full max-w-md text-center sm:mb-6">
        <h1 className="text-2xl font-extrabold leading-tight text-gray-800 sm:text-3xl">
          অ্যাকাউন্ট তৈরি করুন
        </h1>

        <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-gray-500 sm:text-sm sm:leading-6">
          সহজেই আপনার অ্যাকাউন্ট তৈরি করুন।
        </p>
      </div>

      {/* Register Card */}
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:rounded-2xl sm:p-6 md:p-8">
        {/* Error Message */}
        {errorMessage && (
          <div
            role="alert"
            className="mb-4 break-words rounded-lg border border-red-200 bg-red-50 p-3 text-sm leading-6 text-red-600"
          >
            {errorMessage}
          </div>
        )}

        {/* Success Message */}
        {successMessage && (
          <div
            role="status"
            className="mb-4 break-words rounded-lg border border-green-200 bg-green-50 p-3 text-sm leading-6 text-green-700"
          >
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-1.5 block text-xs font-semibold text-gray-700 sm:text-sm"
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
              className="min-h-11 w-full rounded-lg border border-gray-200 px-3 py-3 text-base outline-none transition placeholder:text-sm placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100 disabled:bg-gray-100 sm:text-sm"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-xs font-semibold text-gray-700 sm:text-sm"
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
              className="min-h-11 w-full rounded-lg border border-gray-200 px-3 py-3 text-base outline-none transition placeholder:text-sm placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100 disabled:bg-gray-100 sm:text-sm"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-xs font-semibold text-gray-700 sm:text-sm"
            >
              পাসওয়ার্ড
            </label>

            <input
              id="password"
              name="password"
              type="password"
              placeholder="কমপক্ষে ৮ অক্ষর"
              minLength={8}
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
              required
              disabled={loading}
              className="min-h-11 w-full rounded-lg border border-gray-200 px-3 py-3 text-base outline-none transition placeholder:text-sm placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100 disabled:bg-gray-100 sm:text-sm"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-1.5 block text-xs font-semibold text-gray-700 sm:text-sm"
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
              className="min-h-11 w-full rounded-lg border border-gray-200 px-3 py-3 text-base outline-none transition placeholder:text-sm placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100 disabled:bg-gray-100 sm:text-sm"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="flex min-h-11 w-full items-center justify-center rounded-lg bg-green-700 px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-green-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 sm:text-base"
          >
            {loading
              ? "অ্যাকাউন্ট তৈরি হচ্ছে..."
              : "অ্যাকাউন্ট তৈরি করুন"}
          </button>
        </form>

        {/* Login Link */}
        <p className="mt-5 text-center text-xs leading-6 text-gray-600 sm:text-sm">
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
        className="mt-5 inline-flex min-h-10 items-center justify-center px-3 text-xs text-gray-500 transition hover:text-green-700 sm:text-sm"
      >
        ← হোম পেজে ফিরে যান
      </Link>
    </main>
  );
}