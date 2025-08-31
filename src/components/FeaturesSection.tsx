import { FileText, Briefcase, User } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: <FileText className="w-8 h-8 text-theme-primary" />,
      title: "Hands-on Courses",
      description: "Interactive training with real-world projects and practical experience."
    },
    {
      icon: <Briefcase className="w-8 h-8 text-green-600" />,
      title: "Career & Job Assistance",
      description: "Complete placement support until you land your dream job."
    },
    {
      icon: <User className="w-8 h-8 text-purple-600" />,
      title: "One-on-One Guidance",
      description: "Personal mentorship tailored to your learning goals and pace."
    }
  ];

  return (
    <section className="py-8 md:py-12 lg:py-16 bg-white px-4">
      <div className="container">
        <div className="text-center mb-6 md:mb-8 lg:mb-12">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 md:mb-4">
            With You From Start to End
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
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
