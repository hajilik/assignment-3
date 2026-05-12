"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "İnteqrasiya prosesi necə başlayır?",
    a: "Prosesi başlatmaq üçün aşağıdakı contact formu doldurun. Komandamız 1–2 iş günü ərzində əlaqə saxlayır, istifadə ssenarinizi dəqiqləşdirir, texniki əhəmiyyəti müzakirə edir və növbəti addımları razılaşdırır. Heç bir öhdəlik tələb olunmur — sadəcə sizi daha yaxşı tanımaq istəyirik.",
  },
  {
    q: "Ortalama inteqrasiya timeline-ı nə qədərdir?",
    a: "Sadə tətbiqlər (məsələn, yalnız ödənişlər) üçün 4–6 həftə; tam spektrli inteqrasiyalar (kart buraxılışı + kredit + BNPL) üçün 8–12 həftə. Sandboxdan istehsala keçiş isə adətən 3–5 iş günü çəkir. Texniki komandanızın hazırlığı sürəti birbaşa müəyyənləşdirir.",
  },
  {
    q: "Lending/BNPL üçün hansı texniki hazırlıq lazımdır?",
    a: "Əsas tələblər bunlardır: müştəri KYC məlumatlarının API vasitəsilə ötürülməsi, kredit qiymətləndirmə üçün razılaşdırılmış məlumat axını (mövcud skoring modelinizi istifadə edə bilərsiniz), ödəniş bildirişləri üçün webhook listener, TLS 1.2+ dəstəyi və GDPR-uyğun müştəri razılığı axını. Əlavə tələblər ssenaridən asılı olaraq müzakirə edilir.",
  },
  {
    q: "Qiymətləndirmə necə işləyir?",
    a: "Qiymətlər əqd həcminizə, seçdiyiniz məhsul dəstinə və inteqrasiya dərinliyinə görə fərqlənir. Standart açıq tarif siyahımız yoxdur — hər partnerlə ayrıca müzakirə aparılır. Bizimlə əlaqə saxlayın, sizə müvafiq kommersiya modelini təqdim edərik.",
  },
  {
    q: "Sandbox nə vaxt əlçatan olacaq?",
    a: "Sandbox platforması hazırda aktiv inkişaf mərhələsindədir. Erkən giriş üçün öz sahənizi qeyd edərək formu doldurun — sizi növbəti partnyorlar arasında saxlayırıq. Gözlənilən tarix: 2025-ci ilin 3-cü rübü.",
  },
  {
    q: "Texniki dəstək kanalınız nədir?",
    a: "Bütün aktiv partnerlər üçün xüsusi Slack kanalı, email dəstəyi (SLA əsaslı) və aylıq texniki icmal görüşü təmin edirik. Kritik hadisələr üçün ayrıca eskalasiya proseduru mövcuddur. Onboarding ərzində həmçinin istifadəçi tərəfindən seçilmiş inteqrasiya mühəndisi təyin olunur.",
  },
  {
    q: "Texniki komanda nə hazırlamalıdır?",
    a: "Hazırlıq üçün tövsiyə olunan siyahı: REST API integrasiyası üçün developer resursları, webhook işləmə imkanı (HTTPS endpoint), müştəri KYC axını (onboarding), güclü autentifikasiya (OAuth2 / API key idarəetməsi), TLS 1.2+ infrastruktur dəstəyi və texniki əlaqə şəxsi (ünsiyyət üçün).",
  },
  {
    q: "Mövcud core banking sistemi ilə inteqrasiya mümkündürmü?",
    a: "Bəli. Middleware adapter arxitekturasından istifadə edirik ki, bu da BaaS layerini mövcud core banking sisteminizlə — Temenos, Finastra, müxtəlif yerli həllər daxil olmaqla — əlaqələndirməyə imkan verir. Texniki detallar kəşf görüşündə müzakirə edilir.",
  },
  {
    q: "Kart Google Pay / Apple Pay-ə necə əlavə olunur?",
    a: "Kart buraxılışından sonra end-user SDK vasitəsilə tokenaizasiya prosesini başladır. BaaS layeri bütün şəbəkə kommunikasiyasını həll edir. Partnerin yalnız mobil tətbiqinə SDK-nı inteqrasiya etməsi kifayətdir; mürəkkəb EMV tokenaizasiyasını biz idarə edirik.",
  },
  {
    q: "Hansı ölkələrdə xidmət göstərirsiniz?",
    a: "Hazırda Azərbaycan bazarında tam əməliyyat lisenziyası ilə fəaliyyət göstəririk. Regionallaşma yol xəritəsi müzakirəsinə açığıq; ətraflı məlumat üçün bizimlə əlaqə saxlayın.",
  },
];

function FAQItem({ q, a, isOpen, onClick }: { q: string; a: string; isOpen: boolean; onClick: () => void }) {
  return (
    <div className="border-b border-gray-100 last:border-b-0">
      <button
        onClick={onClick}
        className="flex w-full items-start justify-between gap-4 py-5 text-left transition-colors hover:text-gray-900"
        aria-expanded={isOpen}
      >
        <span className="text-base font-medium text-gray-800">{q}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="mt-0.5 shrink-0 text-gray-400"
        >
          <ChevronDown size={18} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-relaxed text-gray-500">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-gray-50 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
          {/* Left: sticky heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-24 lg:self-start"
          >
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-600">FAQ</p>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Tez-tez soruşulan suallar
            </h2>
            <p className="mt-4 text-gray-500">
              Cavab tapa bilmədiyiniz halda bizimlə əlaqə saxlayın — komandamız kömək etmək üçün buradayır.
            </p>
            <a
              href="#contact"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700"
            >
              Əlaqə saxlayın
            </a>
          </motion.div>

          {/* Right: accordion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-2xl border border-gray-100 bg-white px-6 shadow-sm"
          >
            {faqs.map((item, i) => (
              <FAQItem
                key={i}
                q={item.q}
                a={item.a}
                isOpen={openIndex === i}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
