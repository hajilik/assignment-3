"use client";

import { useState } from "react";
import { Copy, Eye, EyeOff, Plus, Trash2, CheckCircle2, X, Webhook } from "lucide-react";
import PageShell from "@/components/dashboard/PageShell";

const INITIAL_KEYS = [
  { id: "key_1", name: "Production — Main", key: "sk_live_upi_4xMr9kLpQw8nVbTzYc2hJdR7", env: "live", created: "2025-01-14", lastUsed: "2 min ago", calls: "1,204,800" },
  { id: "key_2", name: "Production — Reporting", key: "sk_live_upi_7jKs3nMoXe1vWaUrBf5gHiL0", env: "live", created: "2025-02-01", lastUsed: "1 hr ago", calls: "84,200" },
  { id: "key_3", name: "Staging", key: "sk_test_upi_2bCp8tNqYr4wZsXdAe6mFkG1", env: "test", created: "2024-11-20", lastUsed: "Yesterday", calls: "12,400" },
];

const WEBHOOKS = [
  { id: "wh_1", url: "https://partner.az/webhooks/upi", events: ["card.activated", "card.frozen", "transaction.created"], status: "active", lastDelivery: "2 min ago", successRate: "99.8%" },
  { id: "wh_2", url: "https://partner.az/webhooks/lending", events: ["loan.created", "repayment.received", "loan.defaulted"], status: "active", lastDelivery: "34 min ago", successRate: "100%" },
];

function maskKey(key: string) {
  return key.slice(0, 16) + "••••••••••••••••••••" + key.slice(-4);
}

