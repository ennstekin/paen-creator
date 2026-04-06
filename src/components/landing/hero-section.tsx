export function HeroSection() {
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
            className="inline-flex h-14 sm:h-16 items-center justify-center rounded-full bg-neutral-900 px-10 sm:px-14 text-base sm:text-lg font-semibold text-white transition-colors hover:bg-neutral-800 active:scale-[0.98]"
          >
            Başvur
          </a>
        </div>

      </div>
    </section>
  );
}
