import type { ReactNode } from "react";
import { Gift, Camera, Users, Repeat } from "lucide-react";

const INSTAGRAM_URL = "https://instagram.com/paencom";

const benefits: { icon: typeof Gift; title: string; description: ReactNode }[] = [
  {
    icon: Gift,
    title: "Ürünler sana gelsin",
    description: "Beğendiğin parçaları seç, adresine gönderelim.",
  },
  {
    icon: Camera,
    title: "Brifing yok, tarz senin",
    description: (
      <>
        Tarzına ve içeriğine güveniyoruz,{" "}
        <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="font-medium text-neutral-900 hover:underline">
          @paencom
        </a>
        &apos;u etiketlemen yeterli.
      </>
    ),
  },
  {
    icon: Users,
    title: "Takipçi sayın önemli değil",
    description: "500 de olur 50.000 de. İçeriğin ve tarzın bize uyuyorsa yeter.",
  },
  {
    icon: Repeat,
    title: "Tek seferlik değil",
    description: "Sürekli iş birliği. Her sezon yeni ürünler gönderiyoruz.",
  },
];

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
        <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="font-medium text-neutral-900 hover:underline">
          @paencom
        </a>
        &apos;u etiketlemeyi unutma.
      </>
    ),
  },
];

export function BenefitsSection() {
  return (
    <>
    <section className="py-14 sm:py-24 bg-neutral-50">
      <div className="max-w-5xl mx-auto px-5 sm:px-6">

        {/* Benefits */}
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl font-bold text-neutral-900">
            İçerik üreticimiz olmak ister misin?
          </h2>
        </div>

        <div className="flex sm:grid sm:grid-cols-2 gap-4 sm:gap-6 overflow-x-auto pb-2 sm:pb-0 snap-x snap-mandatory -mx-5 sm:mx-0 px-5 sm:px-0 scrollbar-hide">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="group shrink-0 w-[75vw] sm:w-auto snap-start rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 transition-all hover:shadow-md hover:border-neutral-300"
            >
              <div className="inline-flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-neutral-100 text-neutral-600 group-hover:bg-neutral-900 group-hover:text-white transition-colors">
                <benefit.icon className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <h3 className="mt-4 sm:mt-5 text-base sm:text-lg font-semibold text-neutral-900">
                {benefit.title}
              </h3>
              <p className="mt-1.5 sm:mt-2 text-sm sm:text-base text-neutral-500 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>

    <section className="py-14 sm:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-5 sm:px-6">

        {/* How it works */}
        <div className="mb-8 sm:mb-12">
          <p className="text-xs font-medium uppercase tracking-widest text-neutral-400">
            Nasıl işliyor?
          </p>
        </div>

        <div className="flex lg:grid lg:grid-cols-4 gap-6 sm:gap-8 overflow-x-auto pb-2 lg:pb-0 snap-x snap-mandatory -mx-5 sm:-mx-6 lg:mx-0 px-5 sm:px-6 lg:px-0 scrollbar-hide">
          {steps.map((step, index) => (
            <div key={step.number} className="relative shrink-0 w-[55vw] sm:w-[35vw] lg:w-auto snap-start">
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
    </>
  );
}
