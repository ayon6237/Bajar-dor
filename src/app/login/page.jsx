"use client";

import toast from "react-hot-toast";
import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState("");
  const [error, setError] = useState("");

  const callbackURL = searchParams.get("callbackURL") || "/";

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // Email and password login
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!formData.email.trim() || !formData.password) {
      const message = "ইমেইল ও পাসওয়ার্ড লিখুন।";
      setError(message);
      toast.error(message);
      return;
    }

    setLoading(true);

    try {
      const result = await authClient.signIn.email({
        email: formData.email.trim(),
        password: formData.password,
        callbackURL,
      });

      if (result.error) {
        const message =
          result.error.message ||
          "লগইন করা যায়নি। ইমেইল ও পাসওয়ার্ড যাচাই করো।";

        setError(message);
        toast.error(message);
        return;
      }

      toast.success("সফলভাবে লগইন হয়েছে!");

      router.replace(callbackURL);
      router.refresh();
    } catch (err) {
      console.error("Login error:", err);

      const message =
        "সার্ভারের সঙ্গে যোগাযোগ করা যায়নি। আবার চেষ্টা করো।";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  // Google and GitHub login
  async function handleSocialLogin(provider) {
    setError("");
    setSocialLoading(provider);

    try {
      const result = await authClient.signIn.social({
        provider,
        callbackURL,
      });

      if (result?.error) {
        const message =
          result.error.message ||
          `${provider} দিয়ে লগইন করা যায়নি।`;

        setError(message);
        toast.error(message);
        setSocialLoading("");
      }
    } catch (err) {
      console.error(`${provider} login error:`, err);

      const message =
        `${provider} দিয়ে লগইন করতে সমস্যা হয়েছে। আবার চেষ্টা করো।`;

      setError(message);
      toast.error(message);
      setSocialLoading("");
    }
  }

  const isBusy = loading || Boolean(socialLoading);

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-[#f0f5f0] px-3 py-8 sm:px-6 sm:py-10">
      {/* Heading */}
      <div className="mb-5 w-full max-w-md text-center sm:mb-6">
        <h1 className="text-2xl font-extrabold text-gray-800 sm:text-3xl">
          সাইন ইন
        </h1>

        <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-gray-500 sm:text-sm sm:leading-6">
          বিস্তারিত দাম, সেভ করা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white/90 p-4 shadow-sm sm:rounded-2xl sm:p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
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
              required
              autoComplete="email"
              disabled={isBusy}
              className="min-h-11 w-full rounded-lg border border-gray-200 bg-transparent px-3 py-3 text-base outline-none transition placeholder:text-sm placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100 disabled:opacity-60 sm:text-sm"
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
              placeholder="তোমার পাসওয়ার্ড লিখো"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
              disabled={isBusy}
              className="min-h-11 w-full rounded-lg border border-gray-200 bg-transparent px-3 py-3 text-base outline-none transition placeholder:text-sm placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100 disabled:opacity-60 sm:text-sm"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div
              role="alert"
              className="break-words rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm leading-6 text-red-700"
            >
              {error}
            </div>
          )}

          {/* Email Login Button */}
          <button
            type="submit"
            disabled={isBusy}
            className="flex min-h-11 w-full items-center justify-center rounded-lg bg-green-700 px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-green-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 sm:text-base"
          >
            {loading ? "লগইন হচ্ছে..." : "সাইন ইন"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-5 flex items-center gap-3 sm:my-6">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="shrink-0 text-xs text-gray-500">অথবা</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-3">
          {/* Google Login */}
          <button
            type="button"
            onClick={() => handleSocialLogin("google")}
            disabled={isBusy}
            className="flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-3 text-center text-xs font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 sm:gap-3 sm:text-sm"
          >
            <svg
              viewBox="0 0 48 48"
              className="h-5 w-5 shrink-0"
              aria-hidden="true"
            >
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
                transform="translate(0 5)"
              />

              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.72 7.18l7.64 5.93c4.46-4.13 7.12-10.2 7.12-17.58Z"
              />

              <path
                fill="#FBBC05"
                d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.52 2.56 10.78l7.97-6.19Z"
              />

              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.9-5.78l-7.64-5.93c-2.12 1.42-4.84 2.26-8.26 2.26-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
              />
            </svg>

            <span>
              {socialLoading === "google"
                ? "Google-এ সংযোগ হচ্ছে..."
                : "Google দিয়ে চালিয়ে যান"}
            </span>
          </button>

          {/* GitHub Login */}
          <button
            type="button"
            onClick={() => handleSocialLogin("github")}
            disabled={isBusy}
            className="flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-3 text-center text-xs font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 sm:gap-3 sm:text-sm"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 shrink-0"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.54v-2.1c-3.1.68-3.76-1.32-3.76-1.32-.5-1.3-1.24-1.65-1.24-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.73 1.16 1.73 1.16 1 1.72 2.62 1.22 3.26.93.1-.72.4-1.22.71-1.5-2.48-.28-5.09-1.24-5.09-5.5 0-1.22.44-2.22 1.16-3-.12-.28-.5-1.42.11-2.97 0 0 .95-.3 3.05 1.15a10.6 10.6 0 0 1 5.56 0c2.1-1.45 3.05-1.15 3.05-1.15.61 1.55.23 2.69.11 2.97.72.78 1.16 1.78 1.16 3 0 4.27-2.61 5.21-5.1 5.49.4.35.75 1.02.75 2.06v3.12c0 .3.2.65.76.54A11.1 11.1 0 0 0 12 .9Z" />
            </svg>

            <span>
              {socialLoading === "github"
                ? "GitHub-এ সংযোগ হচ্ছে..."
                : "GitHub দিয়ে চালিয়ে যান"}
            </span>
          </button>
        </div>

        {/* Register Link */}
        <p className="mt-5 text-center text-xs leading-6 text-gray-600 sm:text-sm">
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
        className="mt-5 inline-flex min-h-10 items-center justify-center px-3 text-xs text-gray-500 transition hover:text-green-700 sm:text-sm"
      >
        ← হোম পেজে ফিরে যান
      </Link>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen w-full items-center justify-center bg-[#f0f5f0] px-4">
          <p className="text-sm text-gray-500">লোড হচ্ছে...</p>
        </main>
      }
    >
      <LoginForm />
    </Suspense>
  );
}