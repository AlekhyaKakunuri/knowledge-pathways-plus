import { Video, Users, Briefcase, GraduationCap } from "lucide-react";

const TrustSection = () => {
  const trustFactors = [
    {
      icon: <Video className="w-6 h-6 text-theme-primary" />,
      title: "Live Classes with Experts"
    },
    {
      icon: <span className="text-2xl">📖</span>,
      title: "Industry Projects"
    },
    {
      icon: <Users className="w-6 h-6 text-purple-600" />,
      title: "1:1 Mentorship"
    },
    {
      icon: <Briefcase className="w-6 h-6 text-emerald-600" />,
      title: "Resume & Interview Prep"
    },
    {
      icon: <GraduationCap className="w-6 h-6 text-red-600" />,
      title: "Placement Assistance"
    }
  ];

  return (
    <section className="py-6 md:py-8 lg:py-10 bg-gray-50">
      <div className="container px-4">
        <div className="text-center mb-4 md:mb-6 lg:mb-8">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 md:mb-4">
            Why Students Trust Us
          </h2>
        </div>
        
        {/* Mobile: Horizontal scroll, Desktop: Grid */}
        <div className="sm:hidden">
          <div className="flex gap-2 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
            {trustFactors.map((factor, index) => (
              <div key={index} className="text-center min-w-[90px] flex-shrink-0">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mx-auto mb-2 shadow-md">
                  {factor.icon}
                </div>
                <h3 className="text-[10px] font-medium text-gray-900 leading-tight">
                  {factor.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
        
        {/* Desktop: Grid layout */}
        <div className="hidden sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {trustFactors.map((factor, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-md">
                {factor.icon}
              </div>
              <h3 className="text-sm md:text-base font-medium text-gray-900 leading-tight">
                {factor.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
