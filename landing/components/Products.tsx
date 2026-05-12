"use client";

import { motion } from "framer-motion";
import {
  CreditCard,
  Zap,
  ArrowLeftRight,
  TrendingUp,
  ShoppingCart,
  BarChart3,
} from "lucide-react";

const products = [
  {
    icon: CreditCard,
    color: "from-blue-500 to-blue-600",
    bg: "bg-blue-50",
    title: "Card Issuing",
    description:
      "Issue full-featured virtual and physical cards that work everywhere — POS, online, ATM — with Google Pay and Apple Pay support built in.",
    tag: "Kart buraxılışı",
  },
  {
    icon: Zap,
    color: "from-violet-500 to-violet-600",
    bg: "bg-violet-50",
    title: "Payments",
    description:
      "Let your customers pay directly through your app. Accelerate checkout and open new revenue channels without building payment infrastructure.",
    tag: "Ödənişlər",
  },
  {
    icon: ArrowLeftRight,
    color: "from-indigo-500 to-indigo-600",
    bg: "bg-indigo-50",
    title: "Transfers",
    description:
      "Enable peer-to-peer and inter-account money movement. Become the center of your customers' financial activity.",
    tag: "Köçürmələr",
  },
  {
    icon: TrendingUp,
    color: "from-emerald-500 to-emerald-600",
    bg: "bg-emerald-50",
    title: "Lending",
    description:
      "Offer credit products with configurable limits, terms, and repayment schedules. Give customers the purchasing power they need, when they need it.",
    tag: "Kredit",
  },
  {
    icon: ShoppingCart,
    color: "from-orange-500 to-orange-600",
    bg: "bg-orange-50",
    title: "BNPL",
    description:
      "Buy now, pay later — split any purchase into installments at the point of sale. Increase conversion and average order value for your merchants.",
    tag: "İndi al, sonra ödə",
  },
  {
    icon: BarChart3,
    color: "from-rose-500 to-rose-600",
    bg: "bg-rose-50",
    title: "Reporting & Reconciliation",
    description:
      "Real-time dashboards, transaction analytics, and automated reconciliation tools — everything your finance team needs in one place.",
    tag: "Hesabat",
  },
];

export default function Products() {
  return (
    <section id="products" className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-2xl"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-600">
            Products
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Everything you need to build a financial product
          </h2>
          <p className="mt-4 text-lg text-gray-500 leading-relaxed">
            One integration. One API. A full suite of banking capabilities embedded directly into your product experience.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, i) => {
            const Icon = product.icon;
            return (
              <motion.div
                key={product.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:border-blue-100 hover:shadow-lg"
              >
                {/* Icon */}
                <div
                  className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${product.color} shadow-sm`}
                >
                  <Icon className="h-6 w-6 text-white" />
                </div>

                {/* Tag */}
                <span className="mb-2 inline-block rounded-full bg-gray-50 px-2.5 py-0.5 text-[11px] font-medium text-gray-500">
                  {product.tag}
                </span>

                <h3 className="mb-2 text-lg font-semibold text-gray-900">{product.title}</h3>
                <p className="text-sm leading-relaxed text-gray-500">{product.description}</p>

                {/* Hover arrow */}
                <div className="mt-5 flex items-center gap-1 text-xs font-medium text-blue-600 opacity-0 transition-opacity group-hover:opacity-100">
                  Learn more
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
