"use client";

import { motion } from "framer-motion";
import { Webhook, FileCode2, BookOpen, Terminal } from "lucide-react";

const features = [
  {
    icon: FileCode2,
    title: "REST APIs",
    desc: "Clean, versioned endpoints with predictable response shapes and OpenAPI specs.",
  },
  {
    icon: Webhook,
    title: "Webhooks",
    desc: "Real-time event notifications for every transaction, card state change, and repayment.",
  },
  {
    icon: Terminal,
    title: "SDKs",
    desc: "Official SDKs for Node.js, Python, and Go — with type-safe models and retry logic built in.",
  },
  {
    icon: BookOpen,
    title: "Docs & sandbox",
    desc: "Comprehensive documentation, interactive API explorer, and a full sandbox environment.",
  },
];

const codeLines = [
  { tokens: [{ t: "POST ", c: "text-blue-400" }, { t: "/v1/cards/issue", c: "text-white" }] },
  { tokens: [{ t: "Authorization: ", c: "text-gray-500" }, { t: "Bearer ", c: "text-gray-400" }, { t: "sk_live_••••••••", c: "text-yellow-400" }] },
  { tokens: [] },
  { tokens: [{ t: "{", c: "text-gray-400" }] },
  { tokens: [{ t: '  "customer_id"', c: "text-blue-300" }, { t: ": ", c: "text-gray-500" }, { t: '"cust_4xMr9kL"', c: "text-green-400" }, { t: ",", c: "text-gray-500" }] },
  { tokens: [{ t: '  "product"', c: "text-blue-300" }, { t: ": ", c: "text-gray-500" }, { t: '"virtual"', c: "text-green-400" }, { t: ",", c: "text-gray-500" }] },
  { tokens: [{ t: '  "currency"', c: "text-blue-300" }, { t: ": ", c: "text-gray-500" }, { t: '"AZN"', c: "text-green-400" }] },
  { tokens: [{ t: "}", c: "text-gray-400" }] },
  { tokens: [] },
  { tokens: [{ t: "→ ", c: "text-emerald-400" }, { t: "200 OK", c: "text-emerald-300" }] },
  { tokens: [{ t: "{", c: "text-gray-400" }] },
  { tokens: [{ t: '  "card_id"', c: "text-blue-300" }, { t: ": ", c: "text-gray-500" }, { t: '"card_7yNk3pX"', c: "text-green-400" }, { t: ",", c: "text-gray-500" }] },
  { tokens: [{ t: '  "status"', c: "text-blue-300" }, { t: ": ", c: "text-gray-500" }, { t: '"active"', c: "text-yellow-400" }, { t: ",", c: "text-gray-500" }] },
  { tokens: [{ t: '  "network"', c: "text-blue-300" }, { t: ": ", c: "text-gray-500" }, { t: '"Visa"', c: "text-purple-400" }] },
  { tokens: [{ t: "}", c: "text-gray-400" }] },
];

export default function DeveloperTeaser() {
  return (
    <section id="developers" className="bg-[#0d1117] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-400">
              For developers
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              APIs designed for
              <br />
              <span className="text-blue-400">speed and clarity</span>
            </h2>
            <p className="mt-4 text-lg text-gray-400 leading-relaxed">
              Integrate in days, not months. Our developer experience is first-class — from typed SDKs to real-time webhooks and comprehensive docs.
            </p>

            {/* Features */}
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <motion.div
                    key={f.title}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="flex gap-3"
                  >
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/10">
                      <Icon className="h-4 w-4 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{f.title}</p>
                      <p className="mt-0.5 text-xs leading-relaxed text-gray-500">{f.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="mt-10 flex items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-gray-400 cursor-not-allowed opacity-60">
                Explore sandbox
                <span className="rounded-full bg-blue-500/20 px-2 py-0.5 text-[10px] font-semibold text-blue-400">
                  Coming soon
                </span>
              </span>
              <a
                href="#contact"
                className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
              >
                Get API access →
              </a>
            </div>
          </motion.div>

          {/* Right: Code card */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="overflow-hidden rounded-2xl border border-white/8 bg-[#161b22] shadow-2xl">
              {/* Code header */}
              <div className="flex items-center justify-between border-b border-white/5 px-5 py-3.5">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500/60" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
                  <div className="h-3 w-3 rounded-full bg-green-500/60" />
                </div>
                <span className="font-mono text-[11px] text-gray-600">cards.ts — Unibank BaaS SDK</span>
                <div className="h-4 w-12 rounded bg-white/5" />
              </div>

              {/* Code body */}
              <div className="p-5 font-mono text-[12.5px] leading-6">
                {codeLines.map((line, i) => (
                  <div key={i} className="flex">
                    <span className="mr-4 w-5 text-right text-gray-700 select-none">{i + 1}</span>
                    <span>
                      {line.tokens.length === 0 ? (
                        <span>&nbsp;</span>
                      ) : (
                        line.tokens.map((token, j) => (
                          <span key={j} className={token.c}>
                            {token.t}
                          </span>
                        ))
                      )}
                    </span>
                  </div>
                ))}
              </div>

              {/* Status bar */}
              <div className="flex items-center justify-between border-t border-white/5 px-5 py-2.5">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span className="text-[10px] text-gray-600">Connected to sandbox</span>
                </div>
                <span className="text-[10px] text-gray-700">TypeScript</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
