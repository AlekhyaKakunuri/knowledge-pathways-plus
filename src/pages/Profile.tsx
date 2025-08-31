import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { User, Mail, Calendar, Shield, Camera, Save, Send, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { currentUser, updateUserProfile, sendVerificationEmail } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [sendingVerification, setSendingVerification] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      navigate("/signin");
      return;
    }

    setDisplayName(currentUser.displayName || "");
    setPhotoURL(currentUser.photoURL || "");
  }, [currentUser, navigate]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    setLoading(true);
    try {
      await updateUserProfile(displayName, photoURL);
      toast({
        title: "Profile updated successfully!",
        description: "Your profile information has been saved.",
      });
    } catch (error: any) {
      toast({
        title: "Profile update failed",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSendVerification = async () => {
    if (!currentUser) return;

    setSendingVerification(true);
    try {
      await sendVerificationEmail();
      toast({
        title: "Verification email sent!",
        description: "Check your email for verification instructions.",
      });
    } catch (error: any) {
      toast({
        title: "Failed to send verification email",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    } finally {
      setSendingVerification(false);
    }
  };

  if (!currentUser) {
    return null;
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (date: string | null) => {
    if (!date) return "Not available";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your account settings and profile information</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Profile Overview Card */}
          <Card className="md:col-span-1">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={currentUser.photoURL || ""} alt={currentUser.displayName || "User"} />
                  <AvatarFallback className="text-lg bg-theme-primary text-white">
                    {currentUser.displayName ? getInitials(currentUser.displayName) : <User className="h-8 w-8" />}
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardTitle className="text-xl">{currentUser.displayName || "User"}</CardTitle>
              <CardDescription>{currentUser.email}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Email Status</span>
                {currentUser.emailVerified ? (
                  <Badge variant="default" className="bg-green-100 text-green-800">
                    <Shield className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                ) : (
                  <div className="flex flex-col items-end gap-2">
                    <Badge variant="destructive">
                      <Mail className="h-3 w-3 mr-1" />
                      Unverified
                    </Badge>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleSendVerification}
                      disabled={sendingVerification}
                      className="text-xs"
                    >
                      <Send className="h-3 w-3 mr-1" />
                      {sendingVerification ? "Sending..." : "Verify"}
                    </Button>
                  </div>
                )}
              </div>
              
              <Separator />
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">Joined:</span>
                </div>
                <p className="text-gray-900 ml-6">
                  {formatDate(currentUser.metadata.creationTime || null)}
                </p>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">Last Sign In:</span>
                </div>
                <p className="text-gray-900 ml-6">
                  {formatDate(currentUser.metadata.lastSignInTime || null)}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Profile Edit Form */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Edit Profile
              </CardTitle>
              <CardDescription>
                Update your profile information and settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="displayName" className="text-sm font-medium text-gray-700">
                    Display Name
                  </Label>
                  <Input
                    id="displayName"
                    type="text"
                    placeholder="Enter your display name"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="h-11 border-gray-300 focus:border-theme-border-focus focus:ring-theme-ring"
                  />
                  <p className="text-xs text-gray-500">
                    This name will be displayed across the platform
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={currentUser.email || ""}
                    disabled
                    className="h-11 border-gray-300 bg-gray-50 text-gray-500"
                  />
                  <p className="text-xs text-gray-500">
                    Email cannot be changed. Contact support if needed.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="photoURL" className="text-sm font-medium text-gray-700">
                    Profile Picture URL
                  </Label>
                  <Input
                    id="photoURL"
                    type="url"
                    placeholder="https://example.com/your-photo.jpg"
                    value={photoURL}
                    onChange={(e) => setPhotoURL(e.target.value)}
                    className="h-11 border-gray-300 focus:border-theme-border-focus focus:ring-theme-ring"
                  />
                  <p className="text-xs text-gray-500">
                    Enter a URL to your profile picture
                  </p>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="bg-theme-primary hover:bg-theme-primary-hover text-white"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {loading ? "Saving..." : "Save Changes"}
                  </Button>
                  
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/account-settings")}
                  >
                    Account Settings
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;