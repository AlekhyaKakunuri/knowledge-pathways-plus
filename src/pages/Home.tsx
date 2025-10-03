import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import PopularBlogsSection from '@/components/PopularBlogsSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import JourneySection from '@/components/JourneySection';
import CalendlyBooking from '@/components/CalendlyBooking';

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <PopularBlogsSection />
        <HowItWorksSection />
        <JourneySection />
        <CalendlyBooking />
      </main>
      <Footer />
    </div>
  );
};

export default Home;

