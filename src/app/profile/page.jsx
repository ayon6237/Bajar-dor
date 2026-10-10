
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleUpdateProfile(e) {
    e.preventDefault();

    if (loading) return;

    setMessage("");
    setError("");

    const updatedName = name.trim();

    if (!updatedName) {
      const errorText = "আপনার নাম লিখুন।";
      setError(errorText);
      toast.error(errorText);
      return;
    }

    setLoading(true);

    try {
      const result = await authClient.updateUser({
        name: updatedName,
      });

      if (result.error) {
        const errorText =
          result.error.message || "নাম আপডেট করা যায়নি।";

        setError(errorText);
        toast.error(errorText);
        return;
      }

      const successText = "তোমার নাম সফলভাবে আপডেট হয়েছে।";

      setMessage(successText);
      setEditing(false);
      setName(updatedName);

      toast.success(successText);

      // Updated session data আনার চেষ্টা
      await authClient.getSession();
      router.refresh();
    } catch (err) {
      console.error("Profile update error:", err);

      const errorText = "প্রোফাইল আপডেট করতে সমস্যা হয়েছে।";

      setError(errorText);
      toast.error(errorText);
    } finally {
      setLoading(false);
    }
  }

  async function handleSignOut() {
    if (loading) return;

    setLoading(true);
    setError("");

    try {
      const result = await authClient.signOut();

      if (result.error) {
        const errorText =
          result.error.message || "Sign out করা যায়নি।";

        setError(errorText);
        toast.error(errorText);
        return;
      }

      toast.success("সফলভাবে Sign out হয়েছে!");

      router.replace("/login");
      router.refresh();
    } catch (err) {
      console.error("Sign out error:", err);

      const errorText = "Sign out করতে সমস্যা হয়েছে।";

      setError(errorText);
      toast.error(errorText);
    } finally {
      setLoading(false);
    }
  }

  if (isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f0f5f0] px-4">
        <p className="text-sm text-gray-500">
          Profile loading হচ্ছে...
        </p>
      </main>
    );
  }

  if (!session?.user) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#f0f5f0] px-4 text-center">
        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">
            👤
          </div>

          <h1 className="text-2xl font-extrabold text-gray-800">
            তোমার প্রোফাইল
          </h1>

          <p className="mt-3 text-sm text-gray-500">
            প্রোফাইল দেখতে প্রথমে তোমাকে লগইন করতে হবে।
          </p>

          <Link
            href="/login"
            className="mt-6 inline-flex rounded-lg bg-green-700 px-6 py-3 text-sm font-bold text-white transition hover:bg-green-800"
          >
            সাইন ইন করো
          </Link>

          <Link
            href="/"
            className="mt-4 block text-sm text-gray-500 hover:text-green-700"
          >
            ← হোম পেজে ফিরে যাও
          </Link>
        </div>
      </main>
    );
  }

  const user = session.user;
  const displayName = user.name || "BazarDor User";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <main className="min-h-screen bg-[#f0f5f0] px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-3xl">
        {/* Back to Home */}
        <Link
          href="/"
          className="mb-6 inline-flex text-sm font-medium text-gray-500 transition hover:text-green-700"
        >
          ← হোম পেজে ফিরে যাও
        </Link>

        {/* Page Heading */}
        <div className="mb-7">
          <p className="text-sm font-semibold text-green-700">
            BAZARDOR ACCOUNT
          </p>

          <h1 className="mt-2 text-3xl font-extrabold text-gray-900">
            আমার প্রোফাইল
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        {/* Profile Card */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-green-800 to-green-600 px-6 py-8 sm:px-8">
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              {user.image ? (
                <img
                  src={user.image}
                  alt={displayName}
                  className="h-20 w-20 rounded-full border-4 border-white/40 object-cover"
                />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-white/40 bg-white text-3xl font-extrabold text-green-800">
                  {initial}
                </div>
              )}

              <div className="text-center sm:text-left">
                <h2 className="text-2xl font-bold text-white">
                  {displayName}
                </h2>

                <p className="mt-1 break-all text-sm text-green-50">
                  {user.email}
                </p>

                <span className="mt-3 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white">
                  Registered User
                </span>
              </div>
            </div>
          </div>

          {/* Account Details */}
          <div className="p-6 sm:p-8">
            <div className="mb-6 flex items-center justify-between gap-3">
              <h3 className="text-lg font-bold text-gray-800">
                Account Information
              </h3>

              {!editing && (
                <button
                  type="button"
                  onClick={() => {
                    setName(user.name || "");
                    setEditing(true);
                    setMessage("");
                    setError("");
                  }}
                  className="rounded-lg border border-green-700 px-4 py-2 text-sm font-semibold text-green-700 transition hover:bg-green-50"
                >
                  Edit Profile
                </button>
              )}
            </div>

            {/* Success Message */}
            {message && (
              <p
                role="status"
                className="mb-4 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700"
              >
                {message}
              </p>
            )}

            {/* Error Message */}
            {error && (
              <p
                role="alert"
                className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
              >
                {error}
              </p>
            )}

            {/* Edit Profile Form */}
            {editing ? (
              <form
                onSubmit={handleUpdateProfile}
                className="space-y-4"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    তোমার নাম
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    maxLength={100}
                    disabled={loading}
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 disabled:opacity-60"
                  />
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="submit"
                    disabled={loading || !name.trim()}
                    className="rounded-lg bg-green-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-green-800 disabled:opacity-60"
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </button>

                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => {
                      setEditing(false);
                      setError("");
                      setName(user.name || "");
                    }}
                    className="rounded-lg border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 disabled:opacity-60"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-5">
                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs font-medium text-gray-500">
                    Full Name
                  </p>

                  <p className="mt-2 break-words text-sm font-semibold text-gray-800">
                    {user.name || "নাম যোগ করা হয়নি"}
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs font-medium text-gray-500">
                    Email Address
                  </p>

                  <p className="mt-2 break-all text-sm font-semibold text-gray-800">
                    {user.email}
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs font-medium text-gray-500">
                    Email Verification
                  </p>

                  <p className="mt-2 text-sm font-semibold text-gray-800">
                    {user.emailVerified
                      ? "Verified"
                      : "Not verified"}
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs font-medium text-gray-500">
                    Account ID
                  </p>

                  <p className="mt-2 break-all text-sm text-gray-700">
                    {user.id}
                  </p>
                </div>
              </div>
            )}

            {/* Sign Out */}
            <div className="mt-8 border-t border-gray-100 pt-6">
              <button
                type="button"
                onClick={handleSignOut}
                disabled={loading}
                className="w-full rounded-lg border border-red-200 px-5 py-3 text-sm font-bold text-red-600 transition hover:bg-red-50 disabled:opacity-60 sm:w-auto"
              >
                {loading ? "Please wait..." : "Sign Out"}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
       
      </div>
    </main>
  );
}
