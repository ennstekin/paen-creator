import type { ReactNode } from "react";

const INSTAGRAM_URL = "https://instagram.com/paencom";

const steps: { number: string; title: string; description: ReactNode }[] = [
  {
    number: "01",
    title: "Formu doldur",
    description: "Kullanıcı adını ve iletişim bilgilerini paylaş.",
  },
  {
    number: "02",
    title: "Biz sana dönelim",
    description: "Profilini inceleyip sana dönüş yapalım.",
  },
  {
    number: "03",
    title: "Hediyelerini seç",
    description: "Beğendiklerini seç, biz sana gönderelim.",
  },
  {
    number: "04",
    title: "İçeriğini paylaş",
    description: (
      <>
        Ürünlerimizi deneyimlediğin içeriğini paylaş.{" "}
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-neutral-900 hover:underline"
        >
          @paencom
        </a>
        &apos;u etiketlemeyi unutma.
      </>
    ),
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-14 sm:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-5 sm:px-6">
        <div className="mb-8 sm:mb-12">
          <p className="text-xs font-medium uppercase tracking-widest text-neutral-400">
            Nasıl işliyor?
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-6 left-[calc(50%+24px)] right-[calc(-50%+24px)] h-px bg-neutral-200" />
              )}
              <div className="text-center">
                <div className="inline-flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-neutral-900 text-white text-xs sm:text-sm font-bold">
                  {step.number}
                </div>
                <h3 className="mt-3 sm:mt-4 text-sm sm:text-base font-semibold text-neutral-900">
                  {step.title}
                </h3>
                <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-neutral-500 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
