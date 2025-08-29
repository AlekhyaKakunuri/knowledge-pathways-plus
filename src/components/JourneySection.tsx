import { Calendar, Code, Briefcase, Target, Building2, GraduationCap } from "lucide-react";

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
    <section className="py-16 lg:py-20 bg-gray-50 px-4">
      <div className="container">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Your Journey to Success
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Follow our proven 3-month roadmap that has helped thousands of students build careers.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {months.map((month, index) => {
            return (
              <div key={index} className="bg-white p-6 lg:p-8 rounded-lg shadow-md">
                <div className="flex items-center gap-3 mb-3 lg:mb-2">
                  <month.icon className="w-5 h-5 text-blue-600" />
                  <span className="text-sm text-blue-600 font-medium">
                    {month.month}
                  </span>
                </div>
                <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-3">
                  {month.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
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
