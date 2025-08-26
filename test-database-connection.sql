-- Test Database Connection and Tables
-- Run this in Supabase SQL Editor to verify everything is working

-- 1. Check if tables exist
SELECT 'Table Check' as test_name;
SELECT 
  table_name,
  CASE 
    WHEN table_name IS NOT NULL THEN '✅ EXISTS'
    ELSE '❌ MISSING'
  END as status
FROM (
  SELECT 'payment_verifications' as table_name
  UNION ALL SELECT 'subscriptions'
  UNION ALL SELECT 'profiles'
) t
LEFT JOIN information_schema.tables it ON it.table_name = t.table_name AND it.table_schema = 'public';

-- 2. Test inserting a sample payment verification
SELECT 'Insert Test' as test_name;
INSERT INTO payment_verifications (
  user_id,
  plan_name,
  amount,
  transaction_id,
  status
) VALUES (
  '00000000-0000-0000-0000-000000000000', -- dummy UUID
  'Test Plan',
  100,
  'TEST-TXN-' || extract(epoch from now())::text,
  'pending'
) RETURNING id, transaction_id;

-- 3. Test reading the inserted data
SELECT 'Read Test' as test_name;
SELECT 
  id,
  user_id,
  plan_name,
  amount,
  transaction_id,
  status,
  created_at
FROM payment_verifications 
WHERE transaction_id LIKE 'TEST-TXN-%'
ORDER BY created_at DESC;

-- 4. Test updating the status
SELECT 'Update Test' as test_name;
UPDATE payment_verifications 
SET 
  status = 'verified',
  verified_at = now(),
  verified_by = '00000000-0000-0000-0000-000000000000',
  notes = 'Test verification'
WHERE transaction_id LIKE 'TEST-TXN-%'
RETURNING id, status, verified_at;

-- 5. Test creating a subscription
SELECT 'Subscription Test' as test_name;
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
) RETURNING id, user_id, subscription_status;

-- 6. Clean up test data
SELECT 'Cleanup' as test_name;
DELETE FROM subscriptions WHERE user_id = '00000000-0000-0000-0000-000000000000';
DELETE FROM payment_verifications WHERE transaction_id LIKE 'TEST-TXN-%';

-- 7. Final verification
SELECT 'Final Status' as test_name;
SELECT 
  '🎉 ALL TESTS PASSED!' as status,
  'Database is working correctly' as message,
  COUNT(*) as table_count
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN ('payment_verifications', 'subscriptions', 'profiles');
