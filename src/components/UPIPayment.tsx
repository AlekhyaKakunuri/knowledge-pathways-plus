import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { QrCode, CreditCard, CheckCircle, Clock, AlertCircle } from "lucide-react";
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

  const handlePaymentSubmission = async () => {
    if (!transactionId.trim()) {
      toast({
        title: "Error",
        description: "Please enter the transaction ID",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Submit payment verification request to database
      const { error } = await supabase
        .from('payment_verifications')
        .insert({
          user_id: user?.id,
          plan_name: selectedPlan?.name,
          amount: parseInt(selectedPlan?.price || "0"),
          transaction_id: transactionId,
          payment_screenshot: paymentScreenshot,
          status: 'pending'
        });

      if (error) throw error;

      setPaymentStep('confirmation');
      toast({
        title: "Payment Submitted",
        description: "Your payment has been submitted for verification. We'll activate your plan within 24 hours.",
      });
    } catch (error) {
      console.error('Error submitting payment:', error);
      toast({
        title: "Error",
        description: "Failed to submit payment verification. Please try again.",
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
    onClose();
  };

  if (!selectedPlan) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            UPI Payment
          </DialogTitle>
          <DialogDescription>
            Complete your payment for the {selectedPlan.name} plan
          </DialogDescription>
        </DialogHeader>

        {paymentStep === 'details' && (
          <div className="space-y-6">
            {/* Plan Summary */}
            <Card className="bg-gradient-card border-0">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{selectedPlan.name} Plan</CardTitle>
                <CardDescription>{selectedPlan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-semibold">Total Amount:</span>
                  <div className="text-2xl font-bold text-primary">
                    ₹{selectedPlan.price}
                    <span className="text-sm font-normal text-muted-foreground">/month</span>
                  </div>
                </div>
                <Badge className="bg-gradient-premium text-premium-foreground">
                  One-time setup required
                </Badge>
              </CardContent>
            </Card>

            {/* Payment Instructions */}
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <QrCode className="h-4 w-4" />
                  Payment Steps
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">1</div>
                  <span>Click "Proceed to Pay" to see UPI QR code</span>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">2</div>
                  <span>Scan QR code with any UPI app (PhonePe, Paytm, GPay)</span>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">3</div>
                  <span>Complete payment and enter transaction ID</span>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">4</div>
                  <span>We'll verify and activate your plan within 24 hours</span>
                </div>
              </CardContent>
            </Card>

            <Button 
              onClick={() => setPaymentStep('qr')} 
              className="w-full"
              size="lg"
            >
              Proceed to Pay ₹{selectedPlan.price}
            </Button>
          </div>
        )}

        {paymentStep === 'qr' && (
          <div className="space-y-6 text-center">
            {/* QR Code Section */}
            <div className="bg-white p-6 rounded-lg border">
              <div className="w-48 h-48 mx-auto bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <QrCode className="h-16 w-16 mx-auto mb-2 text-primary" />
                  <p className="text-sm text-muted-foreground">QR Code for UPI Payment</p>
                  <p className="text-xs font-mono mt-2 break-all">{generateQRCode()}</p>
                </div>
              </div>
            </div>

            {/* UPI Details */}
            <Card className="text-left">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">UPI Payment Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">UPI ID:</span>
                  <span className="font-mono">{upiDetails.id}</span>
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
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="transactionId">Transaction ID *</Label>
                <Input
                  id="transactionId"
                  placeholder="Enter UPI transaction ID"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="screenshot">Payment Screenshot (Optional)</Label>
                <Textarea
                  id="screenshot"
                  placeholder="Paste screenshot URL or describe the payment"
                  value={paymentScreenshot}
                  onChange={(e) => setPaymentScreenshot(e.target.value)}
                  rows={3}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={() => setPaymentStep('details')}
                className="flex-1"
              >
                Back
              </Button>
              <Button 
                onClick={handlePaymentSubmission} 
                disabled={isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? "Submitting..." : "Submit Payment"}
              </Button>
            </div>
          </div>
        )}

        {paymentStep === 'confirmation' && (
          <div className="space-y-6 text-center">
            <div className="w-16 h-16 mx-auto bg-success/10 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Payment Submitted Successfully!</h3>
              <p className="text-muted-foreground">
                Your payment verification request has been submitted. We'll review it and activate your {selectedPlan.name} plan within 24 hours.
              </p>
            </div>

            <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>Verification usually takes 2-6 hours during business hours</span>
                </div>
              </CardContent>
            </Card>

            <div className="bg-muted/50 p-4 rounded-lg">
              <div className="flex items-start gap-2 text-sm">
                <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
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

            <Button onClick={handleClose} className="w-full">
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UPIPayment;