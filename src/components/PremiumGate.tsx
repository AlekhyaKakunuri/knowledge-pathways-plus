import React, { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Crown, 
  Lock, 
  ArrowRight,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { useSubscription, useSubscriptionFeatures } from '@/contexts/SubscriptionContext';
import { useNavigate } from 'react-router-dom';

interface PremiumGateProps {
  children: ReactNode;
  requiredFeature?: 'premium' | 'ai_course' | 'monthly' | 'yearly';
  fallbackMessage?: string;
  showUpgradeButton?: boolean;
  className?: string;
}

export const PremiumGate: React.FC<PremiumGateProps> = ({
  children,
  requiredFeature = 'premium',
  fallbackMessage,
  showUpgradeButton = true,
  className = ''
}) => {
  const { subscription, isLoading } = useSubscription();
  const features = useSubscriptionFeatures();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <Card className={`${className}`}>
        <CardContent className="p-6">
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
            <span>Loading...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  const hasAccess = (() => {
    switch (requiredFeature) {
      case 'premium':
        return features.canAccessPremiumContent;
      case 'ai_course':
        return features.canAccessAICourse;
      case 'monthly':
        return features.canAccessMonthlyFeatures;
      case 'yearly':
        return features.canAccessYearlyFeatures;
      default:
        return features.canAccessPremiumContent;
    }
  })();

  if (hasAccess) {
    return <>{children}</>;
  }

  const getFeatureName = () => {
    switch (requiredFeature) {
      case 'premium':
        return 'Premium';
      case 'ai_course':
        return 'AI Development Course';
      case 'monthly':
        return 'Monthly Premium';
      case 'yearly':
        return 'Yearly Premium';
      default:
        return 'Premium';
    }
  };

  const getFeatureDescription = () => {
    switch (requiredFeature) {
      case 'premium':
        return 'This content requires a premium subscription.';
      case 'ai_course':
        return 'This content is part of our AI Development Course.';
      case 'monthly':
        return 'This feature is available with monthly or yearly premium subscriptions.';
      case 'yearly':
        return 'This feature is available with yearly premium subscriptions.';
      default:
        return 'This content requires a premium subscription.';
    }
  };

  const getRequiredPlan = () => {
    switch (requiredFeature) {
      case 'ai_course':
        return 'PREMIUM_GENAI_DEV_01';
      case 'yearly':
        return 'PREMIUM_YEARLY';
      case 'monthly':
        return 'PREMIUM_MONTHLY or PREMIUM_YEARLY';
      default:
        return 'Any Premium Plan';
    }
  };

  return (
    <Card className={`${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Crown className="w-5 h-5 text-yellow-500" />
          <span>{getFeatureName()} Content</span>
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            <Lock className="w-3 h-3 mr-1" />
            Locked
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-gray-700 mb-2">
              {fallbackMessage || getFeatureDescription()}
            </p>
            <p className="text-sm text-gray-500">
              Required plan: <span className="font-medium">{getRequiredPlan()}</span>
            </p>
          </div>
        </div>

        {subscription && !subscription.isActive && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <p className="text-red-800 text-sm">
                Your subscription has expired. Renew to access this content.
              </p>
            </div>
          </div>
        )}

        {subscription && subscription.isExpiringSoon && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-yellow-600" />
              <p className="text-yellow-800 text-sm">
                Your subscription expires in {subscription.daysRemaining} day{subscription.daysRemaining !== 1 ? 's' : ''}. 
                Renew to maintain access.
              </p>
            </div>
          </div>
        )}

        {showUpgradeButton && (
          <div className="flex space-x-2">
            <Button 
              onClick={() => navigate('/pricing')} 
              className="flex-1"
            >
              <Crown className="w-4 h-4 mr-2" />
              {subscription ? 'Upgrade Plan' : 'Get Premium'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}

        {subscription && subscription.isActive && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-blue-600" />
              <p className="text-blue-800 text-sm">
                You have an active {subscription.formattedPlanName} subscription, 
                but it doesn't include access to this specific feature.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PremiumGate;
