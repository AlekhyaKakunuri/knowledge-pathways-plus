import { useState, useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import PopularBlogsSection from "@/components/PopularBlogsSection";
import CoursesSection from "@/components/CoursesSection";
import TrustSection from "@/components/TrustSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import JourneySection from "@/components/JourneySection";
import ExpertsSection from "@/components/ExpertsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import CalendlyBooking from "@/components/CalendlyBooking";

const Index = () => {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  useEffect(() => {
    // Listen for the openCalendly event from HeroSection
    const handleOpenCalendly = () => {
      setIsCalendlyOpen(true);
    };

    window.addEventListener('openCalendly', handleOpenCalendly);

    return () => {
      window.removeEventListener('openCalendly', handleOpenCalendly);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <HeroSection />
        <FeaturesSection />
        <PopularBlogsSection />
        <CoursesSection />
        <TrustSection />
        <HowItWorksSection />
        <JourneySection />
        <ExpertsSection />
        <CTASection />
      </main>

      <Footer />

      {/* Calendly Booking Modal */}
      <CalendlyBooking 
        isOpen={isCalendlyOpen} 
        onClose={() => setIsCalendlyOpen(false)} 
      />
    </div>
  );
};

export default Index;
