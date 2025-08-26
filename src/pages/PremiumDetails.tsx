import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Eye, BookOpen, Crown, ArrowLeft, Star, Users, Play, CheckCircle, Lock, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UPIPayment from "@/components/UPIPayment";
import { useSubscription } from "@/hooks/useSubscription";
import { ContentService, Blog, Course } from "@/services/contentService";

const PremiumDetails = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const [openUPI, setOpenUPI] = useState(false);
  const [content, setContent] = useState<Blog | Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { canAccessPremiumContent, loading: subscriptionLoading, refreshSubscription } = useSubscription();

  // Fetch content from database
  useEffect(() => {
    const fetchContent = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);

        let contentData: Blog | Course | null = null;
        
        if (type === 'blog') {
          contentData = await ContentService.getBlogById(id);
        } else if (type === 'course') {
          contentData = await ContentService.getCourseById(id);
        }

        if (!contentData) {
          setError('Content not found');
          return;
        }

        setContent(contentData);
      } catch (err) {
        console.error('Error fetching content:', err);
        setError('Failed to load content');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [type, id]);

  const handleSubscribe = () => {
    setOpenUPI(true);
  };

  const handleCloseUPI = () => {
    setOpenUPI(false);
    // Refresh subscription status after payment submission
    setTimeout(() => {
      refreshSubscription();
    }, 1000);
  };

  const handleReadArticle = () => {
    if (type === 'blog') {
      // Navigate to full blog content or show full content
      alert("🎉 Full article content would be displayed here! This is where you'd show the complete blog post content.");
    } else {
      // Navigate to course content
      alert("🎉 Course content would be displayed here! This is where you'd show the video lessons and course materials.");
    }
  };

  // Show loading state while fetching content
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20">
          <div className="container text-center py-20">
            <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">Loading content...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Show error state
  if (error || !content) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20">
          <div className="container text-center py-20">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold mb-2">Content Not Found</h1>
            <p className="text-muted-foreground mb-6">{error || 'The requested content could not be loaded.'}</p>
            <Button onClick={() => navigate(-1)} variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Show loading state while checking subscription
  if (subscriptionLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20">
          <div className="container text-center py-20">
            <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">Checking subscription status...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Check if content is premium
  const isPremiumContent = 'is_premium' in content ? content.is_premium : false;

  // If content is not premium, redirect to regular content page
  if (!isPremiumContent) {
    navigate(`/${type === 'blog' ? 'blog' : 'course'}/${id}`);
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Back Navigation */}
        <section className="bg-gradient-to-r from-background to-secondary/20 py-6">
          <div className="container">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to {type === 'blog' ? 'Blogs' : 'Courses'}
            </Button>
          </div>
        </section>

        {/* Content Header */}
        <section className="py-12">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-start justify-between mb-6">
                <div className="flex gap-2">
                  <Badge variant="secondary" className="text-sm">
                    {type === 'blog' ? (content as Blog).tags?.[0] || 'General' : (content as Course).category}
                  </Badge>
                  {type === 'course' && (
                    <Badge variant="outline" className="text-sm">
                      {(content as Course).level}
                    </Badge>
                  )}
                </div>
                
                {/* Show appropriate badge based on subscription status */}
                {canAccessPremiumContent ? (
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Unlocked
                  </Badge>
                ) : (
                  <Badge className="bg-gradient-premium text-premium-foreground">
                    <Lock className="h-3 w-3 mr-1" />
                    Premium
                  </Badge>
                )}
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                {content.title}
              </h1>
              
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {type === 'blog' ? (content as Blog).excerpt || (content as Blog).content.substring(0, 200) + '...' : (content as Course).description}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8">
                {type === 'blog' ? (
                  <>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {Math.ceil((content as Blog).content.length / 200)} min read
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      New
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      {new Date((content as Blog).created_at).toLocaleDateString()}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {(content as Course).duration}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      {(content as Course).students_count} students
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4" />
                      {(content as Course).rating}/5 rating
                    </div>
                  </>
                )}
              </div>

              {/* Author/Instructor Info */}
              <div className="flex items-center gap-4 mb-8 p-4 bg-gradient-card rounded-lg border-0">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    {type === 'blog' ? 'Author' : 'Instructor'}
                  </p>
                  <p className="font-semibold">
                    {type === 'blog' ? 'Content Creator' : (content as Course).instructor}
                  </p>
                </div>
              </div>

              {/* Subscription Status Check */}
              {canAccessPremiumContent ? (
                <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 mb-8">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-700">
                      <CheckCircle className="h-5 w-5" />
                      Premium Access Granted
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-green-700 mb-4">
                      🎉 You have an active premium subscription! You can now access this content.
                    </p>
                    <Button 
                      onClick={handleReadArticle}
                      variant="default" 
                      size="lg"
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      {type === 'blog' ? 'Read Full Article' : 'Start Course'}
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <>
                  {/* Premium Content Preview */}
                  <Card className="bg-gradient-to-br from-premium/5 to-accent/5 border-premium/20 mb-8">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-premium">
                        <Crown className="h-5 w-5" />
                        Premium Content Preview
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {type === 'blog' ? (
                        <div className="space-y-4">
                          <p className="text-muted-foreground">
                            This premium blog post contains advanced concepts and detailed explanations that will help you master your skills.
                          </p>
                          <div className="space-y-2">
                            <p className="font-medium">What you'll learn:</p>
                            <ul className="space-y-1 text-sm text-muted-foreground">
                              {(content as Blog).tags?.slice(0, 4).map((tag, index) => (
                                <li key={index} className="flex items-center gap-2">
                                  <div className="w-1.5 h-1.5 rounded-full bg-premium"></div>
                                  {tag}
                                </li>
                              )) || (
                                <li className="flex items-center gap-2">
                                  <div className="w-1.5 h-1.5 rounded-full bg-premium"></div>
                                  Advanced concepts and techniques
                                </li>
                              )}
                            </ul>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <p className="text-muted-foreground">
                            This comprehensive course includes hands-on projects, downloadable resources, and lifetime access to all content.
                          </p>
                          <div className="space-y-2">
                            <p className="font-medium">Course modules:</p>
                            <ul className="space-y-1 text-sm text-muted-foreground">
                              {(content as Course).modules?.slice(0, 4).map((module, index) => (
                                <li key={index} className="flex items-center gap-2">
                                  <div className="w-1.5 h-1.5 rounded-full bg-premium"></div>
                                  {module}
                                </li>
                              )) || (
                                <li className="flex items-center gap-2">
                                  <div className="w-1.5 h-1.5 rounded-full bg-premium"></div>
                                  Comprehensive learning modules
                                </li>
                              )}
                            </ul>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Subscribe Button */}
                  <div className="text-center">
                    <Button
                      onClick={handleSubscribe}
                      size="lg"
                      className="bg-gradient-premium hover:bg-gradient-premium/90 text-premium-foreground px-8 py-3 text-lg"
                    >
                      <Crown className="h-5 w-5 mr-2" />
                      Subscribe to Access Premium Content
                    </Button>
                    <p className="text-sm text-muted-foreground mt-3">
                      Get access to all premium content with a monthly subscription
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* UPI Payment Modal */}
      <UPIPayment
        selectedPlan={{
          name: "Premium",
          price: type === 'course' ? String((content as Course).price) : "19",
          description: `Access to premium ${type === 'blog' ? 'blog posts' : 'video courses'}`,
          features: [
            "All premium content",
            "Downloadable resources",
            "Priority support",
            "Progress tracking"
          ]
        }}
        isOpen={openUPI}
        onClose={handleCloseUPI}
      />
    </div>
  );
};

export default PremiumDetails;
