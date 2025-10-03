import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Crown, 
  Star, 
  Zap, 
  Brain, 
  Calendar,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react';
import { useSubscriptionCheck } from '@/hooks/useSubscriptionCheck';
import SubscriptionStatus from '@/components/SubscriptionStatus';
import PremiumGate from '@/components/PremiumGate';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const SubscriptionDemo: React.FC = () => {
  const {
    hasSubscription,
    isActive,
    isPremium,
    planName,
    formattedPlanName,
    canAccessPremiumContent,
    canAccessAICourse,
    canAccessMonthlyFeatures,
    canAccessYearlyFeatures,
    getStatusMessage,
    needsUpgrade
  } = useSubscriptionCheck();
  

  const features = [
    {
      name: 'Basic Content',
      description: 'Available to all users',
      icon: <Star className="w-5 h-5" />,
      accessible: true,
      requiredPlan: 'Free'
    },
    {
      name: 'Premium Content',
      description: 'Requires any premium subscription',
      icon: <Crown className="w-5 h-5" />,
      accessible: canAccessPremiumContent,
      requiredPlan: 'Any Premium Plan'
    },
    {
      name: 'AI Development Course',
      description: 'Exclusive AI course content',
      icon: <Brain className="w-5 h-5" />,
      accessible: canAccessAICourse,
      requiredPlan: 'PREMIUM_GENAI_DEV_01'
    },
    {
      name: 'Monthly Features',
      description: 'Monthly premium features',
      icon: <Calendar className="w-5 h-5" />,
      accessible: canAccessMonthlyFeatures,
      requiredPlan: 'PREMIUM_MONTHLY or PREMIUM_YEARLY'
    },
    {
      name: 'Yearly Features',
      description: 'Exclusive yearly features',
      icon: <Zap className="w-5 h-5" />,
      accessible: canAccessYearlyFeatures,
      requiredPlan: 'PREMIUM_YEARLY'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Subscription System Demo
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              This page demonstrates the subscription flow with JWT token decoding, 
              subscription management, and feature gating.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Subscription Status */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Current Subscription Status
              </h2>
              <SubscriptionStatus />
            </div>

            {/* Feature Access Overview */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Feature Access Overview
              </h2>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-full ${
                            feature.accessible ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                          }`}>
                            {feature.icon}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{feature.name}</p>
                            <p className="text-sm text-gray-600">{feature.description}</p>
                            <p className="text-xs text-gray-500">Plan: {feature.requiredPlan}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {feature.accessible ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <XCircle className="w-5 h-5 text-gray-400" />
                          )}
                          <Badge variant={feature.accessible ? "default" : "secondary"}>
                            {feature.accessible ? 'Accessible' : 'Locked'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Premium Content Examples */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Premium Content Examples
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Premium Content */}
              <PremiumGate requiredFeature="premium">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Crown className="w-5 h-5 text-yellow-500" />
                      <span>Premium Article</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      This is premium content that requires any premium subscription. 
                      You can see this because you have access to premium features.
                    </p>
                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-sm text-yellow-800">
                        <strong>Premium Feature:</strong> This content is only available to premium subscribers.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </PremiumGate>

              {/* AI Course Content */}
              <PremiumGate requiredFeature="ai_course">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Brain className="w-5 h-5 text-purple-500" />
                      <span>AI Development Course</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      This is exclusive content from our AI Development Course. 
                      Only students enrolled in the AI course can access this material.
                    </p>
                    <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                      <p className="text-sm text-purple-800">
                        <strong>Course Content:</strong> Advanced AI concepts and hands-on projects.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </PremiumGate>

              {/* Monthly Features */}
              <PremiumGate requiredFeature="monthly">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Calendar className="w-5 h-5 text-blue-500" />
                      <span>Monthly Premium Features</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      This content is available to monthly and yearly subscribers. 
                      It includes monthly reports, analytics, and exclusive monthly content.
                    </p>
                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>Monthly Feature:</strong> Detailed analytics and monthly insights.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </PremiumGate>

              {/* Yearly Features */}
              <PremiumGate requiredFeature="yearly">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Zap className="w-5 h-5 text-orange-500" />
                      <span>Yearly Premium Features</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      This is exclusive content for yearly subscribers only. 
                      It includes annual reports, priority support, and exclusive yearly benefits.
                    </p>
                    <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                      <p className="text-sm text-orange-800">
                        <strong>Yearly Feature:</strong> Annual reports and priority support.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </PremiumGate>
            </div>
          </div>


        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SubscriptionDemo;
