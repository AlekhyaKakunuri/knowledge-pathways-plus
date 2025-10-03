import { useSubscription, useSubscriptionFeatures } from '@/contexts/SubscriptionContext';
import { useMemo } from 'react';

/**
 * Custom hook for easy subscription checks and feature access
 */
export const useSubscriptionCheck = () => {
  const { subscription, isLoading, error } = useSubscription();
  const features = useSubscriptionFeatures();

  const subscriptionCheck = useMemo(() => {
    return {
      // Basic subscription status
      hasSubscription: !!subscription,
      isActive: subscription?.isActive || false,
      isPremium: subscription?.isPremium || false,
      isLoading,
      error,

      // Plan information
      planName: subscription?.planName || null,
      formattedPlanName: subscription?.formattedPlanName || null,
      startDate: subscription?.startDate || null,
      endDate: subscription?.endDate || null,
      daysRemaining: subscription?.daysRemaining || 0,
      isExpiringSoon: subscription?.isExpiringSoon || false,

      // Feature access
      canAccessPremiumContent: features.canAccessPremiumContent,
      canAccessAICourse: features.canAccessAICourse,
      canAccessMonthlyFeatures: features.canAccessMonthlyFeatures,
      canAccessYearlyFeatures: features.canAccessYearlyFeatures,

      // Specific plan checks
      hasMonthlyPlan: subscription?.planName === 'PREMIUM_MONTHLY',
      hasYearlyPlan: subscription?.planName === 'PREMIUM_YEARLY',
      hasAICoursePlan: subscription?.planName === 'PREMIUM_GENAI_DEV_01',

      // Utility functions
      canAccess: (feature: 'premium' | 'ai_course' | 'monthly' | 'yearly') => {
        switch (feature) {
          case 'premium':
            return features.canAccessPremiumContent;
          case 'ai_course':
            return features.canAccessAICourse;
          case 'monthly':
            return features.canAccessMonthlyFeatures;
          case 'yearly':
            return features.canAccessYearlyFeatures;
          default:
            return false;
        }
      },

      // Check if user needs to upgrade for a specific feature
      needsUpgrade: (feature: 'premium' | 'ai_course' | 'monthly' | 'yearly') => {
        if (!subscription) return true;
        if (!subscription.isActive) return true;
        
        switch (feature) {
          case 'premium':
            return !features.canAccessPremiumContent;
          case 'ai_course':
            return !features.canAccessAICourse;
          case 'monthly':
            return !features.canAccessMonthlyFeatures;
          case 'yearly':
            return !features.canAccessYearlyFeatures;
          default:
            return true;
        }
      },

      // Get subscription status message
      getStatusMessage: () => {
        if (isLoading) return 'Loading subscription status...';
        if (error) return `Error: ${error}`;
        if (!subscription) return 'No active subscription';
        if (!subscription.isActive) return 'Subscription expired';
        if (subscription.isExpiringSoon) {
          return `Subscription expires in ${subscription.daysRemaining} day${subscription.daysRemaining !== 1 ? 's' : ''}`;
        }
        return `Active ${subscription.formattedPlanName} subscription`;
      },

      // Check if subscription is in grace period (expired but still within grace period)
      isInGracePeriod: () => {
        if (!subscription) return false;
        // Add grace period logic here if needed (e.g., 7 days after expiration)
        return false;
      },

      // Get days until expiration
      getDaysUntilExpiration: () => {
        if (!subscription || !subscription.isActive) return 0;
        return subscription.daysRemaining;
      },

      // Check if subscription is renewable
      isRenewable: () => {
        if (!subscription) return false;
        return subscription.isActive && subscription.isExpiringSoon;
      }
    };
  }, [subscription, features, isLoading, error]);

  return subscriptionCheck;
};

export default useSubscriptionCheck;
