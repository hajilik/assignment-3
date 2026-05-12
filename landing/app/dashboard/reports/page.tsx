"use client";

import { useState } from "react";
import { Download, FileText, BarChart3, CreditCard, ArrowLeftRight, CheckCircle2, X, AlertTriangle } from "lucide-react";
import PageShell from "@/components/dashboard/PageShell";

const REPORT_TYPES = [
  { id: "txn", icon: ArrowLeftRight, title: "Transaction Report", desc: "Full transaction history with amounts, statuses and merchant data.", period: "Daily / Monthly", format: "CSV, PDF", gdpr: true },
  { id: "card", icon: CreditCard, title: "Card Issuance Report", desc: "Cards issued, activated, frozen and cancelled per period.", period: "Monthly", format: "CSV", gdpr: true },
  { id: "revenue", icon: BarChart3, title: "Revenue & Fees Report", desc: "Fee income breakdown: interchange, service fees, lending margin.", period: "Monthly", format: "PDF", gdpr: false },
  { id: "lending", icon: FileText, title: "Lending Portfolio Report", desc: "Outstanding balances, NPL ratios, repayment performance.", period: "Monthly", format: "PDF, CSV", gdpr: true },
  { id: "bnpl", icon: FileText, title: "BNPL Performance Report", desc: "Plan volumes, merchant breakdown, default rates.", period: "Monthly", format: "PDF", gdpr: true },
  { id: "api", icon: FileText, title: "API Usage Report", desc: "Endpoint call volumes, latency p95/p99, error rates.", period: "Daily / Weekly", format: "CSV", gdpr: false },
];

const RECENT = [
  { name: "Transaction Report — April 2025", generated: "2025-05-01 08:02", size: "2.4 MB", format: "CSV" },
  { name: "Card Issuance Report — April 2025", generated: "2025-05-01 08:05", size: "840 KB", format: "PDF" },
  { name: "Revenue Report — Q1 2025", generated: "2025-04-03 09:14", size: "1.1 MB", format: "PDF" },
  { name: "Lending Portfolio — April 2025", generated: "2025-05-01 08:10", size: "620 KB", format: "CSV" },
];

export default function ReportsPage() {
  const [generating, setGenerating] = useState<string | null>(null);
  const [done, setDone] = useState<string[]>([]);
  const [dsrModal, setDsrModal] = useState(false);
  const [dsrEmail, setDsrEmail] = useState("");
  const [dsrType, setDsrType] = useState("access");
  const [dsrSubmitted, setDsrSubmitted] = useState(false);

  const generate = async (id: string) => {
    setGenerating(id);
    await new Promise((r) => setTimeout(r, 1800));
    setGenerating(null);
    setDone((prev) => [...prev, id]);
    setTimeout(() => setDone((prev) => prev.filter((d) => d !== id)), 4000);
  };

  const submitDsr = async (e: React.FormEvent) => {
    e.preventDefault();
    await new Promise((r) => setTimeout(r, 900));
    setDsrSubmitted(true);
  };

  return (
    <PageShell title="Reports" subtitle="Generate and download compliance, operational and revenue reports">
      {/* GDPR DSR section */}
      <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600">
              <AlertTriangle size={16} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-blue-900">GDPR — Data Subject Requests</p>
              <p className="mt-1 text-xs text-blue-700">Under GDPR Articles 15–17, your end-users have the right to access, rectify, and request erasure of their personal data. Submit a Data Subject Request below and our DPO team will process it within 30 days.</p>
            </div>
          </div>
          <button onClick={() => setDsrModal(true)}
            className="shrink-0 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors">
            Submit DSR
          </button>
        </div>
      </div>

      {/* Report types */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {REPORT_TYPES.map((r) => {
          const Icon = r.icon;
          const isGenerating = generating === r.id;
          const isDone = done.includes(r.id);
          return (
            <div key={r.id} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm flex flex-col">
              <div className="flex items-start gap-3 mb-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-50">
                  <Icon size={18} className="text-gray-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900">{r.title}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">{r.period} · {r.format}</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mb-4 flex-1">{r.desc}</p>
              {r.gdpr && (
                <p className="text-[10px] text-amber-600 bg-amber-50 rounded-lg px-2.5 py-1.5 mb-3">Contains personal data — GDPR applicable</p>
              )}
              <button onClick={() => generate(r.id)} disabled={isGenerating}
                className={`flex items-center justify-center gap-2 w-full rounded-xl py-2.5 text-sm font-medium transition-all ${isDone ? "bg-emerald-50 text-emerald-700" : "border border-gray-200 text-gray-700 hover:bg-gray-50"} disabled:opacity-60`}>
                {isDone ? <><CheckCircle2 size={14} /> Ready to download</> : isGenerating ? <><svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Generating...</> : <><Download size={14} /> Generate & download</>}
              </button>
            </div>
          );
        })}
      </div>

      {/* Recent reports */}
      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-gray-50 px-5 py-4">
          <p className="text-sm font-semibold text-gray-900">Recent reports</p>
        </div>
        <div className="divide-y divide-gray-50">
          {RECENT.map((r) => (
            <div key={r.name} className="flex items-center justify-between px-5 py-4 hover:bg-gray-50/40 transition-colors">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100">
                  <FileText size={14} className="text-gray-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">{r.name}</p>
                  <p className="text-[11px] text-gray-400">{r.generated} · {r.size}</p>
                </div>
              </div>
              <button className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 transition-colors">
                <Download size={12} /> {r.format}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* DSR Modal */}
      {dsrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-gray-900">Data Subject Request</h3>
              <button onClick={() => { setDsrModal(false); setDsrSubmitted(false); setDsrEmail(""); }} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100"><X size={16} /></button>
            </div>
            {dsrSubmitted ? (
              <div className="flex flex-col items-center py-8 text-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50"><CheckCircle2 className="text-emerald-500" size={24} /></div>
                <p className="font-semibold text-gray-900">Request submitted</p>
                <p className="text-sm text-gray-500">Our DPO team will process this within 30 days and contact the data subject directly. Reference: DSR-{Date.now().toString().slice(-6)}</p>
              </div>
            ) : (
              <form onSubmit={submitDsr} className="space-y-4">
                <p className="text-xs text-gray-500">Submit on behalf of your end-user. Our Data Protection Officer will handle the request within the statutory 30-day window.</p>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-700">Data subject email <span className="text-red-400">*</span></label>
                  <input required type="email" value={dsrEmail} onChange={(e) => setDsrEmail(e.target.value)} placeholder="user@example.com"
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20" />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-medium text-gray-700">Request type</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[{ v: "access", l: "Right of access (Art. 15)" }, { v: "rectification", l: "Rectification (Art. 16)" }, { v: "erasure", l: "Erasure (Art. 17)" }, { v: "portability", l: "Portability (Art. 20)" }].map((t) => (
                      <button key={t.v} type="button" onClick={() => setDsrType(t.v)}
                        className={`rounded-xl border p-2.5 text-xs font-medium text-left transition-all ${dsrType === t.v ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 text-gray-600 hover:border-gray-300"}`}>
                        {t.l}
                      </button>
                    ))}
                  </div>
                </div>
                <button type="submit" className="w-full rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">Submit request</button>
              </form>
            )}
          </div>
        </div>
      )}
    </PageShell>
  );
}
