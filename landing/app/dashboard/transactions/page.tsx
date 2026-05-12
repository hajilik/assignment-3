"use client";

import { useState, useMemo } from "react";
import { Search, Download, X, CheckCircle2, Clock, XCircle, Filter } from "lucide-react";
import PageShell from "@/components/dashboard/PageShell";

const ALL_TXN = [
  { id: "TXN-9041", customer: "Ə. H.", email: "ə***@mail.az", merchant: "Bravo Supermarket", type: "Payment", amount: "142.50", status: "approved", time: "2025-05-12 09:14" },
  { id: "TXN-9040", customer: "N. Ə.", email: "n***@gmail.com", merchant: "BP Fueling Station", type: "Payment", amount: "65.00", status: "approved", time: "2025-05-12 09:08" },
  { id: "TXN-9039", customer: "R. M.", email: "r***@company.az", merchant: "Tap.az", type: "Transfer", amount: "299.00", status: "processing", time: "2025-05-12 09:02" },
  { id: "TXN-9038", customer: "G. İ.", email: "g***@mail.az", merchant: "Apple Store", type: "BNPL", amount: "749.00", status: "approved", time: "2025-05-12 08:45" },
  { id: "TXN-9037", customer: "E. Q.", email: "e***@gmail.com", merchant: "Wolt", type: "Payment", amount: "23.50", status: "approved", time: "2025-05-12 08:31" },
  { id: "TXN-9036", customer: "S. B.", email: "s***@bank.az", merchant: "Kontakt Home", type: "Lending", amount: "1,200.00", status: "failed", time: "2025-05-12 08:15" },
  { id: "TXN-9035", customer: "T. H.", email: "t***@mail.az", merchant: "Bolt", type: "Payment", amount: "8.40", status: "approved", time: "2025-05-12 08:02" },
  { id: "TXN-9034", customer: "A. A.", email: "a***@company.az", merchant: "Umico Market", type: "Payment", amount: "54.90", status: "approved", time: "2025-05-11 22:14" },
  { id: "TXN-9033", customer: "L. M.", email: "l***@mail.az", merchant: "Azercell", type: "Transfer", amount: "20.00", status: "approved", time: "2025-05-11 21:55" },
  { id: "TXN-9032", customer: "F. K.", email: "f***@gmail.com", merchant: "İpoteka Bank", type: "Lending", amount: "5,000.00", status: "approved", time: "2025-05-11 18:30" },
  { id: "TXN-9031", customer: "Z. H.", email: "z***@mail.az", merchant: "Nar Mobile", type: "Payment", amount: "15.00", status: "failed", time: "2025-05-11 17:12" },
  { id: "TXN-9030", customer: "O. İ.", email: "o***@company.az", merchant: "Park Bulvar", type: "BNPL", amount: "380.00", status: "approved", time: "2025-05-11 15:44" },
];

const TYPE_COLORS: Record<string, string> = {
  Payment: "bg-blue-50 text-blue-700",
  Transfer: "bg-indigo-50 text-indigo-700",
  BNPL: "bg-orange-50 text-orange-700",
  Lending: "bg-emerald-50 text-emerald-700",
};

const STATUS_MAP = {
  approved: { label: "Approved", cls: "text-emerald-600 bg-emerald-50", icon: CheckCircle2 },
  processing: { label: "Processing", cls: "text-yellow-600 bg-yellow-50", icon: Clock },
  failed: { label: "Failed", cls: "text-red-600 bg-red-50", icon: XCircle },
};

