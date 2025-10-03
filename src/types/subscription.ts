/**
 * Subscription types and interfaces
 */

export interface SubscriptionInfo {
  isPremium: boolean;
  planName: string;
  startDate: number;
  endDate: number;
  isActive: boolean;
  daysRemaining: number;
  isExpiringSoon: boolean;
  formattedPlanName: string;
}

export interface SubscriptionContextType {
  subscription: SubscriptionInfo | null;
  isLoading: boolean;
  error: string | null;
  refreshSubscription: () => Promise<void>;
  clearSubscription: () => void;
}

export type SubscriptionPlan = 
  | 'PREMIUM_MONTHLY' 
  | 'PREMIUM_YEARLY' 
  | 'PREMIUM_GENAI_DEV_01';

export interface SubscriptionFeatures {
  canAccessPremiumContent: boolean;
  canAccessAICourse: boolean;
  canAccessMonthlyFeatures: boolean;
  canAccessYearlyFeatures: boolean;
}
