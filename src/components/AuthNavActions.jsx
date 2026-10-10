"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function AuthNavActions() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [loading, setLoading] = useState(false);

  async function handleSignOut() {
    if (loading) return;

    setLoading(true);

    try {
      const result = await authClient.signOut();

      if (result.error) {
        toast.error(result.error.message || "Sign out করা যায়নি।");
        return;
      }

      toast.success("সফলভাবে Sign out হয়েছে!");

      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error("Sign out error:", error);

      toast.error("Sign out করতে সমস্যা হয়েছে। আবার চেষ্টা করো।");
    } finally {
      setLoading(false);
    }
  }

  if (isPending) {
    return <div className="h-9 w-24 animate-pulse rounded-lg bg-gray-200" />;
  }

  if (session?.user) {
    const user = session.user;

    return (
      <div className="flex items-center gap-2">
        <Link href="/profile" className="max-w-36 text-right">
          <p className="truncate text-sm font-semibold text-gray-800">
            {user.name || "User"}
          </p>

          <p className="truncate text-xs text-gray-500">{user.email}</p>
        </Link>

        <button
          type="button"
          onClick={handleSignOut}
          disabled={loading}
          className="rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Signing out..." : "Sign Out"}
        </button>
      </div>
    );
  }

  // Login করা না থাকলে
  return (
    <div className="flex items-center gap-2">
      <Link
        href="/login"
        className="rounded-lg border border-green-700 px-3 py-2 text-sm font-semibold text-green-700 transition hover:bg-green-50"
      >
        Sign In
      </Link>

      <Link
        href="/register"
        className="rounded-lg bg-green-700 px-3 py-2 text-sm font-semibold text-white transition hover:bg-green-800"
      >
        Sign Up
      </Link>
    </div>
  );
}
