"use client";

import { motion } from "framer-motion";
import {
  Smartphone,
  Store,
  Briefcase,
  Wallet,
  Building2,
  ShoppingBag,
  Nfc,
} from "lucide-react";

const cases = [
  {
    icon: Smartphone,
    title: "Fintech app",
    description: "Launch a full-featured financial app with cards, payments, and account management — without a banking license.",
    gradient: "from-blue-600 to-indigo-600",
    light: "bg-blue-50 text-blue-700",
  },
  {
    icon: Store,
    title: "Marketplace",
    description: "Collect payments from buyers, disburse to sellers instantly. Embed financial flows directly into your marketplace.",
    gradient: "from-violet-600 to-purple-600",
    light: "bg-violet-50 text-violet-700",
  },
  {
    icon: Briefcase,
    title: "Payroll / EWA",
    description: "Enable earned wage access so employees can withdraw accrued pay before payday — reducing financial stress and churn.",
    gradient: "from-emerald-600 to-teal-600",
    light: "bg-emerald-50 text-emerald-700",
  },
  {
    icon: Wallet,
    title: "Wallet & loyalty",
    description: "Turn your loyalty program into a real spending account. Issue co-branded cards and let customers redeem points as cash.",
    gradient: "from-orange-500 to-rose-500",
    light: "bg-orange-50 text-orange-700",
  },
  {
    icon: Building2,
    title: "Merchant financing",
    description: "Offer revenue-based or term lending to your merchants. Underwrite from your own transaction data — no manual underwriting.",
    gradient: "from-teal-600 to-cyan-600",
    light: "bg-teal-50 text-teal-700",
  },
  {
    icon: ShoppingBag,
    title: "Checkout installments",
    description: "Add BNPL at checkout. Customers split any purchase into 3–12 installments. You get paid in full, upfront.",
    gradient: "from-rose-600 to-pink-600",
    light: "bg-rose-50 text-rose-700",
  },
  {
    icon: Nfc,
    title: "Google / Apple Pay",
    description: "Your issued cards are instantly payable via NFC. Customers add cards to their phone and pay with a tap — everywhere.",
    gradient: "from-gray-700 to-gray-900",
    light: "bg-gray-100 text-gray-700",
  },
];

export default function UseCases() {
  return (
    <section id="use-cases" className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-600">
            Use cases
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Built for any business that moves money
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-gray-500">
            Whether you are a startup or an established platform, BaaS adds financial superpowers to your existing product.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cases.map((item, i) => {
            const Icon = item.icon;
            // Last item spans 2 cols on lg to center it if grid has odd count
            const isLast = i === cases.length - 1;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className={`group relative overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 p-6 transition-all duration-300 hover:border-transparent hover:shadow-xl ${
                  isLast ? "sm:col-span-1 lg:col-span-2 lg:col-start-2" : ""
                }`}
              >
                {/* Gradient overlay on hover */}
                <div
                  className={`absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-br ${item.gradient}`}
                />

                <div className="relative">
                  {/* Icon */}
                  <div className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl ${item.light} transition-all duration-300 group-hover:bg-white/20`}>
                    <Icon className="h-5 w-5 transition-colors duration-300 group-hover:text-white" />
                  </div>

                  <h3 className="mb-2 font-semibold text-gray-900 transition-colors duration-300 group-hover:text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-500 transition-colors duration-300 group-hover:text-white/80">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
