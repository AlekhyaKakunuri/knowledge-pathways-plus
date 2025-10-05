
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
    <section className="py-6 md:py-8 lg:py-10 bg-white px-4">
      <div className="container">
        <div className="text-center mb-4 md:mb-6 lg:mb-8">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 md:mb-4">
            How It Works
          </h2>
        </div>
        
        {/* Mobile: Horizontal scroll, Desktop: Grid */}
        <div className="sm:hidden">
          <div className="flex gap-3 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
            {steps.map((step, index) => (
              <div key={index} className="text-center p-3 min-w-[140px] flex-shrink-0 bg-gray-50 rounded-xl border border-gray-200">
                <div className={`w-10 h-10 ${step.color} rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg`}>
                  <span className="text-sm font-bold text-white">{step.number}</span>
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-xs">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Desktop: Grid layout */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
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
