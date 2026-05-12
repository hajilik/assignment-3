"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const roles = ["CTO", "CPO", "CEO", "Business Development", "Product Manager", "Developer", "Other"];

const productOptions = [
  { id: "card_issuing", label: "Card Issuing" },
  { id: "payments", label: "Payments" },
  { id: "transfers", label: "Transfers" },
  { id: "lending", label: "Lending" },
  { id: "bnpl", label: "BNPL" },
];

interface FormData {
  company: string;
  fullName: string;
  role: string;
  email: string;
  products: string[];
  message: string;
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p className="mt-1.5 flex items-center gap-1 text-xs text-red-500">
      <AlertCircle size={11} />
      {msg}
    </p>
  );
}

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { products: [] },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || "http://localhost:5678/webhook-test/baas-lead-intake";
      if (webhookUrl) {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            company: data.company,
            fullName: data.fullName,
            role: data.role,
            email: data.email,
            products: data.products,
            message: data.message,
            submittedAt: new Date().toISOString(),
            source: "baas-landing",
          }),
        });
      } else {
        await new Promise((r) => setTimeout(r, 1200));
      }
    } catch {
      // Don't block submission on webhook errors
    }
    setLoading(false);
    setSubmitted(true);
  };

  const inputCls = (hasError?: boolean) =>
    `w-full rounded-xl border px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all focus:ring-2 focus:ring-blue-500/30 ${
      hasError
        ? "border-red-300 bg-red-50/50 focus:border-red-400"
        : "border-gray-200 bg-white focus:border-blue-400"
    }`;

  return (
    <section id="contact" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50/50 to-white" />
      <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-blue-200/30 blur-[80px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.5fr]">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-600">
              Start integration
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Talk to our team
            </h2>
            <p className="mt-4 text-lg text-gray-500 leading-relaxed">
              Tell us about your product and what you want to build. We will get back to you within one business day.
            </p>

            {/* Trust signals */}
            <div className="mt-10 space-y-4">
              {[
                { title: "1–2 business day response", sub: "A real human reads every submission" },
                { title: "No commitment required", sub: "Discovery call only — no lock-in" },
                { title: "Dedicated integration engineer", sub: "Assigned from first call through go-live" },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2 2 4-4" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact details */}
            <div className="mt-10 border-t border-gray-200 pt-8">
              <p className="text-sm text-gray-500">
                Prefer email?{" "}
                <a href="mailto:baas@unibank.az" className="font-medium text-blue-600 hover:text-blue-700">
                  baas@unibank.az
                </a>
              </p>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-2xl border border-gray-100 bg-white p-8 shadow-xl shadow-gray-200/50"
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
                    <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Message received!</h3>
                  <p className="mt-2 max-w-sm text-sm text-gray-500">
                    Thank you for reaching out. Our team will review your submission and get back to you within 1–2 business days.
                  </p>
                  <div className="mt-6 rounded-xl bg-gray-50 p-4 text-left w-full">
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">What happens next</p>
                    {["Our team reviews your use case", "We schedule a discovery call", "You get API access within days"].map((s, i) => (
                      <div key={i} className="flex items-center gap-2 py-1">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-[10px] font-bold text-blue-600">{i + 1}</span>
                        <span className="text-xs text-gray-600">{s}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  className="space-y-5"
                >
                  {/* Row: Company + Name */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-gray-700">
                        Company name <span className="text-red-400">*</span>
                      </label>
                      <input
                        {...register("company", {
                          required: "Company name is required",
                          minLength: { value: 2, message: "At least 2 characters" },
                        })}
                        placeholder="Acme Inc."
                        className={inputCls(!!errors.company)}
                      />
                      <FieldError msg={errors.company?.message} />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-gray-700">
                        Full name <span className="text-red-400">*</span>
                      </label>
                      <input
                        {...register("fullName", { required: "Full name is required" })}
                        placeholder="Əli Hüseynov"
                        className={inputCls(!!errors.fullName)}
                      />
                      <FieldError msg={errors.fullName?.message} />
                    </div>
                  </div>

                  {/* Row: Role + Email */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-gray-700">
                        Role <span className="text-red-400">*</span>
                      </label>
                      <select
                        {...register("role", { required: "Please select your role" })}
                        className={`${inputCls(!!errors.role)} appearance-none`}
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select role
                        </option>
                        {roles.map((r) => (
                          <option key={r} value={r}>
                            {r}
                          </option>
                        ))}
                      </select>
                      <FieldError msg={errors.role?.message} />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-gray-700">
                        Email <span className="text-red-400">*</span>
                      </label>
                      <input
                        {...register("email", {
                          required: "Email is required",
                          pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email address" },
                        })}
                        type="email"
                        placeholder="ali@company.az"
                        className={inputCls(!!errors.email)}
                      />
                      <FieldError msg={errors.email?.message} />
                    </div>
                  </div>

                  {/* Products multi-select */}
                  <div>
                    <label className="mb-2 block text-xs font-medium text-gray-700">
                      Interested products
                    </label>
                    <Controller
                      name="products"
                      control={control}
                      render={({ field }) => (
                        <div className="flex flex-wrap gap-2">
                          {productOptions.map((opt) => {
                            const checked = field.value.includes(opt.id);
                            return (
                              <button
                                key={opt.id}
                                type="button"
                                onClick={() => {
                                  field.onChange(
                                    checked
                                      ? field.value.filter((v) => v !== opt.id)
                                      : [...field.value, opt.id]
                                  );
                                }}
                                className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                                  checked
                                    ? "border-blue-500 bg-blue-50 text-blue-700"
                                    : "border-gray-200 bg-white text-gray-600 hover:border-blue-300 hover:text-blue-600"
                                }`}
                              >
                                {opt.label}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-700">
                      Message{" "}
                      <span className="text-gray-400 font-normal">(optional)</span>
                    </label>
                    <textarea
                      {...register("message")}
                      rows={4}
                      placeholder="Tell us about your use case, expected volumes, or anything we should know..."
                      className={`${inputCls()} resize-none`}
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm shadow-blue-600/20 transition-all hover:bg-blue-700 hover:shadow-md active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      "Send message"
                    )}
                  </button>

                  <p className="text-center text-xs text-gray-400">
                    By submitting you agree to our{" "}
                    <a href="#" className="underline hover:text-gray-600">
                      Privacy Policy
                    </a>
                    .
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
