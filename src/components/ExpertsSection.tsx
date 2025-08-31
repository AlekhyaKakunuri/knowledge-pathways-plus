import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const ExpertsSection = () => {
  const experts = [
    {
      name: "John Smith",
      specialty: "Full Stack Development",
      avatar: "/hero-mentorship.jpg"
    },
    {
      name: "Emily Davis",
      specialty: "Data Science & AI",
      avatar: "/hero-mentorship.jpg"
    },
    {
      name: "Michael Chen",
      specialty: "Digital Marketing",
      avatar: "/hero-mentorship.jpg"
    }
  ];

  return (
    <section className="py-8 md:py-12 lg:py-16 bg-white px-4">
      <div className="container">
        <div className="text-center mb-6 md:mb-8 lg:mb-12">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 md:mb-4">
            Learn from Industry Experts
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {experts.map((expert, index) => (
            <Card key={index} className="text-center">
              <CardHeader className="p-3 md:p-4 lg:p-6">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden mx-auto mb-3 md:mb-4">
                  <img 
                    src={expert.avatar} 
                    alt={expert.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardTitle className="text-base md:text-lg font-semibold text-gray-900">
                  {expert.name}
                </CardTitle>
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
