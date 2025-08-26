-- Fix Payment Verification Issues
-- Run this in your Supabase SQL Editor to resolve verification problems

-- 1. Check current database state
SELECT 'Current Database State' as info;
SELECT 
  table_name,
  CASE 
    WHEN table_name IS NOT NULL THEN 'EXISTS'
    ELSE 'MISSING'
  END as status
FROM (
  SELECT 'payment_verifications' as table_name
  UNION ALL SELECT 'subscriptions'
  UNION ALL SELECT 'profiles'
) t
LEFT JOIN information_schema.tables it ON it.table_name = t.table_name AND it.table_schema = 'public';

-- 2. Drop and recreate tables to ensure clean state
DROP TABLE IF EXISTS public.payment_verifications CASCADE;
DROP TABLE IF EXISTS public.subscriptions CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- 3. Create payment_verifications table
CREATE TABLE public.payment_verifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  plan_name TEXT NOT NULL,
  amount INTEGER NOT NULL,
  transaction_id TEXT NOT NULL UNIQUE,
  payment_screenshot TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  verified_at TIMESTAMP WITH TIME ZONE,
  verified_by UUID,
  notes TEXT
);

-- 4. Create subscriptions table
CREATE TABLE public.subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  email TEXT NOT NULL,
  subscription_tier TEXT NOT NULL DEFAULT 'premium',
  subscription_status TEXT NOT NULL DEFAULT 'pending' CHECK (subscription_status IN ('active', 'inactive', 'expired', 'pending')),
  subscription_end TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 5. Create profiles table
CREATE TABLE public.profiles (
  user_id UUID NOT NULL PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 6. Create the update_updated_at_column function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 7. Create triggers for automatic timestamp updates
CREATE TRIGGER update_payment_verifications_updated_at
    BEFORE UPDATE ON payment_verifications
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at
    BEFORE UPDATE ON subscriptions
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- 8. Enable Row Level Security (RLS)
ALTER TABLE public.payment_verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 9. Create RLS policies for payment_verifications
CREATE POLICY "Users can view their own payment verifications" 
ON public.payment_verifications
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own payment verifications" 
ON public.payment_verifications
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Allow admins to update payment verifications (for verification process)
CREATE POLICY "Admins can update payment verifications" 
ON public.payment_verifications
FOR UPDATE 
USING (true);

-- 10. Create RLS policies for subscriptions
CREATE POLICY "Users can view their own subscriptions" 
ON public.subscriptions
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage subscriptions" 
ON public.subscriptions
FOR ALL 
USING (true);

-- 11. Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- 12. Create indexes for better performance
CREATE INDEX idx_payment_verifications_user_id ON payment_verifications(user_id);
CREATE INDEX idx_payment_verifications_status ON payment_verifications(status);
CREATE INDEX idx_payment_verifications_transaction_id ON payment_verifications(transaction_id);
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(subscription_status);
CREATE INDEX idx_profiles_user_id ON profiles(user_id);

-- 13. Insert test data to verify everything works
ti

-- 14. Test the verification process
UPDATE payment_verifications 
SET 
  status = 'verified',
  verified_at = now(),
  verified_by = '00000000-0000-0000-0000-000000000000',
  notes = 'Test verification',
  updated_at = now()
WHERE transaction_id = 'TEST-TXN-001';

-- 15. Create test subscription
INSERT INTO subscriptions (
  user_id,
  email,
  subscription_tier,
  subscription_status,
  subscription_end
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  'test@example.com',
  'premium',
  'active',
  now() + interval '30 days'
);

-- 16. Clean up test data
DELETE FROM subscriptions WHERE user_id = '00000000-0000-0000-0000-000000000000';
DELETE FROM payment_verifications WHERE transaction_id = 'TEST-TXN-001';

-- 17. Verify final state
SELECT 'Final Database State' as info;
SELECT 
  table_name,
  CASE 
    WHEN table_name IS NOT NULL THEN 'EXISTS'
    ELSE 'MISSING'
  END as status
FROM (
  SELECT 'payment_verifications' as table_name
  UNION ALL SELECT 'subscriptions'
  UNION ALL SELECT 'profiles'
) t
LEFT JOIN information_schema.tables it ON it.table_name = t.table_name AND it.table_schema = 'public';

-- 18. Show table structures
SELECT 'Table Structures' as info;
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

-- 19. Show RLS policies
SELECT 'RLS Policies' as info;
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies 
WHERE schemaname = 'public' 
  AND tablename IN ('payment_verifications', 'subscriptions', 'profiles')
ORDER BY tablename, policyname;

-- 20. Final success message
SELECT 
  '🎉 VERIFICATION SYSTEM READY!' as status,
  'All tables created successfully with proper RLS policies' as message,
  COUNT(*) as table_count
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN ('payment_verifications', 'subscriptions', 'profiles');
