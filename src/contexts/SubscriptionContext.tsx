import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  SubscriptionInfo, 
  SubscriptionContextType, 
  SubscriptionFeatures 
} from '@/types/subscription';
import { 
  getSubscriptionFromToken, 
  isSubscriptionActive, 
  formatPlanName, 
  getDaysRemaining, 
  isSubscriptionExpiringSoon,
  decodeJWT
} from '@/lib/jwtUtils';
import { useAuth } from './AuthContext';

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};

interface SubscriptionProviderProps {
  children: ReactNode;
}

export const SubscriptionProvider: React.FC<SubscriptionProviderProps> = ({ children }) => {
  const [subscription, setSubscription] = useState<SubscriptionInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { currentUser } = useAuth();

  /**
   * Process JWT token and extract subscription information
   */
  const processSubscriptionFromToken = async (token: string): Promise<SubscriptionInfo | null> => {
    try {
      const subscriptionData = getSubscriptionFromToken(token);
      
      if (!subscriptionData) {
        return null;
      }

      const isActive = isSubscriptionActive(subscriptionData);
      const daysRemaining = getDaysRemaining(subscriptionData);
      const isExpiringSoon = isSubscriptionExpiringSoon(subscriptionData);

      const result = {
        isPremium: subscriptionData.is_premium,
        planName: subscriptionData.plan_name,
        startDate: subscriptionData.start_date,
        endDate: subscriptionData.end_date,
        isActive,
        daysRemaining,
        isExpiringSoon,
        formattedPlanName: formatPlanName(subscriptionData.plan_name)
      };

      return result;
    } catch (err) {
      console.error('Error processing subscription from token:', err);
      setError('Failed to process subscription information');
      return null;
    }
  };

  /**
   * Refresh subscription data from JWT token
   */
  const refreshSubscription = async (): Promise<void> => {
    if (!currentUser) {
      setSubscription(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Get the JWT token from Firebase Auth
      const token = await currentUser.getIdToken();
      
      if (!token) {
        setSubscription(null);
        return;
      }

      const subscriptionInfo = await processSubscriptionFromToken(token);
      setSubscription(subscriptionInfo);
    } catch (err) {
      console.error('Error refreshing subscription:', err);
      setError('Failed to refresh subscription information');
      setSubscription(null);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Clear subscription data
   */
  const clearSubscription = (): void => {
    setSubscription(null);
    setError(null);
  };

  /**
   * Get subscription features based on current subscription
   */
  const getSubscriptionFeatures = (): SubscriptionFeatures => {
    if (!subscription || !subscription.isActive) {
      return {
        canAccessPremiumContent: false,
        canAccessAICourse: false,
        canAccessMonthlyFeatures: false,
        canAccessYearlyFeatures: false
      };
    }

    const { planName, isPremium } = subscription;

    return {
      canAccessPremiumContent: isPremium,
      canAccessAICourse: planName === 'PREMIUM_GENAI_DEV_01',
      canAccessMonthlyFeatures: planName === 'PREMIUM_MONTHLY' || planName === 'PREMIUM_YEARLY',
      canAccessYearlyFeatures: planName === 'PREMIUM_YEARLY'
    };
  };

  // Refresh subscription when user changes
  useEffect(() => {
    if (currentUser) {
      refreshSubscription();
    } else {
      clearSubscription();
    }
  }, [currentUser]);

  // Set up periodic refresh for subscription status
  useEffect(() => {
    if (!subscription || !subscription.isActive) {
      return;
    }

    // Refresh every 5 minutes to check if subscription is still active
    const interval = setInterval(() => {
      refreshSubscription();
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [subscription]);

  const value: SubscriptionContextType = {
    subscription,
    isLoading,
    error,
    refreshSubscription,
    clearSubscription
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};

// Export the features hook for convenience
export const useSubscriptionFeatures = (): SubscriptionFeatures => {
  const { subscription } = useSubscription();
  
  if (!subscription || !subscription.isActive) {
    return {
      canAccessPremiumContent: false,
      canAccessAICourse: false,
      canAccessMonthlyFeatures: false,
      canAccessYearlyFeatures: false
    };
  }

  const { planName, isPremium } = subscription;

  return {
    canAccessPremiumContent: isPremium,
    canAccessAICourse: planName === 'PREMIUM_GENAI_DEV_01',
    canAccessMonthlyFeatures: planName === 'PREMIUM_MONTHLY' || planName === 'PREMIUM_YEARLY',
    canAccessYearlyFeatures: planName === 'PREMIUM_YEARLY'
  };
};
