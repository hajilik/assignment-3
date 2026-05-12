"use client";

import { useState } from "react";
import { CheckCircle2, Shield, Users, Bell, Lock, FileText } from "lucide-react";
import PageShell from "@/components/dashboard/PageShell";

const TABS = [
  { id: "profile", label: "Company profile", icon: FileText },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Lock },
  { id: "gdpr", label: "GDPR & Privacy", icon: Shield },
  { id: "team", label: "Team", icon: Users },
];

const TEAM = [
  { name: "Kənan H.", email: "k***@company.az", role: "Admin", joined: "2025-01-14", status: "active" },
  { name: "Leyla M.", email: "l***@company.az", role: "Developer", joined: "2025-02-01", status: "active" },
  { name: "Rauf T.", email: "r***@company.az", role: "Viewer", joined: "2025-03-10", status: "active" },
];

export default function SettingsPage() {
  const [tab, setTab] = useState("profile");
  const [saved, setSaved] = useState(false);
  const [twoFA, setTwoFA] = useState(false);
  const [notifs, setNotifs] = useState({ txn: true, cards: true, api: false, weekly: true, security: true });
  const [retention, setRetention] = useState("5");
  const [gdprSaved, setGdprSaved] = useState(false);

  const save = async () => {
    await new Promise((r) => setTimeout(r, 800));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const saveGdpr = async () => {
    await new Promise((r) => setTimeout(r, 800));
    setGdprSaved(true);
    setTimeout(() => setGdprSaved(false), 2500);
  };

  return (
    <PageShell title="Settings" subtitle="Manage your partner account preferences">
      <div className="grid gap-5 lg:grid-cols-[200px_1fr]">
        {/* Tab nav */}
        <nav className="flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible">
          {TABS.map((t) => {
            const Icon = t.icon;
            return (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-left whitespace-nowrap transition-all ${tab === t.id ? "bg-blue-600 text-white shadow-sm" : "text-gray-600 hover:bg-gray-100"}`}>
                <Icon size={15} /> {t.label}
              </button>
            );
          })}
        </nav>

        {/* Content */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          {/* Company profile */}
          {tab === "profile" && (
            <div className="space-y-5 max-w-lg">
              <h3 className="text-base font-bold text-gray-900 mb-1">Company profile</h3>
              {[
                { label: "Company name", placeholder: "Acme LLC", def: "MyFintech LLC" },
                { label: "Registration number", placeholder: "1234567890", def: "2204567891" },
                { label: "BaaS partner ID", placeholder: "", def: "partner_4xMr9kL", readOnly: true },
                { label: "Technical contact email", placeholder: "cto@company.az", def: "tech@myfintech.az" },
                { label: "Business website", placeholder: "https://", def: "https://myfintech.az" },
              ].map((f) => (
                <div key={f.label}>
                  <label className="mb-1.5 block text-xs font-medium text-gray-700">{f.label}</label>
                  <input defaultValue={f.def} readOnly={f.readOnly} placeholder={f.placeholder}
                    className={`w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition-all ${f.readOnly ? "bg-gray-50 text-gray-400 cursor-not-allowed" : "focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"}`} />
                  {f.readOnly && <p className="mt-1 text-[11px] text-gray-400">Read-only — assigned by Unibank BaaS</p>}
                </div>
              ))}
              <button onClick={save} className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors">
                {saved ? <><CheckCircle2 size={15} /> Saved!</> : "Save changes"}
              </button>
            </div>
          )}

          {/* Notifications */}
          {tab === "notifications" && (
            <div className="space-y-4 max-w-lg">
              <h3 className="text-base font-bold text-gray-900 mb-1">Notification preferences</h3>
              {[
                { key: "txn" as const, label: "Transaction alerts", sub: "Notify on failed or high-value transactions" },
                { key: "cards" as const, label: "Card events", sub: "Card freeze, cancellation and limit alerts" },
                { key: "api" as const, label: "API error alerts", sub: "Error rate spikes above 1%" },
                { key: "weekly" as const, label: "Weekly digest", sub: "Summary of volume, top merchants and KPIs" },
                { key: "security" as const, label: "Security events", sub: "New logins, key creation and policy changes" },
              ].map((n) => (
                <div key={n.key} className="flex items-center justify-between rounded-xl border border-gray-100 p-4">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{n.label}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{n.sub}</p>
                  </div>
                  <button onClick={() => setNotifs((prev) => ({ ...prev, [n.key]: !prev[n.key] }))}
                    className={`relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors ${notifs[n.key] ? "bg-blue-600" : "bg-gray-200"}`}>
                    <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform mt-0.5 ${notifs[n.key] ? "translate-x-5" : "translate-x-0.5"}`} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Security */}
          {tab === "security" && (
            <div className="space-y-5 max-w-lg">
              <h3 className="text-base font-bold text-gray-900 mb-1">Security settings</h3>
              <div className="rounded-xl border border-gray-100 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-800">Two-factor authentication</p>
                    <p className="text-xs text-gray-500 mt-0.5">Require 2FA for all admin actions</p>
                  </div>
                  <button onClick={() => setTwoFA(!twoFA)}
                    className={`relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors ${twoFA ? "bg-blue-600" : "bg-gray-200"}`}>
                    <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform mt-0.5 ${twoFA ? "translate-x-5" : "translate-x-0.5"}`} />
                  </button>
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Change password</p>
                {["Current password", "New password", "Confirm new password"].map((l) => (
                  <div key={l}>
                    <label className="mb-1.5 block text-xs font-medium text-gray-700">{l}</label>
                    <input type="password" placeholder="••••••••" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20" />
                  </div>
                ))}
                <button className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors">Update password</button>
              </div>
              <div className="rounded-xl border border-gray-100 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-3">Active sessions</p>
                {[
                  { device: "MacBook Pro — Chrome", location: "Baku, AZ", time: "Now", current: true },
                  { device: "iPhone 15 — Safari", location: "Baku, AZ", time: "1 hr ago", current: false },
                ].map((s) => (
                  <div key={s.device} className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-sm font-medium text-gray-800">{s.device}</p>
                      <p className="text-xs text-gray-400">{s.location} · {s.time}</p>
                    </div>
                    {s.current ? <span className="text-xs text-emerald-600 font-medium">Current</span> : <button className="text-xs text-red-500 hover:text-red-700">Revoke</button>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* GDPR */}
          {tab === "gdpr" && (
            <div className="space-y-5 max-w-xl" id="gdpr">
              <h3 className="text-base font-bold text-gray-900">GDPR & Privacy settings</h3>
              <div className="rounded-xl bg-blue-50 border border-blue-100 p-4 text-xs text-blue-700">
                <p className="font-semibold mb-1">Your obligations as a data processor</p>
                <p>As a BaaS partner of Unibank, you act as a Data Processor under GDPR. You are responsible for ensuring your end-users&apos; personal data is processed lawfully, with appropriate safeguards, and only for the purposes outlined in your Data Processing Agreement (DPA).</p>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-700">Data Protection Officer (DPO) name</label>
                <input defaultValue="Nərmin Əliyeva" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-700">DPO contact email</label>
                <input defaultValue="dpo@myfintech.az" type="email" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-700">Data retention period</label>
                <select value={retention} onChange={(e) => setRetention(e.target.value)} className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20">
                  <option value="1">1 year</option>
                  <option value="3">3 years</option>
                  <option value="5">5 years (recommended)</option>
                  <option value="7">7 years (regulatory minimum)</option>
                </select>
                <p className="mt-1 text-[11px] text-gray-400">Data older than this period will be automatically anonymised.</p>
              </div>
              <div className="rounded-xl border border-gray-100 p-4 space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Privacy controls</p>
                {[
                  { label: "Mask personal data in dashboard", sub: "Show initials and masked emails — recommended", def: true },
                  { label: "Audit log for data access", sub: "Log all access to personal data exports", def: true },
                  { label: "Cookie consent banner", sub: "Show GDPR cookie banner to your end-users", def: true },
                ].map((c) => (
                  <div key={c.label} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-800">{c.label}</p>
                      <p className="text-[11px] text-gray-500">{c.sub}</p>
                    </div>
                    <div className={`relative inline-flex h-5 w-9 shrink-0 rounded-full ${c.def ? "bg-blue-600" : "bg-gray-200"}`}>
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow mt-0.5 ${c.def ? "translate-x-4" : "translate-x-0.5"}`} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="rounded-xl border border-gray-100 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-3">Data Processing Agreement</p>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                    <FileText size={18} className="text-gray-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">DPA — Unibank BaaS × MyFintech LLC</p>
                    <p className="text-xs text-gray-400">Signed 2025-01-14 · Version 2.1</p>
                  </div>
                  <button className="ml-auto text-xs text-blue-600 hover:text-blue-700 font-medium">Download</button>
                </div>
              </div>
              <button onClick={saveGdpr} className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">
                {gdprSaved ? <><CheckCircle2 size={15} /> Saved!</> : "Save GDPR settings"}
              </button>
            </div>
          )}

          {/* Team */}
          {tab === "team" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-gray-900">Team members</h3>
                <button className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                  + Invite member
                </button>
              </div>
              <div className="rounded-xl border border-gray-100 overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      {["Member", "Role", "Joined", "Status", ""].map((h) => (
                        <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-400">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {TEAM.map((m) => (
                      <tr key={m.email} className="hover:bg-gray-50/40">
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-2.5">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">{m.name[0]}</div>
                            <div>
                              <p className="text-sm font-medium text-gray-800">{m.name}</p>
                              <p className="text-[11px] text-gray-400">{m.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3.5">
                          <select defaultValue={m.role} className="rounded-lg border border-gray-200 px-2 py-1 text-xs text-gray-700 outline-none">
                            {["Admin", "Developer", "Viewer"].map((r) => <option key={r}>{r}</option>)}
                          </select>
                        </td>
                        <td className="px-4 py-3.5 text-sm text-gray-500">{m.joined}</td>
                        <td className="px-4 py-3.5"><span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700"><div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />Active</span></td>
                        <td className="px-4 py-3.5 text-right"><button className="text-xs text-red-500 hover:text-red-700">Remove</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-400">GDPR: Team member data is stored as part of your partner account. Members may request data deletion by contacting your DPO.</p>
            </div>
          )}
        </div>
      </div>
    </PageShell>
  );
}
