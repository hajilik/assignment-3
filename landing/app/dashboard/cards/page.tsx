"use client";

import { useState } from "react";
import { CreditCard, Plus, Snowflake, Ban, Search, X, CheckCircle2, Clock, XCircle } from "lucide-react";
import PageShell from "@/components/dashboard/PageShell";

const CARDS = [
  { id: "card_7yNk3pX", pan: "•••• •••• •••• 4242", holder: "Ə. H.", type: "Virtual", network: "Visa", status: "active", issued: "2025-01-14", expiry: "01/28", limit: "2,000", spent: "142.50" },
  { id: "card_8mLp2qR", pan: "•••• •••• •••• 8811", holder: "N. Ə.", type: "Physical", network: "Visa", status: "active", issued: "2025-02-01", expiry: "02/28", limit: "5,000", spent: "1,204.00" },
  { id: "card_3xKw9nT", pan: "•••• •••• •••• 1337", holder: "R. M.", type: "Virtual", network: "Mastercard", status: "frozen", issued: "2024-11-20", expiry: "11/27", limit: "1,000", spent: "0.00" },
  { id: "card_5vBr1sY", pan: "•••• •••• •••• 5599", holder: "G. İ.", type: "Physical", network: "Visa", status: "active", issued: "2025-03-10", expiry: "03/28", limit: "10,000", spent: "749.00" },
  { id: "card_9cDm7jU", pan: "•••• •••• •••• 2021", holder: "E. Q.", type: "Virtual", network: "Mastercard", status: "active", issued: "2025-04-05", expiry: "04/28", limit: "3,000", spent: "231.80" },
  { id: "card_2aFn4kV", pan: "•••• •••• •••• 7766", holder: "S. B.", type: "Physical", network: "Visa", status: "cancelled", issued: "2024-08-12", expiry: "08/27", limit: "2,000", spent: "899.00" },
  { id: "card_6bGo5lW", pan: "•••• •••• •••• 3344", holder: "T. H.", type: "Virtual", network: "Visa", status: "active", issued: "2025-05-01", expiry: "05/28", limit: "1,500", spent: "8.40" },
];

const statusMap = {
  active: { label: "Active", cls: "bg-emerald-50 text-emerald-700", icon: CheckCircle2 },
  frozen: { label: "Frozen", cls: "bg-blue-50 text-blue-700", icon: Snowflake },
  cancelled: { label: "Cancelled", cls: "bg-red-50 text-red-600", icon: XCircle },
  pending: { label: "Pending", cls: "bg-yellow-50 text-yellow-700", icon: Clock },
};

const stats = [
  { label: "Total Issued", value: "18,924", sub: "+124 this month" },
  { label: "Active", value: "17,806", sub: "94.1%" },
  { label: "Virtual", value: "12,340", sub: "65.2%" },
  { label: "Physical", value: "6,584", sub: "34.8%" },
  { label: "Frozen", value: "891", sub: "4.7%" },
];

