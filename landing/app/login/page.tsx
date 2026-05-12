"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Eye, EyeOff, ArrowRight, Lock, Mail, CheckCircle2 } from "lucide-react";

interface AccessToken {
  user: string;
  pass: string;
  name: string;
  company: string;
}

function decodeAccessToken(raw: string): AccessToken | null {
  try {
    const json = atob(raw);
    const parsed = JSON.parse(json);
    if (parsed.user && parsed.pass) return parsed as AccessToken;
    return null;
  } catch {
    return null;
  }
}

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [view, setView] = useState<"checking" | "gate" | "welcome" | "manual">("checking");
  const [token, setToken] = useState<AccessToken | null>(null);
  const [showPass, setShowPass] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("baas_auth")) {
      router.replace("/dashboard");
      return;
    }
    const raw = searchParams.get("access");
    if (raw) {
      const decoded = decodeAccessToken(raw);
      if (decoded) {
        setToken(decoded);
        setView("welcome");
        return;
      }
    }
    setView("gate");
  }, [router, searchParams]);

  const loginWith = async (user: string, pass: string) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    localStorage.setItem("baas_auth", "true");
    localStorage.setItem("baas_user", user);
    router.push("/dashboard");
  };

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!username.trim() || !password.trim()) {
      setError("Please enter your username and password.");
      return;
    }
    await loginWith(username.trim(), password.trim());
  };

  if (view === "checking") {
    return <div className="min-h-screen bg-[#080e1e]" />;
  }

  return (
    <div className="min-h-screen bg-[#080e1e] flex">
      {/* Left branding panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-blue-600/15 blur-[100px]" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-indigo-600/10 blur-[100px]" />

        <div className="relative">
          <a href="/" className="flex items-center gap-3">
            <Image src="/upi-logo.png" alt="UPI" width={72} height={34} className="brightness-0 invert" />
            <span className="text-xs font-medium text-white/40 border-l border-white/10 pl-3">BaaS</span>
          </a>
        </div>

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

          <div className="mt-10 grid grid-cols-3 gap-4">
            {[{ label: "Uptime", value: "99.98%" }, { label: "API calls/mo", value: "1.2M+" }, { label: "Partners", value: "40+" }].map((s) => (
              <div key={s.label} className="rounded-xl border border-white/5 bg-white/5 p-4">
                <p className="text-xl font-bold text-white">{s.value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <p className="text-xs text-gray-700">© {new Date().getFullYear()} Unibank OJSC. All rights reserved.</p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 bg-white">
        {/* Mobile logo */}
        <div className="lg:hidden mb-10">
          <a href="/" className="flex items-center gap-2">
            <Image src="/upi-logo.png" alt="UPI" width={64} height={30} />
            <span className="text-xs font-medium text-gray-400 border-l border-gray-200 pl-2">BaaS</span>
          </a>
        </div>

        <div className="w-full max-w-sm">

          {/* ── GATE VIEW ── */}
          {view === "gate" && (
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gray-100 mb-6">
                <Lock size={28} className="text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Partner access only</h2>
              <p className="mt-3 text-sm text-gray-500 leading-relaxed">
                The Unibank BaaS partner portal is available by invitation. Submit the contact form and our team will reach out with your access credentials.
              </p>

              <a
                href="/#contact"
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm shadow-blue-600/20 hover:bg-blue-700 transition-colors"
              >
                <Mail size={15} />
                Request access
              </a>

              <div className="mt-6 border-t border-gray-100 pt-6">
                <button
                  onClick={() => setView("manual")}
                  className="text-sm text-gray-400 hover:text-gray-700 transition-colors underline-offset-2 hover:underline"
                >
                  Already a partner? Sign in
                </button>
              </div>
            </div>
          )}

          {/* ── WELCOME / MAGIC LINK VIEW ── */}
          {view === "welcome" && token && (
            <div>
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-50 mb-6 mx-auto">
                <CheckCircle2 size={28} className="text-emerald-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 text-center">Welcome, {token.name.split(" ")[0]}!</h2>
              <p className="mt-2 text-sm text-gray-500 text-center">Your partner account is ready.</p>

              <div className="mt-6 rounded-xl border border-gray-100 bg-gray-50 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">{token.company}</span>
                </div>

                <div className="space-y-2.5">
                  <div>
                    <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wide mb-1">Username</p>
                    <code className="block rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-mono text-gray-800">
                      {token.user}
                    </code>
                  </div>
                  <div>
                    <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wide mb-1">Password</p>
                    <div className="relative">
                      <code className="block rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-mono text-gray-800 pr-10">
                        {showPass ? token.pass : "••••••••••••"}
                      </code>
                      <button
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <p className="mt-3 text-xs text-amber-600 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
                Save these credentials — this link expires after first use.
              </p>

              <button
                onClick={() => loginWith(token.user, token.pass)}
                disabled={loading}
                className="mt-6 w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm shadow-blue-600/20 hover:bg-blue-700 transition-all active:scale-[0.98] disabled:opacity-70"
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
                  <>Enter Dashboard <ArrowRight size={16} /></>
                )}
              </button>
            </div>
          )}

          {/* ── MANUAL SIGN-IN VIEW ── */}
          {view === "manual" && (
            <div>
              <button
                onClick={() => setView("gate")}
                className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-700 transition-colors mb-8"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 11L5 7l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                Back
              </button>

              <h2 className="text-2xl font-bold text-gray-900">Partner sign-in</h2>
              <p className="mt-1 text-sm text-gray-500">Use your issued credentials to sign in.</p>

              <form onSubmit={handleManualSubmit} className="mt-8 space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-700">Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="partner@company.az"
                    autoComplete="username"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-700">Password</label>
                  <div className="relative">
                    <input
                      type={showPass ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      autoComplete="current-password"
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 pr-11 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {error && (
                  <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm shadow-blue-600/20 hover:bg-blue-700 transition-all active:scale-[0.98] disabled:opacity-70 mt-2"
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
                    <>Sign in <ArrowRight size={16} /></>
                  )}
                </button>
              </form>

              <p className="mt-6 text-center text-xs text-gray-400">
                No credentials yet?{" "}
                <a href="/#contact" className="font-medium text-blue-600 hover:text-blue-700">Request access</a>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#080e1e]" />}>
      <LoginContent />
    </Suspense>
  );
}
