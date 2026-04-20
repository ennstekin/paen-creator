import type { Metadata } from "next";
import { HeroSection } from "@/components/landing/hero-section";
import { BenefitsSection } from "@/components/landing/benefits-section";
import { VideoSection } from "@/components/landing/video-section";
import { FaqSection } from "@/components/landing/faq-section";
import { ApplicationForm } from "@/components/landing/application-form";
import { Footer } from "@/components/landing/footer";

export const metadata: Metadata = {
  title: "PAEN - Influencer İşbirliği Programı",
  description:
    "PAEN ile işbirliği yap, modayı birlikte şekillendir. Influencer başvuru programımıza katıl.",
};

export default function InfluencerLandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <BenefitsSection />
      <ApplicationForm />
      <VideoSection />
      <div className="max-w-xl mx-auto px-5 sm:px-6">
        <hr className="border-neutral-200" />
      </div>
      <FaqSection />
      <Footer />
    </div>
  );
}
