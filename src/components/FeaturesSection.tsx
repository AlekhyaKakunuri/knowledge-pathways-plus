import { FileText, Briefcase, User } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: <FileText className="w-8 h-8 text-blue-600" />,
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
    <section className="py-16 lg:py-20 bg-white px-4">
      <div className="container">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            With You From Start to End
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-4 lg:p-6">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
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
