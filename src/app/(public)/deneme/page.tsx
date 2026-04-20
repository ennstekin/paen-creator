import { HeroSection } from "@/components/landing/hero-section";
import { BenefitsSection } from "@/components/landing/benefits-section";
import { FaqSection } from "@/components/landing/faq-section";
import { ApplicationForm } from "@/components/landing/application-form";
import { Footer } from "@/components/landing/footer";
import { VideoShowcase } from "@/components/landing/video-showcase";

export default function DenemePage() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <VideoShowcase />
      <BenefitsSection />
      <ApplicationForm />
      <div className="max-w-xl mx-auto px-5 sm:px-6">
        <hr className="border-neutral-200" />
      </div>
      <FaqSection />
      <Footer />
    </div>
  );
}
