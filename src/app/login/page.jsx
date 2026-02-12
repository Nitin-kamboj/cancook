"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Mail, LockKeyhole } from "lucide-react";

export default function Login() {
  const Router = useRouter();
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(0);
  const [typePassword, setTypePassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function passwordLen(e) {
    setTypePassword(true);
    const numOfChar = e.target.value.length;
    const charLeft = 12 - numOfChar;
    if (charLeft >= 0) {
      setPasswordLength(charLeft);
    } else {
      setPasswordLength(0);
    }
  }

  async function fetchData(username, password) {
    // await new Promise((r) => setTimeout(r, 800));
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || "AUTH_FAILED");
    }
    return await response.json();
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    // await new Promise((r) => setTimeout(r, 800));
    // setUsername(e.target.username.value);
    // setPassword(e.target.password.value);
    try {
      await fetchData(e.target.username.value.trim(), e.target.password.value);
      Router.push("/login/home");
    } catch (err) {
      if (err.message === "AUTH_FAILED") {
        setError("Invalid credentials. Please try again.");
      } else if (err.message === "LOCKED") {
        setError("Account is locked.");
      } else {
        setError("Something went wrong. Please try again later.");
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
            Welcome to CanCook
          </h1>
          <p className="text-gray-700 text-lg leading-relaxed">
            CanCook helps you manage your pantry, create recipes using
            ingredients you already have, and explore public recipes shared by
            others.
          </p>
          <div className="space-y-3 text-gray-800">
            <p className="flex">✅Track pantry items by category</p>
            <p className="flex">
              ✅Create recipes only with pantry ingredients
            </p>
            <p className="flex">✅Rate and comment on public recipes</p>
          </div>
        </section>

        {/* Right section of the login Page */}
        <section className="flex flex-col justify-center items-center p-8 md:p-16">
          <div className="w-full max-w-sm">
            <h2 className="text-center text-xl font-serif tracking-[0.2em] text-black mb-8">
              USER LOGIN
            </h2>
            <form action="" className="space-y-5" onSubmit={onSubmit}>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-[75%] text-gray-500" />
                <input
                  className="mb-4 w-full rounded-lg border border-black px-4 py-3 pl-10 text-sm outline-none focus:ring-2 focus:ring-black/5 transition-all"
                  type="text"
                  name="username"
                  placeholder="Enter your Email"
                />
              </div>
              <div className="relative">
                <LockKeyhole className="absolute left-3 top-1/2 -translate-y-[75%] text-gray-500" />
                <input
                  className="w-full rounded-lg border border-black px-4 py-3 pl-10 text-sm outline-none focus:ring-2 focus:ring-black/5 transition-all"
                  type="password"
                  name="password"
                  onChange={passwordLen}
                  placeholder="Enter your password"
                />
                {!typePassword ? (
                  <p>Must be 12 charcater in length!</p>
                ) : (
                  <p>{passwordLength} charcater left!</p>
                )}
              </div>
              <div className="flex items-center justify-between text-sm font-medium">
                <label
                  htmlFor=""
                  className="flex items-center gap-2 cursor-pointer select-none"
                >
                  <input type="checkbox" className="h-4 w-4 accent-black" />
                  Remember Me
                </label>

                <a href="/forgot" className="hover:underline text-black">
                  Forgot Password?
                </a>
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
                {loading ? "loading..." : "LOGIN"}
              </button>
              <div className="text-center pt-2">
                <a
                  href="/register"
                  className="text-sm font-semibold underline hover:text-gray-600"
                >
                  Create Account
                </a>
              </div>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
