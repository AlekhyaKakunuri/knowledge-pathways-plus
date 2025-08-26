import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { QrCode, CreditCard, CheckCircle, Clock, AlertCircle, Bug } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface Plan {
  name: string;
  price: string;
  description: string;
  features: string[];
}

interface UPIPaymentProps {
  selectedPlan: Plan | null;
  isOpen: boolean;
  onClose: () => void;
}

const UPIPayment = ({ selectedPlan, isOpen, onClose }: UPIPaymentProps) => {
  const [paymentStep, setPaymentStep] = useState<'details' | 'qr' | 'confirmation'>('details');
  const [transactionId, setTransactionId] = useState("");
  const [paymentScreenshot, setPaymentScreenshot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string[]>([]);
  const { toast } = useToast();
  const { user } = useAuth();

  // UPI details for payment
  const upiDetails = {
    id: "ailearning@paytm",
    name: "AI Learning Platform",
    amount: selectedPlan?.price || "0"
  };

  const generateQRCode = () => {
    // Generate UPI payment link
    const upiLink = `upi://pay?pa=${upiDetails.id}&pn=${encodeURIComponent(upiDetails.name)}&am=${upiDetails.amount}&cu=INR&tn=${encodeURIComponent(`Payment for ${selectedPlan?.name} plan`)}`;
    return upiLink;
  };

  const addDebugInfo = (message: string) => {
    setDebugInfo(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const handlePaymentSubmission = async () => {
    // Clear previous debug info
    setDebugInfo([]);
    addDebugInfo('Starting payment submission...');

    if (!transactionId.trim()) {
      toast({
        title: "Error",
        description: "Please enter the transaction ID",
        variant: "destructive"
      });
      return;
    }

    if (!user) {
      addDebugInfo('❌ No user found - authentication required');
      toast({
        title: "Login required",
        description: "Please sign in to submit payment.",
        variant: "destructive"
      });
      return;
    }

    addDebugInfo(`✅ User authenticated: ${user.id}`);
    setIsSubmitting(true);
    
    try {
      // Step 1: Validate database connection
      addDebugInfo('🔍 Testing database connection...');
      const { data: testData, error: testError } = await supabase
        .from('payment_verifications')
        .select('count')
        .limit(1);

      if (testError) {
        addDebugInfo(`❌ Database connection failed: ${testError.message}`);
        throw new Error(`Database connection failed: ${testError.message}`);
      }
      addDebugInfo('✅ Database connection successful');

      // Step 2: Prepare payment data
      const paymentData = {
        user_id: user.id,
        plan_name: selectedPlan?.name || 'Unknown Plan',
        amount: parseInt(selectedPlan?.price || "0"),
        transaction_id: transactionId.trim(),
        payment_screenshot: paymentScreenshot.trim() || null,
        status: 'pending'
      };

      addDebugInfo(`📊 Payment data prepared: ${JSON.stringify(paymentData, null, 2)}`);

      // Step 3: Insert payment verification
      addDebugInfo('💾 Inserting payment verification...');
      const { data: insertData, error: insertError } = await supabase
        .from('payment_verifications')
        .insert(paymentData)
        .select();

      if (insertError) {
        addDebugInfo(`❌ Insert failed: ${insertError.message}`);
        addDebugInfo(`❌ Error details: ${JSON.stringify(insertError, null, 2)}`);
        throw new Error(`Payment submission failed: ${insertError.message}`);
      }

      addDebugInfo(`✅ Payment verification inserted successfully: ${insertData?.[0]?.id}`);
      addDebugInfo('🎉 Payment submission completed!');

      setPaymentStep('confirmation');
      toast({
        title: "Payment Submitted Successfully!",
        description: "Your payment has been submitted for verification. We'll activate your plan within 24 hours.",
      });
    } catch (error: any) {
      console.error('❌ Payment submission error:', error);
      addDebugInfo(`❌ Final error: ${error.message}`);
      
      // Provide specific error messages based on error type
      let errorMessage = "Failed to submit payment verification. Please try again.";
      
      if (error.message.includes('Database connection failed')) {
        errorMessage = "Database connection issue. Please contact support.";
      } else if (error.message.includes('relation "payment_verifications" does not exist')) {
        errorMessage = "Payment system not configured. Please contact support immediately.";
      } else if (error.message.includes('RLS')) {
        errorMessage = "Access denied. Please ensure you're logged in properly.";
      } else if (error.message.includes('duplicate key')) {
        errorMessage = "Transaction ID already exists. Please use a different one.";
      }

      toast({
        title: "Payment Submission Failed",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setPaymentStep('details');
    setTransactionId("");
    setPaymentScreenshot("");
    setDebugInfo([]);
    onClose();
  };

  const runDebugTests = async () => {
    setDebugInfo([]);
    addDebugInfo('🧪 Starting debug tests...');

    try {
      // Test 1: Authentication
      addDebugInfo('🔐 Testing authentication...');
      if (!user) {
        addDebugInfo('❌ No user found');
        return;
      }
      addDebugInfo(`✅ User authenticated: ${user.id}`);

      // Test 2: Database connection
      addDebugInfo('🔍 Testing database connection...');
      const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();
      if (authError) {
        addDebugInfo(`❌ Auth test failed: ${authError.message}`);
      } else {
        addDebugInfo(`✅ Auth test passed: ${authUser?.email}`);
      }

      // Test 3: Table existence
      addDebugInfo('📋 Testing table existence...');
      const { data: tableTest, error: tableError } = await supabase
        .from('payment_verifications')
        .select('count')
        .limit(1);
      
      if (tableError) {
        addDebugInfo(`❌ Table test failed: ${tableError.message}`);
        if (tableError.message.includes('does not exist')) {
          addDebugInfo('🚨 CRITICAL: payment_verifications table is missing!');
          addDebugInfo('💡 Run the SQL script in Supabase to create tables');
        }
      } else {
        addDebugInfo('✅ Table test passed - payment_verifications exists');
      }

      // Test 4: RLS policies
      addDebugInfo('🔒 Testing RLS policies...');
      const { data: rlsTest, error: rlsError } = await supabase
        .from('payment_verifications')
        .select('id')
        .limit(1);
      
      if (rlsError) {
        addDebugInfo(`❌ RLS test failed: ${rlsError.message}`);
      } else {
        addDebugInfo('✅ RLS policies working correctly');
      }

    } catch (error: any) {
      addDebugInfo(`❌ Debug test failed: ${error.message}`);
    }
  };

  if (!selectedPlan) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-[95vw] max-w-md max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader className="mb-4">
          <DialogTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <CreditCard className="h-5 w-5" />
            UPI Payment
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            Complete your payment for the {selectedPlan.name} plan
          </DialogDescription>
        </DialogHeader>

        {paymentStep === 'details' && (
          <div className="space-y-4 sm:space-y-6">
            {/* Plan Summary */}
            <Card className="bg-gradient-card border-0">
              <CardHeader className="pb-3 px-4 sm:px-6">
                <CardTitle className="text-base sm:text-lg">{selectedPlan.name} Plan</CardTitle>
                <CardDescription className="text-sm">{selectedPlan.description}</CardDescription>
              </CardHeader>
              <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-semibold text-sm sm:text-base">Total Amount:</span>
                  <div className="text-xl sm:text-2xl font-bold text-primary">
                    ₹{selectedPlan.price}
                    <span className="text-xs sm:text-sm font-normal text-muted-foreground">/month</span>
                  </div>
                </div>
                <Badge className="bg-gradient-premium text-premium-foreground text-xs">
                  One-time setup required
                </Badge>
              </CardContent>
            </Card>

            {/* Payment Instructions */}
            <Card className="border-primary/20">
              <CardHeader className="px-4 sm:px-6 pb-3">
                <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                  <QrCode className="h-4 w-4" />
                  Payment Steps
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6 space-y-3 text-xs sm:text-sm">
                <div className="flex gap-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
                  <span>Click "Proceed to Pay" to see UPI QR code</span>
                </div>
                <div className="flex gap-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                  <span>Scan QR code with any UPI app (PhonePe, Paytm, GPay)</span>
                </div>
                <div className="flex gap-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
                  <span>Complete payment and enter transaction ID</span>
                </div>
                <div className="flex gap-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">4</div>
                  <span>We'll verify and activate your plan within 24 hours</span>
                </div>
              </CardContent>
            </Card>

            <Button 
              onClick={() => setPaymentStep('qr')} 
              className="w-full text-sm sm:text-base py-2 sm:py-3"
              size="lg"
            >
              Proceed to Pay ₹{selectedPlan.price}
            </Button>

            {/* Debug Button */}
            <Button 
              onClick={runDebugTests}
              variant="outline"
              className="w-full text-xs py-1 flex items-center gap-2 justify-center"
              size="sm"
            >
              <Bug className="h-3 w-3" />
              Debug Payment Issues
            </Button>

            {/* Debug Info Display */}
            {debugInfo.length > 0 && (
              <Card className="border-amber-200 bg-amber-50">
                <CardHeader className="pb-2 px-4">
                  <CardTitle className="text-xs text-amber-800">Debug Information</CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-4">
                  <div className="space-y-1 text-xs text-amber-700 max-h-32 overflow-y-auto">
                    {debugInfo.map((info, index) => (
                      <div key={index} className="font-mono">{info}</div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {paymentStep === 'qr' && (
          <div className="space-y-4 sm:space-y-6 text-center">
            {/* QR Code Section */}
            <div className="bg-white p-4 sm:p-6 rounded-lg border">
              <div className="w-32 h-32 sm:w-48 sm:h-48 mx-auto bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <QrCode className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-2 text-primary" />
                  <p className="text-xs sm:text-sm text-muted-foreground">QR Code for UPI Payment</p>
                  <p className="text-xs font-mono mt-2 break-all px-2">{generateQRCode()}</p>
                </div>
              </div>
            </div>

            {/* UPI Details */}
            <Card className="text-left">
              <CardHeader className="pb-3 px-4 sm:px-6">
                <CardTitle className="text-sm sm:text-base">UPI Payment Details</CardTitle>
              </CardHeader>
              <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6 space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">UPI ID:</span>
                  <span className="font-mono break-all">{upiDetails.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount:</span>
                  <span className="font-semibold">₹{upiDetails.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Plan:</span>
                  <span>{selectedPlan.name}</span>
                </div>
              </CardContent>
            </Card>

            {/* Transaction ID Input */}
            <div className="space-y-3 sm:space-y-4">
              <div className="space-y-2">
                <Label htmlFor="transactionId" className="text-sm">Transaction ID *</Label>
                <Input
                  id="transactionId"
                  placeholder="Enter UPI transaction ID"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  className="text-sm"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="screenshot" className="text-sm">Payment Screenshot (Optional)</Label>
                <Textarea
                  id="screenshot"
                  placeholder="Paste screenshot URL or describe the payment"
                  value={paymentScreenshot}
                  onChange={(e) => setPaymentScreenshot(e.target.value)}
                  rows={3}
                  className="text-sm"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={() => setPaymentStep('details')}
                className="flex-1 text-sm py-2"
              >
                Back
              </Button>
              <Button 
                onClick={handlePaymentSubmission} 
                disabled={isSubmitting}
                className="flex-1 text-sm py-2"
              >
                {isSubmitting ? "Submitting..." : "Submit Payment"}
              </Button>
            </div>

            {/* Debug Info Display */}
            {debugInfo.length > 0 && (
              <Card className="border-amber-200 bg-amber-50">
                <CardHeader className="pb-2 px-4">
                  <CardTitle className="text-xs text-amber-800">Debug Information</CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-4">
                  <div className="space-y-1 text-xs text-amber-700 max-h-32 overflow-y-auto">
                    {debugInfo.map((info, index) => (
                      <div key={index} className="font-mono">{info}</div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {paymentStep === 'confirmation' && (
          <div className="space-y-4 sm:space-y-6 text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto bg-success/10 rounded-full flex items-center justify-center">
              <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-success" />
            </div>
            
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-2">Payment Submitted Successfully!</h3>
              <p className="text-sm text-muted-foreground">
                Your payment verification request has been submitted. We'll review it and activate your {selectedPlan.name} plan within 24 hours.
              </p>
            </div>

            <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
              <CardContent className="pt-4 sm:pt-6 px-4 sm:px-6">
                <div className="flex items-center gap-3 text-xs sm:text-sm">
                  <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
                  <span>Verification usually takes 2-6 hours during business hours</span>
                </div>
              </CardContent>
            </Card>

            <div className="bg-muted/50 p-3 sm:p-4 rounded-lg">
              <div className="flex items-start gap-2 text-xs sm:text-sm">
                <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                <div className="text-left">
                  <p className="font-medium">What happens next?</p>
                  <ul className="mt-1 space-y-1 text-muted-foreground">
                    <li>• We'll verify your payment details</li>
                    <li>• You'll receive an email confirmation</li>
                    <li>• Your premium features will be activated</li>
                    <li>• Contact support if you have any questions</li>
                  </ul>
                </div>
              </div>
            </div>

            <Button onClick={handleClose} className="w-full text-sm sm:text-base py-2 sm:py-3">
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UPIPayment;