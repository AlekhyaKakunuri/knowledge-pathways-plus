/**
 * JWT Utility functions for decoding and validating tokens
 */

export interface SubscriptionPayload {
  plan_name: string;
  start_date: number;
  end_date: number;
  is_premium: boolean;
}

export interface DecodedToken {
  sub?: string;
  email?: string;
  subscription?: SubscriptionPayload;
  exp?: number;
  iat?: number;
  [key: string]: any;
}

/**
 * Decode JWT token without verification (client-side only)
 * Note: This is for client-side decoding only. Server-side should verify the signature.
 */
export const decodeJWT = (token: string): DecodedToken | null => {
  try {
    // Split the token into parts
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid JWT format');
    }

    // Decode the payload (middle part)
    const payload = parts[1];
    
    // Add padding if needed
    const paddedPayload = payload + '='.repeat((4 - payload.length % 4) % 4);
    
    // Decode base64
    const decodedPayload = atob(paddedPayload);
    
    // Parse JSON
    return JSON.parse(decodedPayload);
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
};

/**
 * Extract subscription information from JWT token
 */
export const getSubscriptionFromToken = (token: string): SubscriptionPayload | null => {
  const decoded = decodeJWT(token);
  
  console.log('JWT Decoded Payload:', decoded);
  
  if (!decoded) {
    console.log('Failed to decode JWT token');
    return null;
  }

  // Check if subscription data is directly in the payload (not nested)
  if (decoded.plan_name && decoded.start_date && decoded.end_date && decoded.is_premium !== undefined) {
    console.log('Found subscription data directly in payload:', {
      plan_name: decoded.plan_name,
      start_date: decoded.start_date,
      end_date: decoded.end_date,
      is_premium: decoded.is_premium
    });
    
    return {
      plan_name: decoded.plan_name,
      start_date: decoded.start_date,
      end_date: decoded.end_date,
      is_premium: decoded.is_premium
    };
  }

  // Fallback to nested subscription object
  console.log('No direct subscription data found, checking nested subscription:', decoded.subscription);
  return decoded.subscription || null;
};

/**
 * Check if a subscription is currently active
 */
export const isSubscriptionActive = (subscription: SubscriptionPayload): boolean => {
  const now = Date.now();
  return subscription.is_premium && subscription.end_date > now;
};

/**
 * Get subscription priority for plan comparison
 * Higher number = higher priority
 */
export const getSubscriptionPriority = (planName: string): number => {
  switch (planName) {
    case 'PREMIUM_YEARLY':
      return 3;
    case 'PREMIUM_MONTHLY':
      return 2;
    case 'PREMIUM_GENAI_DEV_01':
      return 1;
    default:
      return 0;
  }
};

/**
 * Determine the active subscription from multiple plans
 * PREMIUM_YEARLY takes precedence over PREMIUM_MONTHLY
 */
export const getActiveSubscription = (subscriptions: SubscriptionPayload[]): SubscriptionPayload | null => {
  if (!subscriptions || subscriptions.length === 0) {
    return null;
  }

  // Filter active subscriptions
  const activeSubscriptions = subscriptions.filter(isSubscriptionActive);
  
  if (activeSubscriptions.length === 0) {
    return null;
  }

  // Sort by priority (highest first)
  activeSubscriptions.sort((a, b) => 
    getSubscriptionPriority(b.plan_name) - getSubscriptionPriority(a.plan_name)
  );

  return activeSubscriptions[0];
};

/**
 * Format subscription plan name for display
 */
export const formatPlanName = (planName: string): string => {
  switch (planName) {
    case 'PREMIUM_MONTHLY':
      return 'Premium Monthly';
    case 'PREMIUM_YEARLY':
      return 'Premium Yearly';
    case 'PREMIUM_GENAI_DEV_01':
      return 'AI Development Course';
    default:
      return planName;
  }
};

/**
 * Calculate days remaining in subscription
 */
export const getDaysRemaining = (subscription: SubscriptionPayload): number => {
  const now = Date.now();
  const endDate = subscription.end_date;
  const diffTime = endDate - now;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * Check if subscription is expiring soon (within 7 days)
 */
export const isSubscriptionExpiringSoon = (subscription: SubscriptionPayload): boolean => {
  const daysRemaining = getDaysRemaining(subscription);
  return daysRemaining <= 7 && daysRemaining > 0;
};
