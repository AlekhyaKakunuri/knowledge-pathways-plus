import { supabase } from '@/integrations/supabase/client';

export interface PaymentVerification {
  id: string;
  user_id: string;
  plan_name: string;
  amount: number;
  transaction_id: string;
  payment_screenshot: string | null;
  status: 'pending' | 'verified' | 'rejected';
  created_at: string;
  updated_at: string;
  verified_at: string | null;
  verified_by: string | null;
  notes: string | null;
}

export interface SubscriptionData {
  user_id: string;
  email: string;
  subscription_tier: string;
  subscription_status: 'active' | 'inactive' | 'expired' | 'pending';
  subscription_end?: string;
}

export class AdminService {
  // Get all pending payment verifications
  static async getPendingPayments(): Promise<PaymentVerification[]> {
    const { data, error } = await supabase
      .from('payment_verifications')
      .select('*')
      .eq('status', 'pending')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data || []) as PaymentVerification[];
  }

  // Get all payment verifications
  static async getAllPayments(): Promise<PaymentVerification[]> {
    const { data, error } = await supabase
      .from('payment_verifications')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data || []) as PaymentVerification[];
  }

  // Verify a payment and activate subscription
  static async verifyPayment(
    paymentId: string, 
    adminUserId: string, 
    notes?: string
  ): Promise<void> {
    console.log('🔍 Starting payment verification for:', paymentId);
    
    try {
      // Step 1: Update payment verification status
      console.log('📝 Updating payment verification status to verified...');
      const { error: updateError } = await supabase
        .from('payment_verifications')
        .update({
          status: 'verified',
          verified_at: new Date().toISOString(),
          verified_by: adminUserId,
          notes: notes || 'Payment verified by admin',
          updated_at: new Date().toISOString()
        })
        .eq('id', paymentId);

      if (updateError) {
        console.error('❌ Error updating payment verification:', updateError);
        throw new Error(`Failed to update payment verification: ${updateError.message}`);
      }

      console.log('✅ Payment verification status updated successfully');

      // Step 2: Get the payment details
      console.log('🔍 Fetching payment details...');
      const { data: payment, error: fetchError } = await supabase
        .from('payment_verifications')
        .select('*')
        .eq('id', paymentId)
        .single();

      if (fetchError) {
        console.error('❌ Error fetching payment details:', fetchError);
        throw new Error(`Failed to fetch payment details: ${fetchError.message}`);
      }

      console.log('✅ Payment details fetched:', payment);

      // Step 3: Get user email from profiles table
      console.log('🔍 Fetching user profile...');
      const { data: userProfile, error: profileError } = await supabase
        .from('profiles')
        .select('email')
        .eq('user_id', payment.user_id)
        .single();

      if (profileError) {
        console.error('❌ Error fetching user profile:', profileError);
        // Try to get email from auth.users as fallback
        const { data: authUser, error: authError } = await supabase.auth.getUser();
        if (authError) {
          throw new Error(`Failed to fetch user email: ${profileError.message}`);
        }
        // Use a default email if profile doesn't exist
        const email = authUser?.user?.email || `${payment.user_id}@example.com`;
        console.log('⚠️ Using fallback email:', email);
      }

      const userEmail = userProfile?.email || `${payment.user_id}@example.com`;

      // Step 4: Create or update subscription
      console.log('🔍 Creating/updating subscription...');
      const subscriptionData: SubscriptionData = {
        user_id: payment.user_id,
        email: userEmail,
        subscription_tier: payment.plan_name.toLowerCase(),
        subscription_status: 'active',
        subscription_end: this.calculateSubscriptionEnd(payment.plan_name)
      };

      console.log('📊 Subscription data:', subscriptionData);

      // Check if subscription already exists
      const { data: existingSubscription, error: checkError } = await supabase
        .from('subscriptions')
        .select('id')
        .eq('user_id', payment.user_id)
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        console.error('❌ Error checking existing subscription:', checkError);
        throw new Error(`Failed to check existing subscription: ${checkError.message}`);
      }

      if (existingSubscription) {
        // Update existing subscription
        console.log('🔄 Updating existing subscription...');
        const { error: updateSubError } = await supabase
          .from('subscriptions')
          .update({
            ...subscriptionData,
            updated_at: new Date().toISOString()
          })
          .eq('user_id', payment.user_id);

        if (updateSubError) {
          console.error('❌ Error updating subscription:', updateSubError);
          throw new Error(`Failed to update subscription: ${updateSubError.message}`);
        }
        console.log('✅ Subscription updated successfully');
      } else {
        // Create new subscription
        console.log('🆕 Creating new subscription...');
        const { error: createSubError } = await supabase
          .from('subscriptions')
          .insert({
            ...subscriptionData,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });

        if (createSubError) {
          console.error('❌ Error creating subscription:', createSubError);
          throw new Error(`Failed to create subscription: ${createSubError.message}`);
        }
        console.log('✅ Subscription created successfully');
      }

      console.log('🎉 Payment verification completed successfully!');
    } catch (error) {
      console.error('❌ Payment verification failed:', error);
      throw error;
    }
  }

  // Reject a payment
  static async rejectPayment(
    paymentId: string, 
    adminUserId: string, 
    notes: string
  ): Promise<void> {
    console.log('🔍 Rejecting payment:', paymentId);
    
    const { error } = await supabase
      .from('payment_verifications')
      .update({
        status: 'rejected',
        verified_at: new Date().toISOString(),
        verified_by: adminUserId,
        notes,
        updated_at: new Date().toISOString()
      })
      .eq('id', paymentId);

    if (error) {
      console.error('❌ Error rejecting payment:', error);
      throw error;
    }
    
    console.log('✅ Payment rejected successfully');
  }

  // Get subscription statistics
  static async getSubscriptionStats() {
    const { data: activeSubs, error: activeError } = await supabase
      .from('subscriptions')
      .select('subscription_status')
      .eq('subscription_status', 'active');

    const { data: pendingPayments, error: pendingError } = await supabase
      .from('payment_verifications')
      .select('status')
      .eq('status', 'pending');

    if (activeError || pendingError) throw activeError || pendingError;

    return {
      activeSubscriptions: activeSubs?.length || 0,
      pendingPayments: pendingPayments?.length || 0
    };
  }

  // Calculate subscription end date based on plan
  private static calculateSubscriptionEnd(planName: string): string {
    const now = new Date();
    
    switch (planName.toLowerCase()) {
      case 'premium':
        // 1 month from now
        return new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString();
      case 'enterprise':
        // 1 year from now
        return new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000).toISOString();
      default:
        // Default to 1 month
        return new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString();
    }
  }

  // Manual fix for database state - use this if verification didn't work properly
  static async fixDatabaseState(paymentId: string, adminUserId: string): Promise<void> {
    console.log('🔧 Manual database fix for payment:', paymentId);
    
    try {
      // Step 1: Force update payment verification status
      const { error: updateError } = await supabase
        .from('payment_verifications')
        .update({
          status: 'verified',
          verified_at: new Date().toISOString(),
          verified_by: adminUserId,
          notes: 'Manual fix applied by admin',
          updated_at: new Date().toISOString()
        })
        .eq('id', paymentId);

      if (updateError) {
        console.error('❌ Error updating payment verification:', updateError);
        throw updateError;
      }

      // Step 2: Get payment details
      const { data: payment, error: fetchError } = await supabase
        .from('payment_verifications')
        .select('*')
        .eq('id', paymentId)
        .single();

      if (fetchError) {
        console.error('❌ Error fetching payment details:', fetchError);
        throw fetchError;
      }

      // Step 3: Ensure subscription exists and is active
      const subscriptionData = {
        user_id: payment.user_id,
        email: `${payment.user_id}@example.com`, // Fallback email
        subscription_tier: payment.plan_name.toLowerCase(),
        subscription_status: 'active',
        subscription_end: this.calculateSubscriptionEnd(payment.plan_name),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      // Check if subscription exists
      const { data: existingSub } = await supabase
        .from('subscriptions')
        .select('id')
        .eq('user_id', payment.user_id)
        .single();

      if (existingSub) {
        // Update existing subscription
        const { error: updateSubError } = await supabase
          .from('subscriptions')
          .update({
            subscription_status: 'active',
            subscription_tier: payment.plan_name.toLowerCase(),
            subscription_end: this.calculateSubscriptionEnd(payment.plan_name),
            updated_at: new Date().toISOString()
          })
          .eq('user_id', payment.user_id);

        if (updateSubError) {
          console.error('❌ Error updating subscription:', updateSubError);
          throw updateSubError;
        }
      } else {
        // Create new subscription
        const { error: createSubError } = await supabase
          .from('subscriptions')
          .insert(subscriptionData);

        if (createSubError) {
          console.error('❌ Error creating subscription:', createSubError);
          throw createSubError;
        }
      }

      console.log('✅ Database state fixed successfully!');
    } catch (error) {
      console.error('❌ Database fix failed:', error);
      throw error;
    }
  }

  // Get detailed payment information
  static async getPaymentDetails(paymentId: string): Promise<any> {
    const { data, error } = await supabase
      .from('payment_verifications')
      .select(`
        *,
        user:user_id(
          id,
          email
        )
      `)
      .eq('id', paymentId)
      .single();

    if (error) throw error;
    return data;
  }
}
