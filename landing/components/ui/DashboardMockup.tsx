"use client";

import { motion } from "framer-motion";

const transactions = [
  { id: "TXN-8821", merchant: "Bravo Supermarket", amount: "+₼ 142.50", status: "Approved", color: "text-emerald-400" },
  { id: "TXN-8820", merchant: "Tap az", amount: "+₼ 38.00", status: "Approved", color: "text-emerald-400" },
  { id: "TXN-8819", merchant: "BP Fueling", amount: "+₼ 65.00", status: "Processing", color: "text-yellow-400" },
  { id: "TXN-8818", merchant: "Apple Store", amount: "+₼ 299.00", status: "Approved", color: "text-emerald-400" },
];

export default function DashboardMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.4 }}
      className="relative w-full max-w-lg"
    >
      {/* Background glow */}
      <div className="absolute -inset-4 rounded-3xl bg-blue-600/10 blur-2xl" />

      {/* Main dashboard card */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative rounded-2xl border border-white/10 bg-[#0f1629] shadow-2xl overflow-hidden"
      >
        {/* Dashboard header */}
        <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500/70" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
            <div className="h-3 w-3 rounded-full bg-green-500/70" />
          </div>
          <span className="text-xs font-medium text-gray-500">Unibank BaaS — Partner Dashboard</span>
          <div className="h-2 w-16 rounded-full bg-white/5" />
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-0 border-b border-white/5">
          {[
            { label: "Total Volume", value: "₼ 2.4M", change: "+12.4%" },
            { label: "Active Cards", value: "18,924", change: "+8.1%" },
            { label: "API Calls", value: "1.2M", change: "+21.3%" },
          ].map((stat) => (
            <div key={stat.label} className="border-r border-white/5 last:border-r-0 px-4 py-4">
              <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
              <p className="text-lg font-semibold text-white">{stat.value}</p>
              <p className="text-xs text-emerald-400">{stat.change}</p>
            </div>
          ))}
        </div>

        {/* Transaction list */}
        <div className="px-5 py-3">
          <p className="text-xs font-medium text-gray-500 mb-3">Recent Transactions</p>
          <div className="space-y-2">
            {transactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between py-1.5">
                <div className="flex items-center gap-3">
                  <div className="h-7 w-7 rounded-lg bg-white/5 flex items-center justify-center">
                    <div className="h-3 w-3 rounded-full bg-blue-400/40" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-200">{tx.merchant}</p>
                    <p className="text-[10px] text-gray-600">{tx.id}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold text-gray-200">{tx.amount}</p>
                  <p className={`text-[10px] ${tx.color}`}>{tx.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mini chart bar */}
        <div className="px-5 pb-4">
          <div className="flex items-end gap-1 h-12">
            {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 100].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm bg-blue-500/30"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Floating API card */}
      <motion.div
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -bottom-6 -right-6 w-64 rounded-xl border border-white/10 bg-[#0d1117] p-4 shadow-xl"
      >
        <div className="mb-2 flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-emerald-400" />
          <span className="text-[10px] font-medium text-emerald-400">200 OK</span>
          <span className="ml-auto text-[10px] text-gray-600">34ms</span>
        </div>
        <p className="font-mono text-[10px] text-blue-400">POST /v1/cards/issue</p>
        <div className="mt-2 space-y-1 font-mono text-[9px] text-gray-500">
          <p><span className="text-gray-400">"card_id"</span>: <span className="text-emerald-400">"card_7yNk..."</span></p>
          <p><span className="text-gray-400">"status"</span>: <span className="text-yellow-400">"active"</span></p>
          <p><span className="text-gray-400">"network"</span>: <span className="text-purple-400">"Visa"</span></p>
        </div>
      </motion.div>
    </motion.div>
  );
}
