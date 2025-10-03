import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { QrCode, CreditCard, CheckCircle, Clock, AlertCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { savePaymentDetails, createCourseEnrollmentPayment } from "@/lib/paymentService";
import { useAuth } from "@/contexts/AuthContext";

interface Plan {
  name: string;
  price: string;
  description: string;
  features: string[];
  planCode?: string;
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
  const { currentUser } = useAuth();

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
        description: "Please enter the UPI transaction ID or UTR number",
        variant: "destructive"
      });
      return;
    }

    if (!currentUser) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to submit payment",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Check if this is a course enrollment (has planCode)
      if (selectedPlan?.planCode && selectedPlan.planCode !== 'UNKNOWN') {
        // Use course enrollment payment for courses
        const result = await createCourseEnrollmentPayment({
          courseId: selectedPlan.name, // Using name as course identifier
          courseTitle: selectedPlan.name,
          planName: selectedPlan.planCode,
          amount: parseInt(selectedPlan.price),
          userEmail: currentUser?.email || 'guest@example.com',
          userName: currentUser?.displayName || currentUser?.email?.split('@')[0] || 'Guest User',
          userId: currentUser?.uid || '', // Firebase localId
          transactionId: transactionId.trim(),
          utrNumber: transactionId.trim(), // UTR number is the same as transaction ID for UPI
          paymentScreenshot: paymentScreenshot.trim(),
        });

        if (result.success) {
          setPaymentStep('confirmation');
          toast({
            title: "Course Enrollment Submitted Successfully!",
            description: "Your course enrollment has been submitted for verification. You will receive access once verified.",
          });
        } else {
          throw new Error('Failed to create course enrollment');
        }
      } else {
        // Use regular payment for subscription plans
        const result = await savePaymentDetails({
          transactionId: transactionId.trim(),
          planName: selectedPlan?.name || 'Unknown Plan',
          amount: typeof selectedPlan?.price === 'number' ? selectedPlan.price : parseInt(String(selectedPlan?.price || '0')),
          userEmail: currentUser?.email || 'guest@example.com',
          userName: currentUser?.displayName || currentUser?.email?.split('@')[0] || 'Guest User',
          userId: currentUser?.uid || '', // Firebase localId
          paymentScreenshot: paymentScreenshot.trim() || '',
        });

        if (result.success) {
          setPaymentStep('confirmation');
          toast({
            title: "Payment Submitted Successfully!",
            description: "Your payment has been saved and submitted for verification. We'll activate your plan within 24 hours.",
          });
        } else {
          throw new Error('Failed to save payment details');
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit payment. Please try again.",
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
                    ₹{parseInt(selectedPlan.price).toLocaleString()}
                    <span className="text-xs sm:text-sm font-normal text-muted-foreground">
                      /month
                    </span>
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
              Proceed to Pay ₹{parseInt(selectedPlan.price).toLocaleString()}
            </Button>
          </div>
        )}

        {paymentStep === 'qr' && (
          <div className="space-y-4 sm:space-y-6 text-center">
            {/* QR Code Section */}
            <div className="bg-white p-6 sm:p-8 rounded-lg border">
              <div className="w-48 h-48 sm:w-56 sm:h-56 mx-auto bg-white rounded-lg border-2 border-gray-200 flex items-center justify-center">
                <img 
                  src="/phonepe-qr-code.png" 
                  alt="PhonePe QR Code for Payment"
                  className="w-full h-full object-cover"
                  onLoad={() => {}}
                  onError={(e) => {
                    // Hide the image and show fallback if it fails to load
                    e.currentTarget.style.display = 'none';
                    const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div className="hidden flex-col items-center justify-center text-center p-4">
                  <QrCode className="h-16 w-16 sm:h-20 sm:w-20 mx-auto mb-2 text-primary" />
                  <p className="text-xs sm:text-sm text-muted-foreground">QR Code for UPI Payment</p>
                  <p className="text-xs font-mono mt-2 break-all px-2">{generateQRCode()}</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground mt-4">QR Code for UPI Payment</p>
              <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-700">
                📱 Scan this QR code with PhonePe app to complete payment
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
                  <span className="font-semibold">₹{parseInt(upiDetails.amount).toLocaleString()}</span>
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
                <Label htmlFor="transactionId" className="text-sm">UPI Transaction ID / UTR Number *</Label>
                <Input
                  id="transactionId"
                  placeholder="Enter UPI transaction ID or UTR number"
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
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Payment"
                )}
              </Button>
            </div>
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