"use client";

import { ShoppingCart, ArrowUpRight, CheckCircle2, Clock } from "lucide-react";
import PageShell from "@/components/dashboard/PageShell";

const plans = [
  { id: "BNPL-881", customer: "G. İ.", email: "g***@mail.az", merchant: "Apple Store", total: "749.00", paid: "249.67", installments: 3, remaining: 2, nextDue: "2025-06-12", status: "active" },
  { id: "BNPL-880", customer: "O. İ.", email: "o***@company.az", merchant: "Park Bulvar", total: "380.00", paid: "126.67", installments: 3, remaining: 2, nextDue: "2025-06-08", status: "active" },
  { id: "BNPL-879", customer: "T. H.", email: "t***@mail.az", merchant: "Kontakt Home", total: "1,200.00", paid: "400.00", installments: 6, remaining: 3, nextDue: "2025-05-20", status: "active" },
  { id: "BNPL-878", customer: "A. A.", email: "a***@company.az", merchant: "Modaevi", total: "240.00", paid: "240.00", installments: 4, remaining: 0, nextDue: "—", status: "completed" },
  { id: "BNPL-877", customer: "F. K.", email: "f***@gmail.com", merchant: "Bravo Supermarket", total: "180.00", paid: "60.00", installments: 3, remaining: 2, nextDue: "2025-05-25", status: "overdue" },
];

const merchants = [
  { name: "Apple Store", plans: 312, gmv: "₼ 234,100", conversion: "+18%", defaultRate: "0.8%" },
  { name: "Kontakt Home", plans: 204, gmv: "₼ 189,400", conversion: "+12%", defaultRate: "1.2%" },
  { name: "Park Bulvar", plans: 188, gmv: "₼ 142,300", conversion: "+9%", defaultRate: "0.6%" },
  { name: "Modaevi", plans: 140, gmv: "₼ 89,200", conversion: "+22%", defaultRate: "1.5%" },
];

export default function BNPLPage() {
  return (
    <PageShell title="BNPL" subtitle="Buy Now Pay Later installment plans" gdprNotice>
      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { label: "Active plans", value: "2,104", change: "+19.4%", up: true },
          { label: "Total GMV", value: "₼ 892,400", change: "+22.1%", up: true },
          { label: "Avg. plan size", value: "₼ 424", change: "+3.2%", up: true },
          { label: "Default rate", value: "1.1%", change: "-0.2%", up: true },
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

      {/* Installment split */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold text-gray-900 mb-5">Installment split</p>
          {[
            { label: "3 installments", pct: 58, color: "bg-orange-500" },
            { label: "6 installments", pct: 28, color: "bg-orange-300" },
            { label: "12 installments", pct: 14, color: "bg-orange-100" },
          ].map((i) => (
            <div key={i.label} className="mb-4">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-gray-600">{i.label}</span>
                <span className="font-semibold text-gray-800">{i.pct}%</span>
              </div>
              <div className="h-2 rounded-full bg-gray-100">
                <div className={`h-2 rounded-full ${i.color}`} style={{ width: `${i.pct}%` }} />
              </div>
            </div>
          ))}
          <div className="mt-5 rounded-xl bg-orange-50 p-3">
            <div className="flex items-center gap-2 mb-1">
              <ShoppingCart size={14} className="text-orange-600" />
              <span className="text-xs font-semibold text-orange-700">Avg. order uplift</span>
            </div>
            <p className="text-xl font-bold text-orange-700">+34%</p>
            <p className="text-[11px] text-orange-600 mt-0.5">vs non-BNPL checkout</p>
          </div>
        </div>

        {/* Merchant performance */}
        <div className="lg:col-span-2 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold text-gray-900 mb-5">Merchant performance</p>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-50">
                  {["Merchant", "Active plans", "GMV", "Conversion lift", "Default rate"].map((h) => (
                    <th key={h} className="pb-3 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {merchants.map((m) => (
                  <tr key={m.name} className="hover:bg-gray-50/40">
                    <td className="py-3 text-sm font-medium text-gray-800">{m.name}</td>
                    <td className="py-3 text-sm text-gray-600">{m.plans}</td>
                    <td className="py-3 text-sm font-semibold text-gray-900">{m.gmv}</td>
                    <td className="py-3 text-sm text-emerald-600 font-medium">{m.conversion}</td>
                    <td className="py-3 text-sm text-gray-500">{m.defaultRate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Active plans table */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="border-b border-gray-50 px-5 py-4">
          <p className="text-sm font-semibold text-gray-900">Active plans</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-50 bg-gray-50/60">
                {["Plan ID", "Customer", "Merchant", "Total", "Progress", "Next due", "Status"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {plans.map((p) => {
                const progress = Math.round(((p.installments - p.remaining) / p.installments) * 100);
                const statusCls = p.status === "completed" ? "bg-gray-100 text-gray-500" : p.status === "overdue" ? "bg-red-50 text-red-600" : "bg-orange-50 text-orange-700";
                const StatusIcon = p.status === "overdue" ? Clock : CheckCircle2;
                return (
                  <tr key={p.id} className="hover:bg-gray-50/40">
                    <td className="px-4 py-3.5 font-mono text-xs text-gray-400">{p.id}</td>
                    <td className="px-4 py-3.5">
                      <p className="text-sm font-medium text-gray-800">{p.customer}</p>
                      <p className="text-[11px] text-gray-400">{p.email}</p>
                    </td>
                    <td className="px-4 py-3.5 text-sm text-gray-500">{p.merchant}</td>
                    <td className="px-4 py-3.5 text-sm font-semibold text-gray-900">₼ {p.total}</td>
                    <td className="px-4 py-3.5 min-w-[120px]">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 rounded-full bg-gray-100">
                          <div className="h-1.5 rounded-full bg-orange-500" style={{ width: `${progress}%` }} />
                        </div>
                        <span className="text-[11px] text-gray-400 whitespace-nowrap">{p.installments - p.remaining}/{p.installments}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-sm text-gray-500">{p.nextDue}</td>
                    <td className="px-4 py-3.5">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${statusCls}`}>
                        <StatusIcon size={11} />{p.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </PageShell>
  );
}
