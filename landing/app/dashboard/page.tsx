"use client";

import { useEffect, useState } from "react";
import {
  TrendingUp,
  CreditCard,
  ArrowLeftRight,
  Zap,
  Activity,
  CheckCircle2,
  Clock,
  XCircle,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const metrics = [
  {
    label: "Total Volume",
    value: "₼ 2,418,340",
    change: "+12.4%",
    up: true,
    icon: TrendingUp,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    label: "Active Cards",
    value: "18,924",
    change: "+8.1%",
    up: true,
    icon: CreditCard,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    label: "Transactions today",
    value: "1,247",
    change: "-3.2%",
    up: false,
    icon: ArrowLeftRight,
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    label: "API Uptime",
    value: "99.98%",
    change: "+0.01%",
    up: true,
    icon: Activity,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
];

const transactions = [
  { id: "TXN-9041", customer: "Əli Hüseynov", merchant: "Bravo Supermarket", amount: "142.50", type: "Payment", status: "approved", time: "2 min ago" },
  { id: "TXN-9040", customer: "Nərmin Əliyeva", merchant: "BP Fueling Station", amount: "65.00", type: "Payment", status: "approved", time: "8 min ago" },
  { id: "TXN-9039", customer: "Rauf Məmmədov", merchant: "Tap.az", amount: "299.00", type: "Transfer", status: "processing", time: "14 min ago" },
  { id: "TXN-9038", customer: "Günel İsmayılova", merchant: "Apple Store", amount: "749.00", type: "BNPL", status: "approved", time: "31 min ago" },
  { id: "TXN-9037", customer: "Elnur Qasımov", merchant: "Wolt", amount: "23.50", type: "Payment", status: "approved", time: "45 min ago" },
  { id: "TXN-9036", customer: "Sevinc Babayeva", merchant: "Kontakt Home", amount: "1,200.00", type: "Lending", status: "failed", time: "1 hr ago" },
  { id: "TXN-9035", customer: "Tural Hüseynli", merchant: "Bolt", amount: "8.40", type: "Payment", status: "approved", time: "1 hr ago" },
];

const chartBars = [
  { label: "May 6", value: 62 },
  { label: "May 7", value: 78 },
  { label: "May 8", value: 55 },
  { label: "May 9", value: 91 },
  { label: "May 10", value: 74 },
  { label: "May 11", value: 88 },
  { label: "May 12", value: 100 },
];

const products = [
  { name: "Card Issuing", status: "active", cards: "18,924 cards" },
  { name: "Payments", status: "active", cards: "₼ 1.2M volume" },
  { name: "Transfers", status: "active", cards: "4,302 transfers" },
  { name: "Lending", status: "active", cards: "₼ 890K portfolio" },
  { name: "BNPL", status: "active", cards: "2,104 plans" },
  { name: "Reporting", status: "active", cards: "Real-time" },
];

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { icon: typeof CheckCircle2; cls: string; label: string }> = {
    approved: { icon: CheckCircle2, cls: "text-emerald-600 bg-emerald-50", label: "Approved" },
    processing: { icon: Clock, cls: "text-yellow-600 bg-yellow-50", label: "Processing" },
    failed: { icon: XCircle, cls: "text-red-600 bg-red-50", label: "Failed" },
  };
  const { icon: Icon, cls, label } = map[status] || map.processing;
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${cls}`}>
      <Icon size={11} />
      {label}
    </span>
  );
}

export default function DashboardPage() {
  const [user, setUser] = useState("Partner");

  useEffect(() => {
    setUser(localStorage.getItem("baas_user") || "Partner");
  }, []);

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Welcome */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Good {getGreeting()}, {user} 👋
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">Here&apos;s what&apos;s happening with your platform today.</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-medium text-gray-600">All systems operational</span>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <div key={m.label} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <div className={`rounded-xl ${m.bg} p-2.5`}>
                  <Icon size={18} className={m.color} />
                </div>
                <span className={`flex items-center gap-0.5 text-xs font-semibold ${m.up ? "text-emerald-600" : "text-red-500"}`}>
                  {m.up ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                  {m.change}
                </span>
              </div>
              <p className="mt-4 text-2xl font-bold text-gray-900 leading-none">{m.value}</p>
              <p className="mt-1.5 text-xs text-gray-500">{m.label}</p>
            </div>
          );
        })}
      </div>

      {/* Chart + Products */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Volume chart */}
        <div className="lg:col-span-2 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm font-semibold text-gray-900">Transaction Volume</p>
              <p className="text-xs text-gray-400">Last 7 days</p>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-blue-600" />
              <span className="text-xs text-gray-500">Volume (₼)</span>
            </div>
          </div>

          {/* Bar chart */}
          <div className="flex items-end gap-2 h-40">
            {chartBars.map((bar, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-2">
                <div className="relative w-full flex items-end" style={{ height: "120px" }}>
                  <div
                    className={`w-full rounded-t-lg transition-all duration-500 ${
                      i === chartBars.length - 1 ? "bg-blue-600" : "bg-blue-100"
                    }`}
                    style={{ height: `${bar.value}%` }}
                  />
                  {i === chartBars.length - 1 && (
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 rounded-md bg-gray-900 px-2 py-0.5 text-[10px] text-white whitespace-nowrap">
                      ₼ 341K
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-gray-400">{bar.label.split(" ")[1]}</span>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="mt-4 flex items-center gap-6 border-t border-gray-50 pt-4">
            <div>
              <p className="text-xs text-gray-400">Total this week</p>
              <p className="text-sm font-semibold text-gray-900">₼ 2,418,340</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">vs last week</p>
              <p className="text-sm font-semibold text-emerald-600">↑ 12.4%</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Peak day</p>
              <p className="text-sm font-semibold text-gray-900">Today</p>
            </div>
          </div>
        </div>

        {/* Products status */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <p className="text-sm font-semibold text-gray-900">Active Products</p>
            <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-600">
              All live
            </span>
          </div>
          <ul className="space-y-3">
            {products.map((p) => (
              <li key={p.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="text-sm text-gray-700">{p.name}</span>
                </div>
                <span className="text-xs text-gray-400">{p.cards}</span>
              </li>
            ))}
          </ul>

          {/* API health */}
          <div className="mt-6 rounded-xl bg-gray-50 p-3">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-medium text-gray-600">API Health</p>
              <span className="text-xs font-semibold text-emerald-600">99.98%</span>
            </div>
            <div className="flex gap-0.5">
              {Array.from({ length: 30 }).map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-sm ${i === 14 ? "bg-yellow-400" : "bg-emerald-400"}`}
                  style={{ height: "20px" }}
                />
              ))}
            </div>
            <p className="mt-1.5 text-[10px] text-gray-400">Last 30 days · 1 incident</p>
          </div>
        </div>
      </div>

      {/* Transactions table */}
      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
          <p className="text-sm font-semibold text-gray-900">Recent Transactions</p>
          <button className="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors">
            View all →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/60">
                <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-400">ID</th>
                <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-400">Customer</th>
                <th className="hidden md:table-cell px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-400">Merchant</th>
                <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-400">Type</th>
                <th className="px-5 py-3 text-right text-[11px] font-semibold uppercase tracking-wide text-gray-400">Amount</th>
                <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-400">Status</th>
                <th className="hidden lg:table-cell px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-400">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3.5">
                    <span className="font-mono text-xs text-gray-400">{tx.id}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-sm font-medium text-gray-800">{tx.customer}</span>
                  </td>
                  <td className="hidden md:table-cell px-5 py-3.5">
                    <span className="text-sm text-gray-500">{tx.merchant}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                      {tx.type}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <span className="text-sm font-semibold text-gray-900">₼ {tx.amount}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <StatusBadge status={tx.status} />
                  </td>
                  <td className="hidden lg:table-cell px-5 py-3.5">
                    <span className="text-xs text-gray-400">{tx.time}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "morning";
  if (h < 18) return "afternoon";
  return "evening";
}
