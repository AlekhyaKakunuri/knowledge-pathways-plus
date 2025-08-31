import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Shield, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Users, 
  DollarSign,
  Eye,
  AlertCircle,
  Wrench
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Mock data for demonstration
const mockPayments = [
  {
    id: "1",
    user_id: "user1",
    plan_name: "Premium Plan",
    amount: 999,
    transaction_id: "TXN123456",
    payment_screenshot: "https://example.com/screenshot1.jpg",
    status: "pending",
    created_at: "2024-01-15T10:30:00Z",
    user_email: "user1@example.com"
  },
  {
    id: "2",
    user_id: "user2",
    plan_name: "Premium Plan",
    amount: 999,
    transaction_id: "TXN123457",
    payment_screenshot: "https://example.com/screenshot2.jpg",
    status: "verified",
    created_at: "2024-01-14T15:45:00Z",
    user_email: "user2@example.com"
  },
  {
    id: "3",
    user_id: "user3",
    plan_name: "Premium Plan",
    amount: 999,
    transaction_id: "TXN123458",
    payment_screenshot: "https://example.com/screenshot3.jpg",
    status: "rejected",
    created_at: "2024-01-13T09:15:00Z",
    user_email: "user3@example.com"
  }
];

const AdminDashboard = () => {
  const { toast } = useToast();
  const [payments, setPayments] = useState(mockPayments);
  const [stats, setStats] = useState({ activeSubscriptions: 1, pendingPayments: 1 });
  const [loading, setLoading] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const [verificationNotes, setVerificationNotes] = useState("");
  const [rejectionNotes, setRejectionNotes] = useState("");
  const [showVerifyDialog, setShowVerifyDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleVerifyPayment = async () => {
    if (!selectedPayment) return;

    try {
      setProcessing(true);
      
      // Simulate API call delay
      setTimeout(() => {
        // Update local state
        setPayments(prev => prev.map(p => 
          p.id === selectedPayment.id 
            ? { ...p, status: 'verified' }
            : p
        ));
        
        // Update stats
        setStats(prev => ({
          activeSubscriptions: prev.activeSubscriptions + 1,
          pendingPayments: prev.pendingPayments - 1
        }));

        toast({
          title: "Success",
          description: "Payment verified and subscription activated!",
        });

        setShowVerifyDialog(false);
        setVerificationNotes("");
        setSelectedPayment(null);
        setProcessing(false);
      }, 1000);
      
    } catch (error) {
      console.error('Error verifying payment:', error);
      toast({
        title: "Error",
        description: "Failed to verify payment",
        variant: "destructive"
      });
      setProcessing(false);
    }
  };

  const handleRejectPayment = async () => {
    if (!selectedPayment || !rejectionNotes.trim()) return;

    try {
      setProcessing(true);
      
      // Simulate API call delay
      setTimeout(() => {
        // Update local state
        setPayments(prev => prev.map(p => 
          p.id === selectedPayment.id 
            ? { ...p, status: 'rejected' }
            : p
        ));

        toast({
          title: "Success",
          description: "Payment rejected successfully!",
        });

        setShowRejectDialog(false);
        setRejectionNotes("");
        setSelectedPayment(null);
        setProcessing(false);
      }, 1000);
      
    } catch (error) {
      console.error('Error rejecting payment:', error);
      toast({
        title: "Error",
        description: "Failed to reject payment",
        variant: "destructive"
      });
      setProcessing(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'verified':
        return <Badge className="bg-green-100 text-green-800">Verified</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="py-16 lg:py-20 px-4">
          <div className="container">
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading admin dashboard...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-16 lg:py-20 px-4">
        <div className="container">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <p className="text-lg text-gray-600">
              Manage payments, subscriptions, and platform administration
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium opacity-90">Active Subscriptions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.activeSubscriptions}</div>
                <p className="text-theme-bg-light text-sm">Premium users</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium opacity-90">Pending Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.pendingPayments}</div>
                <p className="text-yellow-100 text-sm">Awaiting verification</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium opacity-90">Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">₹{stats.activeSubscriptions * 999}</div>
                <p className="text-green-100 text-sm">This month</p>
              </CardContent>
            </Card>
          </div>

          {/* Payments Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Payment Verifications
              </CardTitle>
              <CardDescription>
                Review and verify user payment submissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">User</th>
                      <th className="text-left py-3 px-4 font-medium">Plan</th>
                      <th className="text-left py-3 px-4 font-medium">Amount</th>
                      <th className="text-left py-3 px-4 font-medium">Transaction ID</th>
                      <th className="text-left py-3 px-4 font-medium">Status</th>
                      <th className="text-left py-3 px-4 font-medium">Date</th>
                      <th className="text-left py-3 px-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((payment) => (
                      <tr key={payment.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div>
                            <div className="font-medium">{payment.user_email}</div>
                            <div className="text-sm text-gray-500">ID: {payment.user_id}</div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="outline">{payment.plan_name}</Badge>
                        </td>
                        <td className="py-3 px-4 font-medium">₹{payment.amount}</td>
                        <td className="py-3 px-4 font-mono text-sm">{payment.transaction_id}</td>
                        <td className="py-3 px-4">
                          {getStatusBadge(payment.status)}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {formatDate(payment.created_at)}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedPayment(payment);
                                setShowVerifyDialog(true);
                              }}
                              disabled={payment.status !== 'pending'}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              Review
                            </Button>
                            {payment.status === 'pending' && (
                              <>
                                <Button
                                  variant="default"
                                  size="sm"
                                  onClick={() => {
                                    setSelectedPayment(payment);
                                    setShowVerifyDialog(true);
                                  }}
                                >
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Verify
                                </Button>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => {
                                    setSelectedPayment(payment);
                                    setShowRejectDialog(true);
                                  }}
                                >
                                  <XCircle className="h-4 w-4 mr-1" />
                                  Reject
                                </Button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Verify Payment Dialog */}
      <Dialog open={showVerifyDialog} onOpenChange={setShowVerifyDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verify Payment</DialogTitle>
            <DialogDescription>
              Verify this payment and activate the user's subscription
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="verificationNotes">Verification Notes (Optional)</Label>
              <Textarea
                id="verificationNotes"
                placeholder="Add any notes about this verification..."
                value={verificationNotes}
                onChange={(e) => setVerificationNotes(e.target.value)}
                rows={3}
              />
            </div>
            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowVerifyDialog(false)}
                disabled={processing}
              >
                Cancel
              </Button>
              <Button
                onClick={handleVerifyPayment}
                disabled={processing}
              >
                {processing ? "Verifying..." : "Verify Payment"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Reject Payment Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Payment</DialogTitle>
            <DialogDescription>
              Reject this payment and provide a reason
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="rejectionNotes">Rejection Reason *</Label>
              <Textarea
                id="rejectionNotes"
                placeholder="Please provide a reason for rejection..."
                value={rejectionNotes}
                onChange={(e) => setRejectionNotes(e.target.value)}
                rows={3}
                required
              />
            </div>
            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowRejectDialog(false)}
                disabled={processing}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleRejectPayment}
                disabled={processing || !rejectionNotes.trim()}
              >
                {processing ? "Rejecting..." : "Reject Payment"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
