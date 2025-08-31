import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-white py-12 md:py-16 lg:py-20 xl:py-24 px-4">
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-4 md:space-y-6 text-center lg:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold leading-tight">
              From Learning to <span className="text-theme-primary">Placement</span> – We're With You
            </h1>

            <p className="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl lg:max-w-none mx-auto lg:mx-0">
              Live mentor-led training + Career support until you succeed.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start">
              <Link to="/courses">
                <Button size="lg" className="text-base md:text-lg px-6 md:px-8 py-2.5 md:py-3 bg-theme-primary hover:bg-theme-primary-hover text-white">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex justify-center lg:justify-end order-first lg:order-last">
            <div className="relative w-80 h-80 sm:w-96 sm:h-96 lg:w-[420px] lg:h-[420px]">
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