"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";

interface AccessToken {
  user: string;
  pass: string;
  name: string;
  company: string;
  exp?: number;
}

function decodeToken(raw: string): AccessToken | null {
  try {
    const decoded = JSON.parse(atob(raw));
    if (!decoded.user || !decoded.pass) return null;
    if (decoded.exp && decoded.exp < Math.floor(Date.now() / 1000)) return null;
    return decoded as AccessToken;
  } catch {
    return null;
  }
}

function ActivateContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [name, setName] = useState("");

  useEffect(() => {
    const raw = searchParams.get("token");
    if (!raw) {
      setStatus("error");
      return;
    }

    const token = decodeToken(raw);
    if (!token) {
      setStatus("error");
      return;
    }

    setName(token.name.split(" ")[0]);
    setStatus("success");

    localStorage.setItem("baas_auth", "true");
    localStorage.setItem("baas_user", token.user);
    localStorage.setItem("baas_company", token.company);

    const timer = setTimeout(() => {
      router.push("/dashboard");
    }, 2200);

    return () => clearTimeout(timer);
  }, [router, searchParams]);

  return (
    <div className="min-h-screen bg-[#080e1e] flex flex-col items-center justify-center px-6">
      {/* Logo */}
      <a href="/" className="flex items-center gap-3 mb-16">
        <Image src="/upi-logo.png" alt="UPI" width={72} height={34} className="brightness-0 invert" />
        <span className="text-xs font-medium text-white/40 border-l border-white/10 pl-3">BaaS</span>
      </a>

      <div className="w-full max-w-sm text-center">
        {status === "loading" && (
          <>
            <div className="flex items-center justify-center mb-6">
              <Loader2 size={40} className="text-blue-400 animate-spin" />
            </div>
            <h2 className="text-xl font-bold text-white">Verifying your access link…</h2>
          </>
        )}

        {status === "success" && (
          <>
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
              <CheckCircle2 size={40} className="text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">Welcome, {name}!</h2>
            <p className="mt-2 text-gray-400 text-sm">Your partner account is active. Taking you to the dashboard…</p>

            <div className="mt-8 rounded-2xl border border-white/5 bg-white/3 p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-emerald-400 font-medium">Access granted</span>
              </div>
              {[
                "Partner Dashboard unlocked",
                "API Sandbox unlocked",
                "API keys ready to use",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2.5 py-1.5">
                  <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                  <span className="text-sm text-gray-300">{item}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => router.push("/dashboard")}
              className="mt-6 w-full rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-500 transition-colors"
            >
              Go to Dashboard →
            </button>
          </>
        )}

        {status === "error" && (
          <>
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-500/10 border border-red-500/20 mb-6">
              <XCircle size={40} className="text-red-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">Invalid or expired link</h2>
            <p className="mt-2 text-gray-400 text-sm leading-relaxed">
              This access link is either invalid or has expired. Please contact our team to get a new one.
            </p>
            <div className="mt-8 flex flex-col gap-3">
              <a
                href="/#contact"
                className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-500 transition-colors"
              >
                Request a new link
              </a>
              <a
                href="/"
                className="rounded-xl border border-white/10 px-6 py-3 text-sm font-medium text-gray-400 hover:bg-white/5 transition-colors"
              >
                Back to home
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function ActivatePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#080e1e]" />}>
      <ActivateContent />
    </Suspense>
  );
}
