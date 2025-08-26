-- Database Debug Script
-- Run this in your Supabase SQL Editor to check the current state

-- 1. Check payment_verifications table
SELECT 
  id,
  user_id,
  plan_name,
  amount,
  status,
  created_at,
  verified_at,
  verified_by,
  notes
FROM payment_verifications 
ORDER BY created_at DESC;

-- 2. Check subscriptions table
SELECT 
  id,
  user_id,
  email,
  subscription_tier,
  subscription_status,
  subscription_end,
  created_at,
  updated_at
FROM subscriptions 
ORDER BY created_at DESC;

-- 3. Check if there are any users
SELECT 
  id,
  email,
  created_at
FROM auth.users 
LIMIT 5;

-- 4. Check profiles table
SELECT 
  user_id,
  email,
  created_at
FROM profiles 
LIMIT 5;

-- 5. Count by status
SELECT 
  'payment_verifications' as table_name,
  status,
  COUNT(*) as count
FROM payment_verifications 
GROUP BY status

UNION ALL

SELECT 
  'subscriptions' as table_name,
  subscription_status as status,
  COUNT(*) as count
FROM subscriptions 
GROUP BY subscription_status;

-- 6. Check for any foreign key issues
SELECT 
  pv.id as payment_id,
  pv.user_id,
  pv.status as payment_status,
  s.subscription_status,
  s.subscription_tier
FROM payment_verifications pv
LEFT JOIN subscriptions s ON pv.user_id = s.user_id
ORDER BY pv.created_at DESC;

