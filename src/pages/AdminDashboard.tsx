import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PaymentAdmin from "@/components/PaymentAdmin";
import AdminStats from "@/components/AdminStats";
import UserPlansManagement from "@/components/UserPlansManagement";

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);


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

          {/* Real-time Stats Cards */}
          <AdminStats />

          {/* Real-time Payment Management */}
          <PaymentAdmin />


          {/* User Plans Management */}
          <div className="mt-12">
            <UserPlansManagement />
          </div>
        </div>
      </main>


      <Footer />
    </div>
  );
};

export default AdminDashboard;
