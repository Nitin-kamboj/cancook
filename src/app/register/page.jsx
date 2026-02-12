"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { Mail, LockKeyhole } from "lucide-react";
export default function Register() {
  //   const [passwordLength, setPasswordLength] = useState(0);
  //   const [typePassword, setTypePassword] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchData(email, username, password) {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, username, password }),
    });

    let data = null;
    try {
      data = await response.json();
    } catch {}

    if (!response.ok) {
      throw new Error(data?.message || "AUTH_FAILED");
    }
    return data;
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const email = e.target.email.value.trim();
    const username = e.target.username.value.trim();
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmpassword.value;

    if (!email || !username || !password || !confirmPassword) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    if (password.length !== 12) {
      setError("Password must be exactly 12 characters.");
      setLoading(false);
      return;
    }

    if (!/^[a-z]{8}$/.test(username)) {
      setError("Username must be exactly 8 lowercase letters.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      await fetchData(email, username, password);
      router.push("/login");
    } catch (err) {
      const msg = (err?.message || "").toLowerCase();
      if (msg.includes("exist") || msg.includes("already")) {
        setError("Email already exists. Please try logging in.");
      } else {
        setError(
          err?.message || "Something went wrong. Please try again later.",
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-white flex items-center justify-center">
      <div className="max-w-6xl grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-black">
        {/* Left section of the Login Page */}
        <section className="flex flex-col justify-center p-8 md:p-16 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-black">
            GET STARTED
          </h1>
          <p className="text-gray-700 text-lg leading-relaxed justify-center text-black text-center">
            Already Have an Account?
          </p>
          <div className="space-y-3 text-gray-800">
            <Link
              href="/login"
              className="w-full inline-flex items-center justify-center rounded-lg border border-black py-4 text-xl font-serif tracking-widest transition-all hover:bg-black hover:text-white active:scale-[0.98]"
            >
              LOGIN
            </Link>
          </div>
        </section>

        {/* Right section of the login Page */}
        <section className="flex flex-col justify-center items-center p-8 md:p-16">
          <div className="w-full max-w-sm">
            <h2 className="text-center text-xl font-serif tracking-[0.2em] text-black mb-8">
              CREATE YOUR ACCOUNT
            </h2>
            <form className="space-y-5" onSubmit={onSubmit}>
              {/* EMAIL INPUT */}
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-[45%] text-gray-500" />
                <input
                  className="w-full rounded-lg border border-black px-4 py-3 pl-10 text-sm outline-none focus:ring-2 focus:ring-black/5 transition-all"
                  type="email"
                  name="email"
                  placeholder="Enter your Email"
                />
              </div>
              {/* USERNAME INPUT */}
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-[45%] text-gray-500" />
                <input
                  className=" w-full rounded-lg border border-black px-4 py-3 pl-10 text-sm outline-none focus:ring-2 focus:ring-black/5 transition-all"
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                />
              </div>
              <div className="relative">
                <LockKeyhole className="absolute left-3 top-1/2 -translate-y-[45%] text-gray-500" />
                <input
                  className="w-full rounded-lg border border-black px-4 py-3 pl-10 text-sm outline-none focus:ring-2 focus:ring-black/5 transition-all"
                  type="password"
                  name="password"
                  //   onChange={passwordLen}
                  placeholder="Enter your password"
                />
                {/* {!typePassword ? (
                  <p>Must be 12 charcater in length!</p>
                ) : (
                  <p>{passwordLength} charcater left!</p>
                )} */}
              </div>
              <div className="relative">
                <LockKeyhole className="absolute left-3 top-1/2 -translate-y-[45%] text-gray-500" />
                <input
                  className="w-full rounded-lg border border-black px-4 py-3 pl-10 text-sm outline-none focus:ring-2 focus:ring-black/5 transition-all"
                  type="password"
                  name="confirmpassword"
                  //   onChange={passwordLen}
                  placeholder="Confirm Password"
                />
              </div>
              {error && (
                <div className="rounded-lg border border-red-600 bg-red-50 px-4 py-2 text-xs font-bold text-red-600 animate-in fade-in slide-in-from-top-1">
                  {error}
                </div>
              )}
              <button
                type="submit"
                className="w-full rounded-lg border border-black py-4 text-xl font-serif tracking-widest transition-all hover:bg-black hover:text-white disabled:opacity-50 active:scale-[0.98]"
                disabled={loading}
              >
                {loading ? "loading..." : "REGISTER"}
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
