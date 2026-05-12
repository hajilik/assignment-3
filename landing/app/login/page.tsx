"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Eye, EyeOff, ArrowRight, Lock } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("baas_auth")) {
      router.replace("/dashboard");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Please enter your username and password.");
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));

    localStorage.setItem("baas_auth", "true");
    localStorage.setItem("baas_user", username.trim());
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#080e1e] flex">
      {/* Left panel — branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-blue-600/15 blur-[100px]" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-indigo-600/10 blur-[100px]" />

        {/* Logo */}
        <div className="relative">
          <a href="/" className="flex items-center gap-3">
            <Image src="/upi-logo.png" alt="UPI" width={72} height={34} className="brightness-0 invert" />
            <span className="text-xs font-medium text-white/40 border-l border-white/10 pl-3">BaaS</span>
          </a>
        </div>

        {/* Center content */}
        <div className="relative">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5">
            <Lock size={12} className="text-blue-400" />
            <span className="text-xs font-medium text-blue-300">Partner Portal</span>
          </div>
          <h1 className="text-4xl font-bold text-white leading-tight">
            Your banking<br />
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              infrastructure
            </span>
            <br />dashboard
          </h1>
          <p className="mt-4 text-gray-400 leading-relaxed max-w-sm">
            Monitor cards, transactions, API usage, and revenue — all in one place.
          </p>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-3 gap-4">
            {[
              { label: "Uptime", value: "99.98%" },
              { label: "API calls/mo", value: "1.2M+" },
              { label: "Partners", value: "40+" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-white/5 bg-white/5 p-4">
                <p className="text-xl font-bold text-white">{s.value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="relative">
          <p className="text-xs text-gray-700">
            © {new Date().getFullYear()} Unibank OJSC. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 bg-white">
        {/* Mobile logo */}
        <div className="lg:hidden mb-10">
          <a href="/" className="flex items-center gap-2">
            <Image src="/upi-logo.png" alt="UPI" width={64} height={30} />
            <span className="text-xs font-medium text-gray-400 border-l border-gray-200 pl-2">BaaS</span>
          </a>
        </div>

        <div className="w-full max-w-sm">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Welcome back</h2>
            <p className="mt-1 text-sm text-gray-500">Sign in to your partner account</p>
          </div>

          {/* Demo notice */}
          <div className="mb-6 flex items-start gap-2.5 rounded-xl bg-blue-50 border border-blue-100 px-4 py-3">
            <div className="mt-0.5 h-4 w-4 shrink-0 rounded-full bg-blue-500 flex items-center justify-center">
              <span className="text-[9px] font-bold text-white">i</span>
            </div>
            <p className="text-xs text-blue-700">
              <span className="font-semibold">Demo mode</span> — any username and password will work.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="partner@company.az"
                autoComplete="username"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* Password */}
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="text-xs font-medium text-gray-700">Password</label>
                <a href="#" className="text-xs text-blue-600 hover:text-blue-700">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 pr-11 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm shadow-blue-600/20 transition-all hover:bg-blue-700 hover:shadow-md active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <>
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Signing in...
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-gray-400">
            Don&apos;t have an account?{" "}
            <a href="#contact" className="font-medium text-blue-600 hover:text-blue-700">
              Request access
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
