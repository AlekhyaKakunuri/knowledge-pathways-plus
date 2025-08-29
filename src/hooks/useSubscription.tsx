import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface Subscription {
  id: string;
  user_id: string;
  email: string;
  subscription_tier: string;
  subscription_status: string;
  subscription_end: string | null;
  created_at: string;
  updated_at: string;
}

export const useSubscription = () => {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchSubscription();
    } else {
      setSubscription(null);
      setLoading(false);
    }
  }, [user]);

  const fetchSubscription = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      console.log('🔍 Fetching subscription for user:', user.id);

      // First, let's check if there are any active subscriptions
      const { data: allSubscriptions, error: fetchError } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id);

      if (fetchError) {
        console.error('❌ Error fetching subscriptions:', fetchError);
        throw fetchError;
      }

      console.log('📊 All subscriptions found:', allSubscriptions);

      // Find the most recent active subscription
      const activeSubscription = allSubscriptions
        ?.filter(sub => sub.subscription_status === 'active')
        ?.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())[0];

      console.log('✅ Active subscription found:', activeSubscription);
      setSubscription(activeSubscription || null);
    } catch (err) {
      console.error('❌ Error fetching subscription:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch subscription');
    } finally {
      setLoading(false);
    }
  };

  const isSubscribed = () => {
    if (!subscription) return false;
    return subscription.subscription_status === 'active';
  };

  const hasActiveSubscription = () => {
    if (!subscription) {
      console.log('❌ No subscription found');
      return false;
    }
    
    if (subscription.subscription_status !== 'active') {
      console.log('❌ Subscription status is not active:', subscription.subscription_status);
      return false;
    }
    
    if (subscription.subscription_end) {
      const endDate = new Date(subscription.subscription_end);
      const now = new Date();
      const isExpired = endDate <= now;
      console.log('📅 Subscription end date:', subscription.subscription_end, 'Is expired:', isExpired);
      return !isExpired;
    }
    
    console.log('✅ Subscription is active with no end date');
    return true; // No end date means lifetime subscription
  };

  const getSubscriptionTier = () => {
    return subscription?.subscription_tier || 'free';
  };

  const canAccessPremiumContent = () => {
    const hasAccess = hasActiveSubscription();
    console.log('🔓 Can access premium content:', hasAccess, 'User ID:', user?.id);
    return hasAccess;
  };

  const refreshSubscription = async () => {
    console.log('🔄 Refreshing subscription...');
    await fetchSubscription();
  };

  return {
    subscription,
    loading,
    error,
    isSubscribed: isSubscribed(),
    hasActiveSubscription: hasActiveSubscription(),
    canAccessPremiumContent: canAccessPremiumContent(),
    getSubscriptionTier,
    refreshSubscription,
  };
};
