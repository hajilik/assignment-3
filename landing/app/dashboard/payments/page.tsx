"use client";

import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import PageShell from "@/components/dashboard/PageShell";

const hourlyVolume = [40, 55, 30, 20, 15, 25, 45, 70, 90, 85, 78, 92, 100, 88, 76, 82, 95, 88, 72, 60, 50, 42, 35, 28];
const categories = [
  { name: "Retail & Grocery", amount: "₼ 620,400", pct: 100, color: "bg-blue-500" },
  { name: "Transport & Fuel", amount: "₼ 312,800", pct: 50, color: "bg-indigo-400" },
  { name: "Food & Delivery", amount: "₼ 198,100", pct: 32, color: "bg-violet-400" },
  { name: "Telecom", amount: "₼ 144,200", pct: 23, color: "bg-purple-400" },
  { name: "Electronics", amount: "₼ 122,900", pct: 20, color: "bg-fuchsia-400" },
  { name: "Other", amount: "₼ 89,340", pct: 14, color: "bg-gray-300" },
];
const merchants = [
  { name: "Bravo Supermarket", volume: "₼ 218,400", txns: "4,201", success: "99.2%" },
  { name: "Wolt", volume: "₼ 98,200", txns: "2,890", success: "98.7%" },
  { name: "BP Fueling", volume: "₼ 87,100", txns: "1,440", success: "99.8%" },
  { name: "Nar Mobile", volume: "₼ 72,400", txns: "3,120", success: "97.4%" },
  { name: "Umico Market", volume: "₼ 54,900", txns: "1,204", success: "98.9%" },
];

export default function PaymentsPage() {
  return (
    <PageShell title="Payments" subtitle="Payment volumes, success rates and merchant breakdown">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { label: "Total volume (MTD)", value: "₼ 1,487,740", change: "+14.2%", up: true },
          { label: "Total transactions", value: "12,855", change: "+8.4%", up: true },
          { label: "Success rate", value: "98.6%", change: "+0.3%", up: true },
          { label: "Avg. transaction", value: "₼ 115.70", change: "-2.1%", up: false },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-gray-500">{s.label}</span>
              <span className={`flex items-center text-xs font-semibold ${s.up ? "text-emerald-600" : "text-red-500"}`}>
                {s.up ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}{s.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Hourly volume chart */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-sm font-semibold text-gray-900">Hourly payment volume — today</p>
            <p className="text-xs text-gray-400 mt-0.5">All payment types combined</p>
          </div>
          <span className="text-xs font-semibold text-blue-600">Peak: 12:00–13:00</span>
        </div>
        <div className="flex items-end gap-1 h-32">
          {hourlyVolume.map((v, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-1">
              <div className={`w-full rounded-t ${i === 12 ? "bg-blue-600" : "bg-blue-100"}`} style={{ height: `${v}%` }} />
              {i % 4 === 0 && <span className="text-[9px] text-gray-400">{String(i).padStart(2, "0")}h</span>}
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Category breakdown */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold text-gray-900 mb-5">Volume by category</p>
          <div className="space-y-4">
            {categories.map((c) => (
              <div key={c.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm text-gray-700">{c.name}</span>
                  <span className="text-sm font-semibold text-gray-800">{c.amount}</span>
                </div>
                <div className="h-2 rounded-full bg-gray-100">
                  <div className={`h-2 rounded-full ${c.color}`} style={{ width: `${c.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top merchants */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold text-gray-900 mb-5">Top merchants</p>
          <div className="space-y-3">
            {merchants.map((m, i) => (
              <div key={m.name} className="flex items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-500">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{m.name}</p>
                  <p className="text-[11px] text-gray-400">{m.txns} transactions · {m.success} success</p>
                </div>
                <span className="text-sm font-semibold text-gray-800 shrink-0">{m.volume}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
