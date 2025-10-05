import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import UPIPayment from './UPIPayment';
import { Check, X } from "lucide-react";

const PricingSection = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [openUPI, setOpenUPI] = useState(false);
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);

  // Check if user has verified payments for Blog Premium OR Course Package
  useEffect(() => {
    const checkSubscriptionStatus = async () => {
      if (!currentUser?.email) {
        setHasActiveSubscription(false);
        return;
      }


      try {
        // Check for Blog Premium OR Course Package subscription
        const q1 = query(
          collection(db, 'payments'),
          where('userEmail', '==', currentUser.email),
          where('status', '==', 'verified'),
          where('planName', '==', 'Premium') // Blog Premium plan
        );
        
        const q2 = query(
          collection(db, 'payments'),
          where('userEmail', '==', currentUser.email),
          where('status', '==', 'verified'),
          where('planName', '==', 'Course Package') // Course Package plan
        );
        
        const [snapshot1, snapshot2] = await Promise.all([
          getDocs(q1),
          getDocs(q2)
        ]);
        
        const hasBlogPremium = !snapshot1.empty;
        const hasCoursePackage = !snapshot2.empty;
        
        
        if (hasBlogPremium) {
        }
        if (hasCoursePackage) {
        }
        
        // User has access if they have either Blog Premium OR Course Package
        setHasActiveSubscription(hasBlogPremium || hasCoursePackage);
      } catch (error) {
        setHasActiveSubscription(false);
      }
    };

    checkSubscriptionStatus();
  }, [currentUser]);

  // Debug logging

  const plans = [
    {
      name: "Free",
      price: "0",
      period: "forever",
      description: "Perfect for getting started",
      planCode: "FREE",
      features: [
        { text: "Access to 3 blog articles per month", included: true },
        { text: "Basic course materials", included: true },
        { text: "Email support", included: true },
        { text: "No community/forum access", included: false }
      ],
      buttonText: "Start Free",
      buttonVariant: "outline",
      popular: false
    },
    {
      name: "Premium Monthly",
      price: "449",
      period: "month",
      description: "Unlock unlimited learning monthly",
      planCode: "PREMIUM_MONTHLY",
      features: [
        { text: "Unlimited access to all blog articles", included: true },
        { text: "Exclusive premium content", included: true },
        { text: "Community/forum access", included: true },
        { text: "Priority support", included: true },
        { text: "Monthly billing", included: true }
      ],
      buttonText: hasActiveSubscription ? "Active Plan" : "Go Premium",
      buttonVariant: hasActiveSubscription ? "secondary" : "default",
      popular: billingCycle === 'monthly',
      isActive: hasActiveSubscription
    },
    {
      name: "Premium Yearly",
      price: "4308",
      period: "year",
      description: "Unlock unlimited learning yearly",
      planCode: "PREMIUM_YEARLY",
      features: [
        { text: "Unlimited access to all blog articles", included: true },
        { text: "Exclusive premium content", included: true },
        { text: "Community/forum access", included: true },
        { text: "Priority support", included: true },
        { text: "20% savings vs monthly", included: true },
        { text: "Yearly billing", included: true }
      ],
      buttonText: hasActiveSubscription ? "Active Plan" : "Go Premium",
      buttonVariant: hasActiveSubscription ? "secondary" : "default",
      popular: billingCycle === 'yearly',
      yearlyDiscount: "20% OFF",
      monthlyEquivalent: "359",
      isActive: hasActiveSubscription
    }
  ];

  // Filter plans based on billing cycle
  const filteredPlans = plans.filter(plan => {
    if (plan.name === "Free" || plan.name === "GenAI Developer Course") {
      return true; // Always show free and course plans
    }
    if (billingCycle === 'monthly') {
      return plan.period === 'month';
    } else {
      return plan.period === 'year';
    }
  });

  const handleSelectPlan = (plan: any) => {
    if (plan.name === "Free") {
      navigate("/blogs");
      return;
    }

    // If user already has active subscription, don't allow new purchase
    if (hasActiveSubscription) {
      return; // Button will be disabled, but just in case
    }

    // Check if user is authenticated for premium features
    if (!currentUser) {
      // Store the selected plan in sessionStorage to redirect back after login
      sessionStorage.setItem('selectedPlan', JSON.stringify(plan));
      navigate("/signin");
      return;
    }

    setSelectedPlan(plan);
    setOpenUPI(true);
  };

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="container">
        {/* Header Section */}
        <div className="mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 md:mb-4 text-gray-900">
            Choose Your Plan
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-gray-600 max-w-xl md:max-w-2xl">
            Start free, upgrade anytime for unlimited access.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-8 md:mb-10 lg:mb-12">
          <div className="bg-gray-100 rounded-lg p-1 flex items-center">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${billingCycle === 'monthly'
                  ? 'bg-theme-primary text-white shadow-sm'
                  : 'text-gray-700 hover:text-gray-900'
                }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-3 rounded-md font-medium transition-all duration-200 relative ${billingCycle === 'yearly'
                  ? 'bg-theme-primary text-white shadow-sm'
                  : 'text-gray-700 hover:text-gray-900'
                }`}
            >
              Yearly
              {billingCycle === 'yearly' && (
                <Badge className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                  Save 20%
                </Badge>
              )}
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {filteredPlans.map((plan, index) => (
            <div key={plan.planCode || plan.name} className="relative">
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge className="bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </Badge>
                </div>
              )}
              <Card
                key={plan.name}
                className={`relative transition-all duration-300 hover:shadow-lg h-full flex flex-col ${plan.popular
                    ? 'border-theme-primary shadow-lg'
                    : 'border-gray-200 shadow-md'
                  } bg-white ${plan.popular ? 'mt-3' : 'mt-3'}`}
              >

                <CardHeader className="text-center pb-4 md:pb-6">
                  <CardTitle className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{plan.name}</CardTitle>
                  <div className="mb-2">
                    <span className={`text-3xl md:text-4xl lg:text-5xl font-bold ${plan.popular ? 'text-theme-primary' : 'text-gray-900'
                      }`}>
                      ₹{parseInt(plan.price).toLocaleString()}
                    </span>
                    <span className="text-gray-500 text-base md:text-lg">/{plan.period}</span>
                    {plan.monthlyEquivalent && (
                      <div className="mt-1">
                        <p className="text-sm text-gray-600">
                          Just ₹{parseInt(plan.monthlyEquivalent).toLocaleString()}/month
                        </p>
                      </div>
                    )}
                    {plan.yearlyDiscount && (
                      <div className="mt-2">
                        <Badge className="bg-green-100 text-green-800 text-sm">
                          {plan.yearlyDiscount}
                        </Badge>
                        <p className="text-xs text-gray-500 mt-1">
                          Save ₹{((449 * 12) - parseInt(plan.price)).toLocaleString()} vs monthly
                        </p>
                      </div>
                    )}
                  </div>
                  <CardDescription className="text-gray-600 text-sm md:text-base">{plan.description}</CardDescription>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col">
                  <ul className="space-y-3 flex-1">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${feature.included
                            ? 'bg-green-100 text-green-600'
                            : 'bg-gray-100 text-gray-400'
                          }`}>
                          {feature.included ? (
                            <Check className="h-3 w-3" />
                          ) : (
                            <X className="h-3 w-3" />
                          )}
                        </div>
                        <span className={`text-sm ${feature.included ? 'text-gray-700' : 'text-gray-500'
                          }`}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={plan.buttonVariant as any}
                    className={`w-full mt-6 ${plan.isActive 
                      ? '!bg-green-500 hover:!bg-green-600 !text-white cursor-not-allowed' 
                      : '!bg-theme-primary hover:!bg-theme-primary-hover !text-white hover:!text-white !border-theme-primary'
                    }`}
                    size="lg"
                    onClick={() => handleSelectPlan(plan)}
                    disabled={plan.isActive}
                  >
                    {plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Footer Text */}
        <div className="text-center mt-8 md:mt-10 lg:mt-12">
          <p className="text-xs md:text-sm text-gray-500">
            All plans include lifetime access to your account. Cancel anytime.
          </p>
        </div>

        {/* UPI Payment Modal */}
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