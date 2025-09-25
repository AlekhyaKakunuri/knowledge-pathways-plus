import { Target, Building2, GraduationCap } from "lucide-react";

const JourneySection = () => {
  const months = [
    {
      month: "Month 1",
      title: "Foundation Building",
      description: "Master the fundamentals with hands-on projects and live sessions.",
      icon: GraduationCap
    },
    {
      month: "Month 2",
      title: "Advanced Skills",
      description: "Work on real industry projects with mentor guidance.",
      icon: Building2
    },
    {
      month: "Month 3",
      title: "Career Preparation",
      description: "Portfolio building, interview prep, and job placement support.",
      icon: Target
    }
  ];

  return (
    <section className="py-8 md:py-12 lg:py-16 bg-gray-50 px-4">
      <div className="container">
        <div className="text-center mb-6 md:mb-8 lg:mb-12">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 md:mb-4">
            Your Journey to Success
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-gray-600 max-w-2xl lg:max-w-3xl mx-auto">
            Follow our proven 3-month roadmap that has helped thousands of students build careers.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {months.map((month, index) => {
            return (
              <div key={index} className="bg-white p-4 md:p-6 rounded-lg shadow-md">
                <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                  <month.icon className="w-4 h-4 md:w-5 md:h-5 text-theme-primary" />
                  <span className="text-xs md:text-sm text-theme-primary font-medium">
                    {month.month}
                  </span>
                </div>
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2 md:mb-3">
                  {month.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  {month.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
