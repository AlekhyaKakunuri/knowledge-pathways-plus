import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import "@/styles/blog-content.css";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-white py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 px-4">
      <div className="container relative z-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-3 sm:space-y-4 md:space-y-6 text-center lg:text-left">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl font-bold leading-tight">
              <div className="hero-line-1">From Learning to <span className="text-theme-primary">Placement</span></div>
              <div className="hero-line-2">We're With You</div>
            </h1>
            <h2 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl font-semibold text-gray-700 leading-tight max-w-4xl mx-auto lg:mx-0 hero-subheadline">
              Learn, build, and get placed — build your AI career with AICareerX, backed by full refund policy.
            </h2>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start">
              <Link to="/courses">
                <Button size="lg" className="text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 bg-theme-primary hover:bg-theme-primary-hover text-white w-full sm:w-auto">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex justify-center lg:justify-end order-first lg:order-last">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-[420px] lg:h-[420px]">
              <img
                src="/heroSectionImg.jpg"
                alt="Professional collaboration and mentorship scene"
                className="w-full h-full object-cover rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;