export default function TransactionsPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportConsent, setExportConsent] = useState(false);
  const [exported, setExported] = useState(false);

  const filtered = useMemo(() => ALL_TXN.filter((t) => {
    const matchSearch = !search || t.id.includes(search) || t.customer.toLowerCase().includes(search.toLowerCase()) || t.merchant.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "all" || t.type === typeFilter;
    const matchStatus = statusFilter === "all" || t.status === statusFilter;
    return matchSearch && matchType && matchStatus;
  }), [search, typeFilter, statusFilter]);

  const handleExport = async () => {
    await new Promise((r) => setTimeout(r, 800));
    setExported(true);
    setTimeout(() => { setShowExportModal(false); setExported(false); setExportConsent(false); }, 1500);
  };

  return (
    <PageShell title="Transactions" subtitle="Full transaction history across all products" gdprNotice
      actions={
        <button onClick={() => setShowExportModal(true)}
          className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
          <Download size={14} /> Export
        </button>
      }
    >
      {/* Summary stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Total transactions", value: "12,430" },
          { label: "Approved", value: "11,802", cls: "text-emerald-600" },
          { label: "Processing", value: "418", cls: "text-yellow-600" },
          { label: "Failed", value: "210", cls: "text-red-500" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
            <p className={`text-lg font-bold ${s.cls || "text-gray-900"}`}>{s.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by TXN ID, customer or merchant..."
            className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-9 pr-4 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20" />
          {search && <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"><X size={14} /></button>}
        </div>
        <div className="flex items-center gap-1 rounded-xl border border-gray-200 bg-white p-1">
          <Filter size={13} className="ml-2 text-gray-400" />
          {["all", "Payment", "Transfer", "BNPL", "Lending"].map((t) => (
            <button key={t} onClick={() => setTypeFilter(t)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${typeFilter === t ? "bg-blue-600 text-white" : "text-gray-500 hover:text-gray-800"}`}>
              {t === "all" ? "All types" : t}
            </button>
          ))}
        </div>
        <div className="flex gap-1 rounded-xl border border-gray-200 bg-white p-1">
          {["all", "approved", "processing", "failed"].map((s) => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-all ${statusFilter === s ? "bg-blue-600 text-white" : "text-gray-500 hover:text-gray-800"}`}>
              {s === "all" ? "All status" : s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-50 bg-gray-50/60">
                {["TXN ID", "Customer", "Merchant", "Type", "Amount", "Status", "Date/Time"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((t) => {
                const s = STATUS_MAP[t.status as keyof typeof STATUS_MAP] || STATUS_MAP.processing;
                const Icon = s.icon;
                return (
                  <tr key={t.id} className="hover:bg-gray-50/40 transition-colors">
                    <td className="px-4 py-3.5 font-mono text-xs text-gray-400">{t.id}</td>
                    <td className="px-4 py-3.5">
                      <p className="text-sm font-medium text-gray-800">{t.customer}</p>
                      <p className="text-[11px] text-gray-400">{t.email}</p>
                    </td>
                    <td className="px-4 py-3.5 text-sm text-gray-500">{t.merchant}</td>
                    <td className="px-4 py-3.5"><span className={`rounded-md px-2 py-0.5 text-xs font-medium ${TYPE_COLORS[t.type] || "bg-gray-100 text-gray-600"}`}>{t.type}</span></td>
                    <td className="px-4 py-3.5 text-sm font-semibold text-gray-900">₼ {t.amount}</td>
                    <td className="px-4 py-3.5"><span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${s.cls}`}><Icon size={11} />{s.label}</span></td>
                    <td className="px-4 py-3.5 text-xs text-gray-400">{t.time}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && <div className="py-12 text-center text-sm text-gray-400">No transactions match your filters.</div>}
        </div>
        <div className="flex items-center justify-between border-t border-gray-50 px-4 py-3">
          <p className="text-xs text-gray-400">Showing {filtered.length} of {ALL_TXN.length} transactions</p>
          <div className="flex gap-1">
            <button className="rounded-lg border border-gray-200 px-3 py-1 text-xs text-gray-500 hover:bg-gray-50">Previous</button>
            <button className="rounded-lg border border-gray-200 px-3 py-1 text-xs text-gray-500 hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-gray-900">Export transactions</h3>
              <button onClick={() => setShowExportModal(false)} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100"><X size={16} /></button>
            </div>
            {exported ? (
              <div className="flex flex-col items-center py-6 text-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50"><CheckCircle2 className="text-emerald-500" size={24} /></div>
                <p className="font-semibold text-gray-900">Export ready</p>
                <p className="text-sm text-gray-500">Your CSV has been generated. Download will start shortly.</p>
              </div>
            ) : (
              <>
                <div className="rounded-xl bg-amber-50 border border-amber-100 p-3 mb-4 text-xs text-amber-700">
                  <p className="font-semibold mb-1">GDPR — Data Export Notice</p>
                  <p>Exported files contain personal data. You must ensure this data is handled in compliance with GDPR Article 5. Exports are logged with your user ID and timestamp for audit purposes.</p>
                </div>
                <label className="flex items-start gap-2.5 cursor-pointer mb-5">
                  <input type="checkbox" checked={exportConsent} onChange={(e) => setExportConsent(e.target.checked)} className="mt-0.5 h-4 w-4 rounded border-gray-300 text-blue-600" />
                  <span className="text-sm text-gray-600">I confirm this export is for a legitimate business purpose and I will handle personal data in accordance with our Data Processing Agreement.</span>
                </label>
                <div className="flex gap-2">
                  <button onClick={() => setShowExportModal(false)} className="flex-1 rounded-xl border border-gray-200 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50">Cancel</button>
                  <button onClick={handleExport} disabled={!exportConsent}
                    className="flex-1 rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all">
                    Export CSV
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </PageShell>
  );
}
