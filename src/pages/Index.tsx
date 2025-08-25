import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ContentPreview from "@/components/ContentPreview";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <ContentPreview />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
