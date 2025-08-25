import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, Zap } from "lucide-react";

const PricingSection = () => {
  const plans = [
    {
      name: "Free",
      price: "0",
      description: "Perfect for getting started with learning",
      features: [
        "Access to free blog posts",
        "Basic video tutorials",
        "Community forum access",
        "Mobile app access",
        "Email support"
      ],
      buttonText: "Get Started Free",
      buttonVariant: "outline",
      popular: false
    },
    {
      name: "Premium",
      price: "19",
      description: "Unlock all premium content and features",
      features: [
        "Everything in Free",
        "All premium blog posts",
        "Complete video course library",
        "Downloadable resources",
        "Priority support",
        "Offline content access",
        "Progress tracking",
        "Certificates of completion"
      ],
      buttonText: "Start Premium Trial",
      buttonVariant: "hero",
      popular: true
    },
    {
      name: "Enterprise",
      price: "99",
      description: "For teams and organizations",
      features: [
        "Everything in Premium",
        "Team management dashboard",
        "Custom learning paths",
        "Analytics and reporting",
        "Single sign-on (SSO)",
        "Dedicated account manager",
        "Custom integrations",
        "24/7 phone support"
      ],
      buttonText: "Contact Sales",
      buttonVariant: "premium",
      popular: false
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-secondary/20 to-accent/5">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Choose Your Learning Journey
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Start free and upgrade when you're ready to unlock premium content and advanced features
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={plan.name} 
              className={`relative transition-all duration-300 hover:shadow-soft ${
                plan.popular 
                  ? 'border-primary shadow-glow scale-105 bg-gradient-card' 
                  : 'bg-gradient-card border-0'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-hero text-white px-4 py-1">
                    <Crown className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-xl mb-2">{plan.name}</CardTitle>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-primary">
                    ${plan.price}
                  </span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-success/10 flex items-center justify-center mt-0.5">
                        <Check className="h-3 w-3 text-success" />
                      </div>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant={plan.buttonVariant as any} 
                  className="w-full"
                  size="lg"
                >
                  {plan.name === "Premium" && <Zap className="h-4 w-4 mr-2" />}
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            All plans include a 14-day free trial. No credit card required for free tier.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;