import { FileText, Briefcase, Users } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: <FileText className="w-8 h-8 text-theme-primary" />,
      title: "Hands-on Courses",
      description: "Interactive training with real-world projects to make you job-ready."
    },
    {
      icon: <Briefcase className="w-8 h-8 text-green-600" />,
      title: "Placement Assistance",
      description: "Complete placement support until you land your dream job."
    },
    {
      icon: <Users className="w-8 h-8 text-purple-600" />,
      title: "One-on-One Mentorship",
      description: "Personal guidance tailored to your learning pace and career goals."
    }
  ];

  return (
    <section className="py-6 md:py-8 lg:py-10 bg-white">
      <div className="container px-8">
        <div className="mb-4 md:mb-6 lg:mb-8">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">
            Your Journey to Success in AI
          </h2>
        </div>
        
        {/* Mobile: Horizontal scroll, Desktop: Grid */}
        <div className="sm:hidden">
          <div className="flex gap-2 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-2 min-w-[120px] flex-shrink-0 bg-gray-50 rounded-lg border border-gray-200">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mx-auto mb-2 shadow-sm border border-gray-100">
                  {feature.icon}
                </div>
                <h3 className="text-xs font-semibold text-gray-900 mb-1 leading-tight">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-tight text-[10px]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Desktop: Grid layout */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-3 md:p-4">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3 md:mb-4">
                {feature.icon}
              </div>
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2 md:mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
