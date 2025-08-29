import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import UPIPayment from "@/components/UPIPayment";

const PricingSection = () => {
  const plans = [
    {
      name: "Free",
      price: "0",
      priceInr: "₹0",
      period: "forever",
      description: "Perfect for getting started",
      features: [
        { text: "Access 1 blog article only", included: true },
        { text: "No access to premium content", included: false },
        { text: "No community/forum access", included: false }
      ],
      buttonText: "Start Free",
      buttonVariant: "outline",
      popular: false
    },
    {
      name: "Premium",
      price: "19",
      priceInr: "₹19",
      period: "month",
      description: "Unlock unlimited learning",
      features: [
        { text: "Unlimited access to all blog articles", included: true },
        { text: "Exclusive premium content", included: true },
        { text: "Community/forum access", included: true }
      ],
      buttonText: "Go Premium",
      buttonVariant: "default",
      popular: true
    }
  ];

  const [selectedPlan, setSelectedPlan] = useState<any | null>(null);
  const [openUPI, setOpenUPI] = useState(false);
  const navigate = useNavigate();
  
  const handleSelectPlan = (plan: any) => {
    if (plan.name === "Free") {
      navigate("/blogs");
      return;
    }
    setSelectedPlan(plan);
    setOpenUPI(true);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
            Choose Your Plan
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Start free, upgrade anytime for unlimited access.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={plan.name} 
              className={`relative transition-all duration-300 hover:shadow-lg ${
                plan.popular 
                  ? 'border-blue-500 shadow-lg scale-105' 
                  : 'border-gray-200 shadow-md'
              } bg-white`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</CardTitle>
                <div className="mb-2">
                  <span className={`text-5xl font-bold ${
                    plan.popular ? 'text-blue-600' : 'text-gray-900'
                  }`}>
                    ₹{plan.price}
                  </span>
                  <span className="text-gray-500 text-lg">/{plan.period}</span>
                </div>
                <CardDescription className="text-gray-600">{plan.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                        feature.included 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-red-100 text-red-600'
                      }`}>
                        {feature.included ? (
                          <Check className="h-3 w-3" />
                        ) : (
                          <X className="h-3 w-3" />
                        )}
                      </div>
                      <span className={`text-sm ${
                        feature.included ? 'text-gray-700' : 'text-gray-500'
                      }`}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant={plan.buttonVariant as any} 
                  className={`w-full mt-6 ${
                    plan.popular 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                  size="lg"
                  onClick={() => handleSelectPlan(plan)}
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-gray-500">
            All plans include lifetime access to your account. Cancel anytime.
          </p>
        </div>

        <UPIPayment
          selectedPlan={selectedPlan}
          isOpen={openUPI}
          onClose={() => setOpenUPI(false)}
        />
      </div>
    </section>
  );
};

export default PricingSection;