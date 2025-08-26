import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./hooks/useAuth";
import { TooltipProvider } from "./components/ui/tooltip";
import { Toaster } from "./components/ui/toaster";
import { Toaster as SonnerToaster } from "./components/ui/sonner";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import Pricing from "./pages/Pricing";
import AllBlogs from "./pages/AllBlogs";
import AllCourses from "./pages/AllCourses";
import PremiumDetails from "./pages/PremiumDetails";
import CourseDetail from "./pages/CourseDetail";
import BlogDetail from "./pages/BlogDetail";
import AdminDashboard from "./pages/AdminDashboard";
import WhatsAppChat from "./components/WhatsAppChat";
import FloatingBookingButton from "./components/FloatingBookingButton";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Router>
            <div className="min-h-screen bg-background">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/blogs" element={<AllBlogs />} />
                <Route path="/courses" element={<AllCourses />} />
                <Route path="/premium/:type/:id" element={<PremiumDetails />} />
                <Route path="/course/:id" element={<CourseDetail />} />
                <Route path="/blog/:id" element={<BlogDetail />} />
                <Route path="/admin" element={<AdminDashboard />} />
              </Routes>
              
              {/* Global Components */}
              <WhatsAppChat />
              <FloatingBookingButton />
            </div>
          </Router>
          <Toaster />
          <SonnerToaster />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
