import { Calendar } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      number: "1",
      title: "Choose Course",
      description: "Select the perfect course for your career goals",
      color: "bg-theme-primary"
    },
    {
      number: "2",
      title: "Learn with Mentors",
      description: "Get hands-on training from industry experts",
      color: "bg-green-600"
    },
    {
      number: "3",
      title: "Career Support",
      description: "Receive complete job placement assistance",
      color: "bg-purple-600"
    },
    {
      number: "4",
      title: "Get Placed",
      description: "Land your dream job with our support",
      color: "bg-orange-600"
    }
  ];

  return (
    <section className="py-8 md:py-12 lg:py-16 bg-white px-4">
      <div className="container">
        <div className="text-center mb-6 md:mb-8 lg:mb-12">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 md:mb-4">
            How It Works
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className={`w-12 h-12 md:w-14 md:h-14 ${step.color} rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-lg`}>
                <span className="text-lg md:text-xl font-bold text-white">{step.number}</span>
              </div>
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