export default function APIKeysPage() {
  const [keys, setKeys] = useState(INITIAL_KEYS);
  const [revealed, setRevealed] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);
  const [tab, setTab] = useState<"live" | "test">("live");
  const [showCreate, setShowCreate] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyEnv, setNewKeyEnv] = useState<"live" | "test">("test");
  const [creating, setCreating] = useState(false);
  const [createdKey, setCreatedKey] = useState<string | null>(null);

  const copy = (text: string, id: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const toggleReveal = (id: string) => {
    setRevealed((prev) => prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]);
  };

  const deleteKey = (id: string) => {
    setKeys((prev) => prev.filter((k) => k.id !== id));
  };

  const createKey = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    await new Promise((r) => setTimeout(r, 1200));
    const raw = `sk_${newKeyEnv === "live" ? "live" : "test"}_upi_${Math.random().toString(36).slice(2, 14)}${Math.random().toString(36).slice(2, 14)}`;
    setCreatedKey(raw);
    setKeys((prev) => [{ id: `key_${Date.now()}`, name: newKeyName, key: raw, env: newKeyEnv, created: new Date().toISOString().slice(0, 10), lastUsed: "Never", calls: "0" }, ...prev]);
    setCreating(false);
  };

  const filtered = keys.filter((k) => k.env === tab);

  return (
    <PageShell title="API Keys" subtitle="Manage API credentials and webhook endpoints"
      actions={
        <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 shadow-sm transition-colors">
          <Plus size={15} /> Create key
        </button>
      }
    >
      {/* Usage stats */}
      <div className="grid grid-cols-3 gap-3">
        {[{ label: "API calls this month", value: "1,301,400" }, { label: "Error rate", value: "0.02%" }, { label: "Avg. latency (p95)", value: "84ms" }].map((s) => (
          <div key={s.label} className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
            <p className="text-lg font-bold text-gray-900">{s.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Keys */}
      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
        <div className="flex items-center justify-between border-b border-gray-50 px-5 py-4">
          <p className="text-sm font-semibold text-gray-900">API Keys</p>
          <div className="flex gap-1 rounded-lg border border-gray-200 p-1">
            {(["live", "test"] as const).map((e) => (
              <button key={e} onClick={() => setTab(e)}
                className={`rounded-md px-3 py-1 text-xs font-medium capitalize transition-all ${tab === e ? (e === "live" ? "bg-emerald-600 text-white" : "bg-gray-700 text-white") : "text-gray-500 hover:text-gray-800"}`}>
                {e === "live" ? "🟢 Live" : "🔵 Test"}
              </button>
            ))}
          </div>
        </div>

        {tab === "live" && (
          <div className="flex items-center gap-2 bg-amber-50 border-b border-amber-100 px-5 py-2.5">
            <svg className="h-4 w-4 shrink-0 text-amber-500" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 3a.75.75 0 110 1.5A.75.75 0 018 4zm.75 3.75v4.5a.75.75 0 01-1.5 0v-4.5a.75.75 0 011.5 0z" /></svg>
            <p className="text-xs text-amber-700">Live keys process real transactions. Never expose them in client-side code or public repositories.</p>
          </div>
        )}

        <div className="divide-y divide-gray-50">
          {filtered.map((k) => {
            const isRevealed = revealed.includes(k.id);
            const isCopied = copied === k.id;
            return (
              <div key={k.id} className="px-5 py-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <p className="text-sm font-semibold text-gray-900">{k.name}</p>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${k.env === "live" ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-600"}`}>
                        {k.env}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <code className="rounded-lg bg-gray-50 px-3 py-1.5 font-mono text-xs text-gray-700 border border-gray-100">
                        {isRevealed ? k.key : maskKey(k.key)}
                      </code>
                    </div>
                    <p className="mt-2 text-[11px] text-gray-400">Created {k.created} · Last used {k.lastUsed} · {k.calls} calls</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button onClick={() => toggleReveal(k.id)} title={isRevealed ? "Hide" : "Reveal"} className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors">
                      {isRevealed ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                    <button onClick={() => copy(k.key, k.id)} title="Copy" className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors">
                      {isCopied ? <CheckCircle2 size={15} className="text-emerald-500" /> : <Copy size={15} />}
                    </button>
                    <button onClick={() => deleteKey(k.id)} title="Revoke" className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && <div className="py-10 text-center text-sm text-gray-400">No {tab} keys. Create one above.</div>}
        </div>
      </div>

      {/* Webhooks */}
      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
        <div className="flex items-center justify-between border-b border-gray-50 px-5 py-4">
          <div className="flex items-center gap-2">
            <Webhook size={16} className="text-gray-500" />
            <p className="text-sm font-semibold text-gray-900">Webhook endpoints</p>
          </div>
          <button className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50">
            <Plus size={12} /> Add endpoint
          </button>
        </div>
        <div className="divide-y divide-gray-50">
          {WEBHOOKS.map((w) => (
            <div key={w.id} className="px-5 py-4">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <code className="text-sm font-mono text-blue-600 truncate block">{w.url}</code>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {w.events.map((ev) => (
                      <span key={ev} className="rounded-md bg-gray-100 px-2 py-0.5 font-mono text-[10px] text-gray-600">{ev}</span>
                    ))}
                  </div>
                  <p className="mt-2 text-[11px] text-gray-400">Last delivery: {w.lastDelivery} · Success rate: {w.successRate}</p>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 shrink-0">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> Active
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Key Modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-bold text-gray-900">Create API key</h3>
              <button onClick={() => { setShowCreate(false); setCreatedKey(null); setNewKeyName(""); }} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100"><X size={16} /></button>
            </div>
            {createdKey ? (
              <div>
                <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-4 mb-4">
                  <p className="text-xs font-semibold text-emerald-700 mb-2">✓ Key created — copy it now. You won&apos;t see it again.</p>
                  <code className="block break-all rounded-lg bg-white border border-emerald-200 px-3 py-2 font-mono text-xs text-gray-800">{createdKey}</code>
                </div>
                <button onClick={() => copy(createdKey, "new")} className="w-full flex items-center justify-center gap-2 rounded-xl border border-gray-200 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  {copied === "new" ? <><CheckCircle2 size={14} className="text-emerald-500" /> Copied!</> : <><Copy size={14} /> Copy to clipboard</>}
                </button>
              </div>
            ) : (
              <form onSubmit={createKey} className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-700">Key name <span className="text-red-400">*</span></label>
                  <input required value={newKeyName} onChange={(e) => setNewKeyName(e.target.value)} placeholder="e.g. Production — Mobile App"
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20" />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-medium text-gray-700">Environment</label>
                  <div className="flex gap-2">
                    {(["test", "live"] as const).map((e) => (
                      <button key={e} type="button" onClick={() => setNewKeyEnv(e)}
                        className={`flex-1 rounded-xl border py-2.5 text-sm font-medium capitalize transition-all ${newKeyEnv === e ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 text-gray-600"}`}>
                        {e}
                      </button>
                    ))}
                  </div>
                </div>
                {newKeyEnv === "live" && <p className="text-xs text-amber-600 bg-amber-50 rounded-lg px-3 py-2">Live keys have access to real data and transactions. Treat them as passwords.</p>}
                <button type="submit" disabled={creating} className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-70">
                  {creating ? <><svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Creating...</> : "Create key"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </PageShell>
  );
}
