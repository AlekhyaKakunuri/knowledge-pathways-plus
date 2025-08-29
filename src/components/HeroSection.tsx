import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-white py-16 lg:py-24 px-4">
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-2 lg:gap-4 items-center">
          {/* Left Content */}
          <div className="space-y-6 lg:space-y-6 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold leading-tight">
              From Learning to <span className="text-blue-600">Placement</span> – We're With You
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl lg:max-w-none mx-auto lg:mx-0">
              Live mentor-led training + Career support until you succeed.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="text-lg px-6 sm:px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white">
                Enroll Now
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-6 sm:px-8 py-3 border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
                onClick={() => {
                  const event = new CustomEvent('openCalendly');
                  window.dispatchEvent(event);
                }}
              >
                Talk to a Mentor
              </Button>
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