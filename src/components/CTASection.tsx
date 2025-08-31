import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-8 md:py-12 lg:py-16 bg-gradient-to-r from-blue-600 to-purple-600 px-4">
      <div className="container text-center">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4 md:mb-6">
          Start your career journey today - Join us now!
        </h2>
        <Button className="bg-white text-theme-primary hover:bg-theme-bg-light px-4 md:px-6 py-2.5 md:py-3 text-sm md:text-base font-semibold">
          Learn More
        </Button>
      </div>
    </section>
  );
};

export default CTASection;
