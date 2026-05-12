import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/layout/HeroSection";
import HowItWorks from "@/components/layout/HowItWorks";
import FeaturesSection from "@/components/layout/FeaturesSection";
import CTASection from "@/components/layout/CTASection";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <HeroSection />

      <HowItWorks />

      <FeaturesSection />

      <CTASection />

      {/* <Footer /> */}
    </main>
  );
}