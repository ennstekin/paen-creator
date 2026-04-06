"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "En az kaç takipçi gerekiyor?",
    answer:
      "Net bir sayı yok. Aktif bir hesabın varsa başvurabilirsin.",
  },
  {
    question: "Ne tür içerik bekliyorsunuz?",
    answer:
      "Reels, TikTok videosu, story, post — format sana kalmış. Tek beklentimiz ürünün görünmesi.",
  },
  {
    question: "Para kazanıyor muyum bundan?",
    answer:
      "Hayır, bu komisyon modeli değil. Sen ürün alıyorsun, biz içerik alıyoruz.",
  },
  {
    question: "İçeriği onaya göndermem gerekiyor mu?",
    answer:
      "Hayır. Paylaşmadan önce onay istemiyoruz. Tarzına güveniyoruz.",
  },
  {
    question: "Başvurduktan sonra ne kadar sürede dönüş alırım?",
    answer:
      "Genelde aynı gün dönüş yapıyoruz. Yoğun dönemlerde en fazla 2 iş günü.",
  },
];

function FaqItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-neutral-200 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-3 sm:py-4 text-left"
      >
        <span className="text-sm sm:text-base font-medium text-neutral-900 pr-4">
          {question}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-neutral-400 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>
      <div
        className={cn(
          "grid transition-all duration-200",
          open ? "grid-rows-[1fr] pb-4 sm:pb-5" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <p className="text-sm sm:text-base text-neutral-500 leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
}

export function FaqSection() {
  return (
    <section className="py-10 sm:py-16 bg-white">
      <div className="max-w-xl mx-auto px-5 sm:px-6">
        <p className="text-xs font-medium uppercase tracking-widest text-neutral-400 mb-5">
          Sık sorulanlar
        </p>
        <div className="divide-y divide-neutral-100">
          {faqs.map((faq) => (
            <FaqItem key={faq.question} {...faq} />
          ))}
        </div>
      </div>
    </section>
  );
}
