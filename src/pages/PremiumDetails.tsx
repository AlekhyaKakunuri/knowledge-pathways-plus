import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Eye, BookOpen, Crown, ArrowLeft, Star, Users, Play, CheckCircle, Lock, Loader2, Download } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UPIPayment from "@/components/UPIPayment";

// Mock data for demonstration
const mockContent = {
  blog: {
    id: "1",
    title: "Advanced TypeScript Patterns",
    excerpt: "Explore advanced TypeScript patterns and best practices for building scalable applications. Learn about generics, decorators, and advanced type manipulation.",
    content: "Explore advanced TypeScript patterns and best practices for building scalable applications. Learn about generics, decorators, and advanced type manipulation. TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale. TypeScript adds optional types to JavaScript that support tools for large-scale JavaScript applications for any browser, for any host, on any OS. TypeScript compiles to readable, standards-based JavaScript.",
    is_premium: true,
    tags: ["TypeScript", "Advanced", "Programming"],
    created_at: "2024-01-10",
    author: "Jane Smith"
  },
  course: {
    id: "2",
    title: "AI Technologies",
    description: "Master artificial intelligence, machine learning, and deep learning. This advanced course covers cutting-edge AI technologies, neural networks, and practical applications in real-world scenarios.",
    duration: "12 weeks",
    students: "3.8k",
    category: "AI/ML",
    level: "Advanced",
    instructor: "Dr. Michael Chen",
    is_premium: true,
    price: 2999
  }
};

const PremiumDetails = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const [openUPI, setOpenUPI] = useState(false);
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Mock subscription status - will be replaced with REST API integration
  const canAccessPremiumContent = false;

  // Fetch content from mock data
  useEffect(() => {
    const fetchContent = () => {
      if (!id) return;

      setLoading(true);
      
      // Simulate API call delay
      setTimeout(() => {
        let contentData: any = null;
        
        if (type === 'blog') {
          contentData = mockContent.blog;
        } else if (type === 'course') {
          contentData = mockContent.course;
        }

        if (!contentData) {
          setLoading(false);
          return;
        }

        setContent(contentData);
        setLoading(false);
      }, 1000);
    };

    fetchContent();
  }, [type, id]);

  const handleSubscribe = () => {
    setOpenUPI(true);
  };

  const handleCloseUPI = () => {
    setOpenUPI(false);
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
  if (!content) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20">
          <div className="container text-center py-20">
            <h1 className="text-2xl font-bold mb-4">Content Not Found</h1>
            <p className="text-muted-foreground mb-6">The content you are looking for does not exist.</p>
            <Button onClick={() => navigate(-1)}>Go Back</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const isBlog = type === 'blog';
  const isCourse = type === 'course';

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <div className="container">
          {/* Back Button */}
          <div className="mb-6">
            <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Button>
          </div>

          {/* Content Header */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Badge className="bg-gradient-premium text-premium-foreground">
                  <Crown className="h-4 w-4 mr-1" />
                  Premium Content
                </Badge>
                <Badge variant="secondary">
                  {isBlog ? 'Blog Article' : 'Video Course'}
                </Badge>
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold mb-4">
                {content.title}
              </h1>

              {isBlog && content.excerpt && (
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  {content.excerpt}
                </p>
              )}

              {isCourse && (
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  {content.description}
                </p>
              )}

              {/* Content Stats */}
              <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground mb-6">
                {isBlog && (
                  <>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      8 min read
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      {new Date(content.created_at).toLocaleDateString()}
                    </div>
                  </>
                )}
                
                {isCourse && (
                  <>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {content.duration}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      {content.students} students
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      4.8 (1.2k reviews)
                    </div>
                  </>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 justify-center">
                {canAccessPremiumContent ? (
                  <Button size="lg" onClick={handleReadArticle}>
                    {isBlog ? (
                      <>
                        <BookOpen className="h-4 w-4 mr-2" />
                        Read Full Article
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Start Course
                      </>
                    )}
                  </Button>
                ) : (
                  <Button size="lg" onClick={handleSubscribe}>
                    <Crown className="h-4 w-4 mr-2" />
                    Unlock with Premium
                  </Button>
                )}
                
                <Button variant="outline" size="lg" onClick={() => navigate('/pricing')}>
                  <Crown className="h-4 w-4 mr-2" />
                  View Pricing Plans
                </Button>
              </div>
            </div>
          </div>

          {/* Content Preview */}
          <div className="max-w-4xl mx-auto mb-12">
            <Card className="bg-gradient-to-r from-premium/5 to-accent/5 border-premium/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Content Preview
                </CardTitle>
                <CardDescription>
                  Here's a preview of what you'll get with premium access
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isBlog && (
                  <div className="prose prose-lg max-w-none">
                    <div className="line-clamp-6 text-muted-foreground mb-4">
                      {content.content}
                    </div>
                    <div className="p-4 bg-gradient-to-r from-premium/10 to-accent/10 rounded-lg border border-premium/20">
                      <p className="text-sm text-premium font-medium">
                        🔒 This is premium content. Subscribe to unlock the full article and access all premium features.
                      </p>
                    </div>
                  </div>
                )}

                {isCourse && (
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="p-4 bg-background rounded-lg border">
                        <h4 className="font-semibold mb-2">Course Overview</h4>
                        <p className="text-sm text-muted-foreground">
                          Master {content.category} with {content.duration} of comprehensive content
                        </p>
                      </div>
                      <div className="p-4 bg-background rounded-lg border">
                        <h4 className="font-semibold mb-2">Instructor</h4>
                        <p className="text-sm text-muted-foreground">
                          Learn from {content.instructor}, an expert in {content.category}
                        </p>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gradient-to-r from-premium/10 to-accent/10 rounded-lg border border-premium/20">
                      <p className="text-sm text-premium font-medium">
                        🔒 This is a premium course. Subscribe to unlock full access to all video lessons, downloadable resources, and community support.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Premium Benefits */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Why Choose Premium?</h2>
              <p className="text-muted-foreground">
                Get unlimited access to all premium content and exclusive features
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="text-center">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Crown className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Premium Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Access to all premium blogs, courses, and exclusive content
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Download className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle className="text-lg">Downloadable Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Download course materials, code samples, and reference guides
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle className="text-lg">Community Access</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Join our premium community for networking and support
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Call to Action */}
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-8">
              <Crown className="h-16 w-16 text-primary mx-auto mb-6" />
              <h2 className="text-2xl font-bold mb-4">Ready to Unlock Premium?</h2>
              <p className="text-muted-foreground mb-6">
                Start your premium journey today and get unlimited access to all our content
              </p>
              <Button size="lg" onClick={handleSubscribe}>
                <Crown className="h-4 w-4 mr-2" />
                Subscribe Now
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* UPI Payment Modal */}
      <UPIPayment
        selectedPlan={{
          name: "Premium Plan",
          price: "999",
          description: "Unlock all premium content and features",
          features: ["All premium blogs", "All premium courses", "Downloadable resources", "Community access"]
        }}
        isOpen={openUPI}
        onClose={handleCloseUPI}
      />

      <Footer />
    </div>
  );
};

export default PremiumDetails;
