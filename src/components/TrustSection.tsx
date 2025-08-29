import { Video, Users, FileText, GraduationCap } from "lucide-react";

const TrustSection = () => {
  const trustFactors = [
    {
      icon: <Video className="w-6 h-6 text-blue-600" />,
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
    <section className="py-16 lg:py-20 bg-gray-50 px-4">
      <div className="container">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Students Trust Us
          </h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-8">
          {trustFactors.map((factor, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 lg:mb-4 shadow-md">
                {factor.icon}
              </div>
              <h3 className="text-xs sm:text-sm font-medium text-gray-900 leading-tight">
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
