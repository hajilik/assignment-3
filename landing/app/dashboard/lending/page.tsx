"use client";

import { ArrowUpRight, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import PageShell from "@/components/dashboard/PageShell";

const loans = [
  { id: "LN-4401", customer: "Ə. H.", email: "ə***@mail.az", amount: "5,000", outstanding: "3,200", term: "12 mo", rate: "18%", nextPayment: "2025-06-01", status: "current" },
  { id: "LN-4400", customer: "N. Ə.", email: "n***@gmail.com", amount: "2,000", outstanding: "800", term: "6 mo", rate: "16%", nextPayment: "2025-05-25", status: "current" },
  { id: "LN-4399", customer: "R. M.", email: "r***@company.az", amount: "10,000", outstanding: "10,000", term: "24 mo", rate: "20%", nextPayment: "2025-06-01", status: "current" },
  { id: "LN-4398", customer: "G. İ.", email: "g***@mail.az", amount: "3,500", outstanding: "3,850", term: "12 mo", rate: "22%", nextPayment: "2025-05-18", status: "overdue" },
  { id: "LN-4397", customer: "E. Q.", email: "e***@gmail.com", amount: "1,500", outstanding: "0", term: "3 mo", rate: "15%", nextPayment: "—", status: "paid" },
];

const riskBuckets = [
  { label: "0–30 DPD", amount: "₼ 620K", pct: 70, color: "bg-emerald-500", textColor: "text-emerald-700" },
  { label: "31–60 DPD", amount: "₼ 120K", pct: 14, color: "bg-yellow-400", textColor: "text-yellow-700" },
  { label: "61–90 DPD", amount: "₼ 80K", pct: 9, color: "bg-orange-400", textColor: "text-orange-700" },
  { label: "90+ DPD", amount: "₼ 60K", pct: 7, color: "bg-red-500", textColor: "text-red-700" },
];

const statusMap = {
  current: { label: "Current", cls: "bg-emerald-50 text-emerald-700", icon: CheckCircle2 },
  overdue: { label: "Overdue", cls: "bg-red-50 text-red-600", icon: AlertCircle },
  paid: { label: "Paid off", cls: "bg-gray-100 text-gray-500", icon: CheckCircle2 },
};

export default function LendingPage() {
  return (
    <PageShell title="Lending" subtitle="Credit portfolio management and repayment tracking" gdprNotice>
      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { label: "Total outstanding", value: "₼ 890,400", change: "+11.2%", up: true },
          { label: "Active loans", value: "2,104", change: "+5.8%", up: true },
          { label: "Avg. loan size", value: "₼ 4,232", change: "-1.4%", up: false },
          { label: "NPL ratio", value: "2.4%", change: "-0.3%", up: true },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-gray-500">{s.label}</span>
              <span className={`flex items-center text-xs font-semibold ${s.up ? "text-emerald-600" : "text-red-500"}`}>
                <ArrowUpRight size={13} />{s.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Risk buckets */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold text-gray-900 mb-1">Risk buckets (DPD)</p>
          <p className="text-xs text-gray-400 mb-5">Days Past Due distribution</p>
          <div className="space-y-4">
            {riskBuckets.map((b) => (
              <div key={b.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-xs font-medium ${b.textColor}`}>{b.label}</span>
                  <span className="text-xs font-semibold text-gray-700">{b.amount}</span>
                </div>
                <div className="h-2.5 rounded-full bg-gray-100">
                  <div className={`h-2.5 rounded-full ${b.color}`} style={{ width: `${b.pct}%` }} />
                </div>
                <p className="text-[10px] text-gray-400 mt-1">{b.pct}% of portfolio</p>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming repayments */}
        <div className="lg:col-span-2 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold text-gray-900 mb-5">Loan portfolio</p>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-50">
                  {["Loan ID", "Customer", "Amount", "Outstanding", "Rate", "Next payment", "Status"].map((h) => (
                    <th key={h} className="pb-3 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loans.map((l) => {
                  const s = statusMap[l.status as keyof typeof statusMap];
                  const Icon = s.icon;
                  return (
                    <tr key={l.id} className="hover:bg-gray-50/40">
                      <td className="py-3 font-mono text-xs text-gray-400">{l.id}</td>
                      <td className="py-3">
                        <p className="text-sm font-medium text-gray-800">{l.customer}</p>
                        <p className="text-[11px] text-gray-400">{l.email}</p>
                      </td>
                      <td className="py-3 text-sm text-gray-700">₼ {l.amount}</td>
                      <td className="py-3 text-sm font-semibold text-gray-900">₼ {l.outstanding}</td>
                      <td className="py-3 text-sm text-gray-500">{l.rate}</td>
                      <td className="py-3 text-sm text-gray-500">{l.nextPayment}</td>
                      <td className="py-3">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${s.cls}`}>
                          <Icon size={11} />{s.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
