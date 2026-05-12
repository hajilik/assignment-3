"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Request & align",
    subtitle: "use case",
    description:
      "Tell us what you're building. We map your product goals to the right BaaS modules, agree on scope, and sign off on the technical alignment document.",
    detail: ["Discovery call", "Use-case mapping", "Technical brief", "NDA & agreement"],
  },
  {
    number: "02",
    title: "Integrate",
    subtitle: "via API",
    description:
      "Access our sandbox, connect your systems to our REST APIs and webhooks, and complete testing with support from our integration engineers.",
    detail: ["API keys & sandbox", "SDK / webhook setup", "QA & certification", "Staging sign-off"],
  },
  {
    number: "03",
    title: "Launch",
    subtitle: "& scale",
    description:
      "Go live, monitor transactions in your partner dashboard, and scale with confidence. Our team is available on a dedicated channel throughout.",
    detail: ["Production go-live", "Partner dashboard", "24/7 SLA support", "Growth review"],
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-gray-50 py-24 lg:py-32">
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
            How it works
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            From idea to live product
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-gray-500">
            A clear, structured process so you know exactly what to expect — from first conversation to production.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="absolute top-10 left-0 right-0 hidden h-px lg:block">
            <div className="mx-auto max-w-4xl">
              <div
                className="h-px w-full"
                style={{
                  background: "linear-gradient(90deg, transparent 0%, #2563eb40 20%, #2563eb40 80%, transparent 100%)",
                }}
              />
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative"
              >
                {/* Step number bubble */}
                <div className="relative mb-6 flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white shadow-md shadow-blue-600/30 ring-4 ring-gray-50">
                    {i + 1}
                  </div>
                  <div className="h-px flex-1 bg-blue-100 lg:hidden" />
                </div>

                {/* Card */}
                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                  <span className="text-xs font-mono text-gray-400">{step.number}</span>
                  <h3 className="mt-1 text-xl font-bold text-gray-900">
                    {step.title}{" "}
                    <span className="text-blue-600">{step.subtitle}</span>
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-500">{step.description}</p>

                  {/* Checklist */}
                  <ul className="mt-5 space-y-2">
                    {step.detail.map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-sm text-gray-600">
                        <div className="h-4 w-4 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                            <path d="M1.5 4l1.5 1.5L6.5 2.5" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-center shadow-xl shadow-blue-500/20"
        >
          <p className="text-lg font-semibold text-white">Ready to start your integration?</p>
          <p className="mt-1 text-sm text-blue-200">Average time from first call to sandbox access: 3–5 business days.</p>
          <a
            href="#contact"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-blue-600 shadow-sm transition-all hover:shadow-md active:scale-[0.98]"
          >
            Book a discovery call
          </a>
        </motion.div>
      </div>
    </section>
  );
}
