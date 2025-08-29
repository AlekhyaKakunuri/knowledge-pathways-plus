import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-16 lg:py-20 bg-gradient-to-r from-blue-600 to-purple-600 px-4">
      <div className="container text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 lg:mb-8">
          Start your career journey today - Join us now!
        </h2>
        <Button className="bg-white text-blue-600 hover:bg-gray-100 px-6 sm:px-8 py-3 text-base lg:text-lg font-semibold">
          Get Started
        </Button>
      </div>
    </section>
  );
};

export default CTASection;
