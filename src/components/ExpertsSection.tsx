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
    <section className="py-16 lg:py-20 bg-white px-4">
      <div className="container">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Learn from Industry Experts
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {experts.map((expert, index) => (
            <Card key={index} className="text-center">
              <CardHeader className="p-4 lg:p-6">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden mx-auto mb-4">
                  <img 
                    src={expert.avatar} 
                    alt={expert.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardTitle className="text-lg lg:text-xl font-semibold text-gray-900">
                  {expert.name}
                </CardTitle>
                <p className="text-gray-500 text-sm lg:text-base">
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
