-- Debug Payment Verification Issues
-- Run this in your Supabase SQL Editor to diagnose payment submission problems

-- 1. Check if payment_verifications table exists and has correct structure
SELECT 
  table_name,
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'payment_verifications'
ORDER BY ordinal_position;

-- 2. Check RLS policies on payment_verifications table
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'payment_verifications';

-- 3. Check if RLS is enabled
SELECT 
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables 
WHERE tablename = 'payment_verifications';

-- 4. Test inserting a sample record (this will help identify RLS issues)
-- Note: This might fail due to RLS, which is expected
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
  'TEST-TXN-001',
  'pending'
);

-- 5. Check current user context
SELECT 
  current_user,
  current_setting('role'),
  current_setting('request.jwt.claims');

-- 6. Check if there are any constraint violations
SELECT 
  conname,
  contype,
  pg_get_constraintdef(oid) as constraint_definition
FROM pg_constraint 
WHERE conrelid = 'payment_verifications'::regclass;

-- 7. Check for any triggers that might interfere
SELECT 
  trigger_name,
  event_manipulation,
  action_statement
FROM information_schema.triggers 
WHERE event_object_table = 'payment_verifications';

-- 8. Verify the table has the correct data types
SELECT 
  column_name,
  data_type,
  character_maximum_length,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'payment_verifications' 
  AND column_name IN ('user_id', 'plan_name', 'amount', 'transaction_id', 'status');

-- 9. Check if there are any foreign key constraints
SELECT 
  tc.constraint_name,
  tc.table_name,
  kcu.column_name,
  ccu.table_name AS foreign_table_name,
  ccu.column_name AS foreign_column_name
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY' 
  AND tc.table_name = 'payment_verifications';

-- 10. Check for any recent errors in the logs (if accessible)
-- This might not work in all Supabase instances
SELECT 
  log_time,
  log_level,
  log_message
FROM pg_stat_activity 
WHERE state = 'active' 
  AND query LIKE '%payment_verifications%';