export default function CardsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string>("all");
  const [showModal, setShowModal] = useState(false);
  const [cards, setCards] = useState(CARDS);
  const [newCard, setNewCard] = useState({ holder: "", type: "Virtual", limit: "" });
  const [issuing, setIssuing] = useState(false);

  const filtered = cards.filter((c) => {
    const matchStatus = filter === "all" || c.status === filter;
    const matchSearch = search === "" || c.id.includes(search) || c.holder.toLowerCase().includes(search.toLowerCase()) || c.pan.includes(search);
    return matchStatus && matchSearch;
  });

  const toggleFreeze = (id: string) => {
    setCards((prev) => prev.map((c) => c.id === id ? { ...c, status: c.status === "frozen" ? "active" : "frozen" } : c));
  };

  const issueCard = async (e: React.FormEvent) => {
    e.preventDefault();
    setIssuing(true);
    await new Promise((r) => setTimeout(r, 1200));
    const newId = `card_${Math.random().toString(36).slice(2, 9)}`;
    const pan = `•••• •••• •••• ${Math.floor(1000 + Math.random() * 9000)}`;
    setCards((prev) => [{
      id: newId, pan, holder: newCard.holder.split(" ").map((n, i) => i === 0 ? n[0] + "." : n[0] + ".").join(" "),
      type: newCard.type, network: "Visa", status: "active",
      issued: new Date().toISOString().slice(0, 10),
      expiry: "05/28", limit: newCard.limit || "1,000", spent: "0.00",
    }, ...prev]);
    setIssuing(false);
    setShowModal(false);
    setNewCard({ holder: "", type: "Virtual", limit: "" });
  };

  return (
    <PageShell
      title="Cards"
      subtitle="Manage issued virtual and physical cards"
      gdprNotice
      actions={
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors shadow-sm">
          <Plus size={15} /> Issue card
        </button>
      }
    >
      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
            <p className="text-lg font-bold text-gray-900">{s.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
            <p className="text-[11px] text-gray-400 mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by card ID, holder or last 4..."
            className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-9 pr-4 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
          />
          {search && <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"><X size={14} /></button>}
        </div>
        <div className="flex gap-1 rounded-xl border border-gray-200 bg-white p-1">
          {["all", "active", "frozen", "cancelled"].map((s) => (
            <button key={s} onClick={() => setFilter(s)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-all ${filter === s ? "bg-blue-600 text-white shadow-sm" : "text-gray-500 hover:text-gray-900"}`}>
              {s}
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
                {["Card number", "Holder", "Type", "Network", "Limit / Spent", "Status", "Expires", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((c) => {
                const { label, cls, icon: Icon } = statusMap[c.status as keyof typeof statusMap] || statusMap.pending;
                return (
                  <tr key={c.id} className="hover:bg-gray-50/40 transition-colors">
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-blue-600 to-indigo-600">
                          <CreditCard size={13} className="text-white" />
                        </div>
                        <span className="font-mono text-xs text-gray-600">{c.pan}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-sm font-medium text-gray-800">{c.holder}</td>
                    <td className="px-4 py-3.5"><span className={`rounded-md px-2 py-0.5 text-xs font-medium ${c.type === "Virtual" ? "bg-purple-50 text-purple-700" : "bg-gray-100 text-gray-600"}`}>{c.type}</span></td>
                    <td className="px-4 py-3.5 text-sm text-gray-500">{c.network}</td>
                    <td className="px-4 py-3.5">
                      <p className="text-sm font-medium text-gray-800">₼ {c.limit}</p>
                      <p className="text-xs text-gray-400">₼ {c.spent} spent</p>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${cls}`}>
                        <Icon size={11} /> {label}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-sm text-gray-500">{c.expiry}</td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1">
                        {c.status !== "cancelled" && (
                          <button onClick={() => toggleFreeze(c.id)}
                            title={c.status === "frozen" ? "Unfreeze" : "Freeze"}
                            className={`rounded-lg p-1.5 text-xs transition-colors ${c.status === "frozen" ? "bg-blue-50 text-blue-600 hover:bg-blue-100" : "text-gray-400 hover:bg-gray-100 hover:text-gray-700"}`}>
                            <Snowflake size={14} />
                          </button>
                        )}
                        {c.status === "active" && (
                          <button onClick={() => setCards((prev) => prev.map((card) => card.id === c.id ? { ...card, status: "cancelled" } : card))}
                            title="Cancel card"
                            className="rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors">
                            <Ban size={14} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-12 text-center text-sm text-gray-400">No cards match your search.</div>
          )}
        </div>
        <div className="flex items-center justify-between border-t border-gray-50 px-4 py-3">
          <p className="text-xs text-gray-400">Showing {filtered.length} of {cards.length} cards</p>
          <div className="flex gap-1">
            <button className="rounded-lg border border-gray-200 px-3 py-1 text-xs text-gray-500 hover:bg-gray-50">Previous</button>
            <button className="rounded-lg border border-gray-200 px-3 py-1 text-xs text-gray-500 hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>

      {/* Issue Card Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-bold text-gray-900">Issue new card</h3>
              <button onClick={() => setShowModal(false)} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100"><X size={16} /></button>
            </div>
            <form onSubmit={issueCard} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-700">Cardholder name <span className="text-red-400">*</span></label>
                <input required value={newCard.holder} onChange={(e) => setNewCard({ ...newCard, holder: e.target.value })}
                  placeholder="Full name of cardholder"
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-700">Card type</label>
                <div className="flex gap-2">
                  {["Virtual", "Physical"].map((t) => (
                    <button key={t} type="button" onClick={() => setNewCard({ ...newCard, type: t })}
                      className={`flex-1 rounded-xl border py-2.5 text-sm font-medium transition-all ${newCard.type === t ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 text-gray-600 hover:border-gray-300"}`}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-700">Spending limit (₼)</label>
                <input value={newCard.limit} onChange={(e) => setNewCard({ ...newCard, limit: e.target.value })}
                  placeholder="e.g. 2000"
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20" />
              </div>
              <div className="rounded-xl bg-amber-50 border border-amber-100 px-3 py-2.5 text-xs text-amber-700">
                Card details will be delivered securely. Cardholder data is processed under GDPR Article 6(1)(b).
              </div>
              <div className="flex gap-2 pt-1">
                <button type="button" onClick={() => setShowModal(false)}
                  className="flex-1 rounded-xl border border-gray-200 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50">
                  Cancel
                </button>
                <button type="submit" disabled={issuing}
                  className="flex-1 rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-70 flex items-center justify-center gap-2">
                  {issuing ? <><svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Issuing...</> : "Issue card"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </PageShell>
  );
}
