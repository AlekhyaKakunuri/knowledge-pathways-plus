-- Create Missing Tables for Subscription System
-- Run this in your Supabase SQL Editor to fix the payment verification issues

-- 1. First, check what tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN ('payment_verifications', 'subscriptions', 'profiles')
ORDER BY table_name;

-- 2. Create payment_verifications table
CREATE TABLE IF NOT EXISTS public.payment_verifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  plan_name TEXT NOT NULL,
  amount INTEGER NOT NULL,
  transaction_id TEXT NOT NULL,
  payment_screenshot TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  verified_at TIMESTAMP WITH TIME ZONE,
  verified_by UUID,
  notes TEXT
);

-- 3. Create subscriptions table
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  email TEXT NOT NULL,
  subscription_tier TEXT NOT NULL DEFAULT 'premium',
  subscription_status TEXT NOT NULL DEFAULT 'pending' CHECK (subscription_status IN ('active', 'inactive', 'expired', 'pending')),
  subscription_end TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 4. Create profiles table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.profiles (
  user_id UUID NOT NULL PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 5. Create the update_updated_at_column function if it doesn't exist
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 6. Create triggers for automatic timestamp updates
DROP TRIGGER IF EXISTS update_payment_verifications_updated_at ON payment_verifications;
CREATE TRIGGER update_payment_verifications_updated_at
    BEFORE UPDATE ON payment_verifications
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_subscriptions_updated_at ON subscriptions;
CREATE TRIGGER update_subscriptions_updated_at
    BEFORE UPDATE ON subscriptions
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- 7. Enable Row Level Security (RLS)
ALTER TABLE public.payment_verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 8. Create RLS policies for payment_verifications
DROP POLICY IF EXISTS "Users can view their own payment verifications" ON payment_verifications;
CREATE POLICY "Users can view their own payment verifications" 
ON public.payment_verifications
FOR SELECT 
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create their own payment verifications" ON payment_verifications;
CREATE POLICY "Users can create their own payment verifications" 
ON public.payment_verifications
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- 9. Create RLS policies for subscriptions
DROP POLICY IF EXISTS "Users can view their own subscriptions" ON subscriptions;
CREATE POLICY "Users can view their own subscriptions" 
ON public.subscriptions
FOR SELECT 
USING (auth.uid() = user_id);

-- 10. Create RLS policies for profiles
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
CREATE POLICY "Users can view their own profile" 
ON public.profiles
FOR SELECT 
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
CREATE POLICY "Users can update their own profile" 
ON public.profiles
FOR UPDATE 
USING (auth.uid() = user_id);

-- 11. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_payment_verifications_user_id ON payment_verifications(user_id);
CREATE INDEX IF NOT EXISTS idx_payment_verifications_status ON payment_verifications(status);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(subscription_status);

-- 12. Verify tables were created
SELECT 
  table_name,
  table_type
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN ('payment_verifications', 'subscriptions', 'profiles')
ORDER BY table_name;

-- 13. Check table structure
SELECT 
  table_name,
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_schema = 'public' 
  AND table_name IN ('payment_verifications', 'subscriptions', 'profiles')
ORDER BY table_name, ordinal_position;

-- 14. Test inserting a sample record (this should work now)
INSERT INTO payment_verifications (
  user_id,
  plan_name,
  amount,
  transaction_id,
  status
) VALUES (
  '00000000-0000-0000-0000-000000000000', -- dummy UUID for testing
  'Test Plan',
  100,
  'TEST-TXN-001',
  'pending'
);

-- 15. Clean up test data
DELETE FROM payment_verifications WHERE transaction_id = 'TEST-TXN-001';

-- 16. Show final status
SELECT 
  'Tables Created Successfully!' as status,
  COUNT(*) as table_count
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN ('payment_verifications', 'subscriptions', 'profiles');
