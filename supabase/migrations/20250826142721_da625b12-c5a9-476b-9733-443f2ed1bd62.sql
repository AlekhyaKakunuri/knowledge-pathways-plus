-- Create payment_verifications table for manual payment verification
CREATE TABLE public.payment_verifications (
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

-- Enable Row Level Security
ALTER TABLE public.payment_verifications ENABLE ROW LEVEL SECURITY;

-- Create policies for payment verifications
CREATE POLICY "Users can view their own payment verifications" 
ON public.payment_verifications 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own payment verifications" 
ON public.payment_verifications 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_payment_verifications_updated_at
BEFORE UPDATE ON public.payment_verifications
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();