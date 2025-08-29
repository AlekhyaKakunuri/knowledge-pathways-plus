import { Calendar } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      number: "1",
      title: "Choose Course",
      description: "Select the perfect course for your career goals",
      color: "bg-blue-600"
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
    <section className="py-16 lg:py-20 bg-white px-4">
      <div className="container">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className={`w-14 h-14 sm:w-16 sm:h-16 ${step.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                <span className="text-xl sm:text-2xl font-bold text-white">{step.number}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm lg:text-base">
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
