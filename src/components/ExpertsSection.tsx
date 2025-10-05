import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const ExpertsSection = () => {
  const experts = [
    {
      name: "Naveenkumar",
      university: "IIT-BHU",
      specialty: "GenAI and LLM Specialist",
      avatar: "https://firebasestorage.googleapis.com/v0/b/aicareerx-51133.firebasestorage.app/o/Inspector%2Fnaveen.jpg?alt=media&token=8714f86c-0704-4524-9b9f-ca8cca292cc2",
      linkedinUrl: "https://www.linkedin.com/in/naveenkumar-kakunuri-2b7236119"
    },
    {
      name: "Ravi Raushan",
      university: "IIT-BHU",
      specialty: "Python and Backend Specialist",
      avatar: "https://firebasestorage.googleapis.com/v0/b/aicareerx-51133.firebasestorage.app/o/Inspector%2FRavi.jpg?alt=media&token=d0b7cd1b-0263-4f45-873a-6f38feaea3db",
      linkedinUrl: "https://www.linkedin.com/in/ravi-raushan-224b16140"
    },
    {
      name: "Naveenkumar",
      university: "IIT-BHU",
      specialty: "GenAI and LLM Specialist",
      avatar: "https://firebasestorage.googleapis.com/v0/b/aicareerx-51133.firebasestorage.app/o/Inspector%2Fnaveen.jpg?alt=media&token=8714f86c-0704-4524-9b9f-ca8cca292cc2",
      linkedinUrl: "https://www.linkedin.com/in/naveenkumar-kakunuri-2b7236119"
    }
  ];

  return (
    <section className="py-6 md:py-8 lg:py-10 bg-white px-4">
      <div className="container">
        <div className="mb-4 md:mb-6 lg:mb-8">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 md:mb-4">
            Learn from Industry Experts
          </h2>
        </div>
        
        {/* Mobile: Horizontal scroll, Desktop: Grid */}
        <div className="sm:hidden">
          <div className="flex gap-3 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
            {experts.map((expert, index) => (
              <Card 
                key={index} 
                className="text-center cursor-pointer hover:shadow-lg transition-shadow duration-300 min-w-[160px] flex-shrink-0"
                onClick={() => window.open(expert.linkedinUrl, '_blank')}
              >
                <CardHeader className="p-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden mx-auto mb-2">
                    <img 
                      src={expert.avatar} 
                      alt={expert.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardTitle className="text-sm font-semibold text-gray-900 mb-1">
                    {expert.name}
                  </CardTitle>
                  <p className="text-blue-600 text-xs font-medium mb-1">
                    {expert.university}
                  </p>
                  <p className="text-gray-500 text-xs">
                    {expert.specialty}
                  </p>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Desktop: Grid layout */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {experts.map((expert, index) => (
            <Card 
              key={index} 
              className="text-center cursor-pointer hover:shadow-lg transition-shadow duration-300"
              onClick={() => window.open(expert.linkedinUrl, '_blank')}
            >
              <CardHeader className="p-3 md:p-4 lg:p-6">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden mx-auto mb-3 md:mb-4">
                  <img 
                    src={expert.avatar} 
                    alt={expert.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardTitle className="text-base md:text-lg font-semibold text-gray-900 mb-1">
                  {expert.name}
                </CardTitle>
                <p className="text-blue-600 text-sm font-medium mb-2">
                  {expert.university}
                </p>
                <p className="text-gray-500 text-sm md:text-base">
                  {expert.specialty}
                </p>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpertsSection;
