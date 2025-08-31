import { Video, Users, FileText, GraduationCap } from "lucide-react";

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
      icon: <FileText className="w-6 h-6 text-orange-600" />,
      title: "Resume & Interview Prep"
    },
    {
      icon: <GraduationCap className="w-6 h-6 text-red-600" />,
      title: "Placement Assistance"
    }
  ];

  return (
    <section className="py-8 md:py-12 lg:py-16 bg-gray-50 px-4">
      <div className="container">
        <div className="text-center mb-6 md:mb-8 lg:mb-12">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 md:mb-4">
            Why Students Trust Us
          </h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 lg:gap-6">
          {trustFactors.map((factor, index) => (
            <div key={index} className="text-center">
              <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3 shadow-md">
                {factor.icon}
              </div>
              <h3 className="text-xs md:text-sm font-medium text-gray-900 leading-tight">
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
