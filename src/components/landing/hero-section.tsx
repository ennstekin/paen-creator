"use client";

import { useEffect } from "react";

declare const gtag: (...args: unknown[]) => void;

function trackEvent(name: string, params?: Record<string, string>) {
  if (typeof gtag !== "undefined") {
    gtag("event", name, params);
  }
}

export function HeroSection() {
  useEffect(() => {
    const depths = [25, 50, 75, 100];
    const reached = new Set<number>();

    function onScroll() {
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight;
      const percent = Math.round((scrolled / total) * 100);

      for (const depth of depths) {
        if (percent >= depth && !reached.has(depth)) {
          reached.add(depth);
          trackEvent("scroll_depth", { depth: `${depth}%` });
        }
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-40" />

      <div className="relative max-w-5xl mx-auto px-5 sm:px-6 pt-14 sm:pt-20 pb-16 sm:pb-24 text-center">
        {/* Heading */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-neutral-900 leading-[1.15]">
          Kombinle, Üret, Paylaş.
        </h1>

        {/* Subheading */}
        <p className="mt-4 sm:mt-6 text-base sm:text-xl text-neutral-900 max-w-xl mx-auto leading-relaxed px-2">
          PAEN ürünlerini kombinle,<br />içerik üreticimiz ol!
        </p>

        {/* CTA */}
        <div className="mt-8 sm:mt-10">
          <a
            href="#basvuru"
            onClick={() => trackEvent("cta_click", { location: "hero" })}
            className="inline-flex h-14 sm:h-16 items-center justify-center rounded-full bg-neutral-900 px-10 sm:px-14 text-base sm:text-lg font-semibold text-white transition-colors hover:bg-neutral-800 active:scale-[0.98]"
          >
            Başvur
          </a>
        </div>

      </div>
    </section>
  );
}
