import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "./components/ui/tooltip";
import { Toaster } from "./components/ui/toaster";
import { Toaster as SonnerToaster } from "./components/ui/sonner";
import { AuthProvider } from "./contexts/AuthContext";
import { UserRoleProvider } from "./contexts/UserRoleContext";
import Index from "./pages/Index";
import Pricing from "./pages/Pricing";
import AllBlogs from "./pages/AllBlogs";
import AllCourses from "./pages/AllCourses";
import PremiumDetails from "./pages/PremiumDetails";
import BlogDetail from "./pages/BlogDetail";
import Contact from "./pages/Contact";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import AccountSettings from "./pages/AccountSettings";
import ProtectedRoute from "./components/ProtectedRoute";
import WhatsAppChat from "./components/WhatsAppChat";
import FloatingBookingButton from "./components/FloatingBookingButton";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <UserRoleProvider>
            <Router>
            <div className="min-h-screen bg-background">
              {/* Scroll to top on route change */}
              <ScrollToTop />
              
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/blogs" element={<AllBlogs />} />
                <Route path="/courses" element={<AllCourses />} />
                <Route path="/premium/:type/:id" element={<PremiumDetails />} />
                <Route path="/blog/:id" element={<BlogDetail />} />
                <Route path="/contact" element={<Contact />} />
                
                {/* Protected Routes */}
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/account-settings" element={<ProtectedRoute><AccountSettings /></ProtectedRoute>} />
              </Routes>
              
              {/* Global Components */}
              <WhatsAppChat />
              <FloatingBookingButton />
            </div>
            </Router>
          </UserRoleProvider>
        </AuthProvider>
        <Toaster />
        <SonnerToaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
