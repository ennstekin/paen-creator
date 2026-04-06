import type { Metadata } from "next";
import { HeroSection } from "@/components/landing/hero-section";
import { BenefitsSection } from "@/components/landing/benefits-section";
import { ApplicationForm } from "@/components/landing/application-form";
import { Footer } from "@/components/landing/footer";
import { VideoShowcase } from "@/components/landing/video-showcase";

export const metadata: Metadata = {
  title: "PAEN - Influencer İş Birliği Programı",
  description:
    "PAEN ile iş birliği yap, modayı birlikte şekillendir. Influencer başvuru programımıza katıl.",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <VideoShowcase />
      <BenefitsSection />
      <ApplicationForm />
      <Footer />
    </div>
  );
}
