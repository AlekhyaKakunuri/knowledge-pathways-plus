import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { toast } = useToast();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      toast({
        title: "Sign in successful!",
        description: "Welcome to EduMentor. You will be redirected to the dashboard.",
      });
      setLoading(false);
      // In the future, this will integrate with your REST API
    }, 1000);
  };

  const handleForgotPassword = () => {
    toast({
      title: "Password reset",
      description: "Password reset functionality will be available when REST API is integrated.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-lg border-0 bg-white">
          <CardHeader className="text-center pb-6">
            <div className="flex items-center justify-center cursor-pointer gap-2 mb-4" onClick={() => window.location.href = '/'}>
              <button 
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-theme-primary hover:bg-theme-primary-hover transition-colors"
              >
                <BookOpen className="h-6 w-6 text-white" />
              </button>
                             <span className="text-2xl font-bold text-theme-primary">EduMentor</span>
            </div>
            <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-lg text-gray-600">
              Sign in to continue learning.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                                     className="h-11 border-gray-300 focus:border-theme-border-focus focus:ring-theme-ring"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                                         className="h-11 border-gray-300 focus:border-theme-border-focus focus:ring-theme-ring pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="rememberMe"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    className="border-gray-300"
                  />
                  <Label htmlFor="rememberMe" className="text-sm text-gray-600">
                    Remember Me
                  </Label>
                </div>
                <Button
                  type="button"
                  variant="link"
                  onClick={handleForgotPassword}
                  className="p-0 h-auto text-sm text-theme-primary hover:text-theme-primary-hover"
                >
                  Forgot Password?
                </Button>
              </div>

              <Button 
                type="submit" 
                                 className="w-full h-11 bg-theme-primary hover:bg-theme-primary-hover text-white font-medium" 
                disabled={loading}
              >
                {loading ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            <div className="text-center">
              <span className="text-sm text-gray-600">
                Don't have an account?{" "}
              </span>
                             <Link to="/signup" className="text-theme-primary hover:text-theme-primary-hover font-medium">
                Sign Up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignIn;
