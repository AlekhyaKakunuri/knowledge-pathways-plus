import { useState, useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ContentPreview from "@/components/ContentPreview";
import Footer from "@/components/Footer";
import CalendlyBooking from "@/components/CalendlyBooking";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Crown, Zap, Check } from "lucide-react";
import { Link } from "react-router-dom";

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
        <ContentPreview />
        
        {/* Call to Action Section */}
        <section className="py-20 bg-gradient-to-br from-muted/30 to-background">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Take Your Skills to the Next Level?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of developers who have transformed their careers with our comprehensive learning platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/pricing">
                <button className="px-8 py-3 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-lg hover:from-primary/90 hover:to-accent/90 transition-all duration-300 transform hover:scale-105">
                  View Pricing Plans
                </button>
              </a>
              <button 
                onClick={() => setIsCalendlyOpen(true)}
                className="px-8 py-3 bg-gradient-to-r from-premium to-accent text-premium-foreground font-semibold rounded-lg hover:from-premium/90 hover:to-accent/90 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Book Free Consultation
              </button>
            </div>
          </div>
        </section>
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
