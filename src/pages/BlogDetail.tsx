import { useParams, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Eye, Crown, Lock, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const BlogDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  
  // Sample blog data - in a real app, this would come from your database
  const blogPosts = [
    {
      id: 1,
      title: "Introduction to Modern Web Development",
      description: "Learn the fundamentals of HTML, CSS, and JavaScript in this comprehensive guide.",
      content: `
        <h2>Getting Started with Web Development</h2>
        <p>Web development has evolved significantly over the years. In this comprehensive guide, we'll explore the fundamental technologies that power the modern web.</p>
        
        <h3>HTML: The Foundation</h3>
        <p>HTML (HyperText Markup Language) is the backbone of any web page. It provides the structure and semantic meaning to your content...</p>
        
        <h3>CSS: Styling and Layout</h3>
        <p>CSS (Cascading Style Sheets) is responsible for the visual presentation of your HTML elements. With modern CSS, you can create stunning layouts and animations...</p>
        
        <h3>JavaScript: Adding Interactivity</h3>
        <p>JavaScript brings your web pages to life by adding interactivity and dynamic behavior. From simple form validation to complex single-page applications...</p>
        
        <h3>Modern Development Tools</h3>
        <p>Today's web development ecosystem includes powerful tools like bundlers, frameworks, and development servers that make building web applications more efficient...</p>
      `,
      readTime: "8 min read",
      views: "2.1k",
      isPremium: false,
      category: "Web Development",
      author: "John Doe",
      publishedAt: "2024-01-15"
    },
    {
      id: 2,
      title: "Advanced React Patterns and Best Practices",
      description: "Deep dive into advanced React concepts including hooks, context, and performance optimization.",
      content: `
        <h2>Mastering Advanced React Patterns</h2>
        <p>React has become one of the most popular frontend frameworks, and mastering its advanced patterns is crucial for building scalable applications.</p>
        
        <h3>Custom Hooks</h3>
        <p>Custom hooks are a powerful way to extract component logic into reusable functions...</p>
        
        <h3>Context and State Management</h3>
        <p>Learn how to effectively manage state across your application using React Context and modern state management patterns...</p>
        
        <h3>Performance Optimization</h3>
        <p>Discover techniques for optimizing React applications, including memoization, lazy loading, and efficient rendering...</p>
        
        <h3>Advanced Component Patterns</h3>
        <p>Explore compound components, render props, and higher-order components to create flexible and reusable UI elements...</p>
      `,
      readTime: "12 min read",
      views: "1.8k",
      isPremium: true,
      category: "React",
      author: "Jane Smith",
      publishedAt: "2024-01-10"
    },
    {
      id: 3,
      title: "Building Scalable APIs with Node.js",
      description: "Learn how to create robust and scalable backend APIs using Node.js and Express.",
      content: `
        <h2>Creating Robust Backend APIs</h2>
        <p>Building scalable APIs is essential for modern web applications. Node.js provides an excellent platform for creating high-performance backend services.</p>
        
        <h3>Setting Up Express</h3>
        <p>Express.js is the most popular Node.js framework for building web applications and APIs...</p>
        
        <h3>Database Integration</h3>
        <p>Learn how to integrate your API with various databases, from SQL to NoSQL solutions...</p>
        
        <h3>Authentication and Security</h3>
        <p>Implement secure authentication mechanisms and protect your API from common vulnerabilities...</p>
        
        <h3>Performance and Scaling</h3>
        <p>Optimize your API for performance and learn strategies for scaling to handle increased load...</p>
      `,
      readTime: "15 min read",
      views: "3.2k",
      isPremium: false,
      category: "Backend",
      author: "Mike Johnson",
      publishedAt: "2024-01-05"
    }
  ];

  const blog = blogPosts.find(post => post.id === parseInt(id || "0"));
  
  if (!blog) {
    return <Navigate to="/404" replace />;
  }

  // Check if user has subscription for premium content
  const hasSubscription = false; // TODO: Check actual subscription status from Supabase
  const canViewContent = !blog.isPremium || hasSubscription;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        <div className="container max-w-4xl mx-auto py-8 px-4">
          {/* Back Navigation */}
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          {/* Blog Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="secondary">{blog.category}</Badge>
              {blog.isPremium && (
                <Badge className="bg-gradient-premium text-premium-foreground">
                  <Crown className="h-3 w-3 mr-1" />
                  Premium
                </Badge>
              )}
            </div>
            
            <h1 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
              {blog.title}
            </h1>
            
            <p className="text-lg text-muted-foreground mb-6">
              {blog.description}
            </p>
            
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span>By {blog.author}</span>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {blog.readTime}
              </div>
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                {blog.views}
              </div>
              <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Content Area */}
          {canViewContent ? (
            <Card className="bg-gradient-card border-0">
              <CardContent className="p-8">
                <div 
                  className="prose prose-lg max-w-none dark:prose-invert"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-gradient-card border-0 text-center">
              <CardHeader className="pb-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-gradient-premium/10 flex items-center justify-center mb-4">
                  <Lock className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl mb-2">Premium Content</CardTitle>
                <p className="text-muted-foreground">
                  This content is available exclusively to our premium subscribers.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted/50 rounded-lg p-6">
                  <h4 className="font-semibold mb-2">What you'll get with Premium:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1 text-left max-w-md mx-auto">
                    <li>• Access to all premium blogs and articles</li>
                    <li>• Exclusive video content and tutorials</li>
                    <li>• Advanced coding examples and projects</li>
                    <li>• Priority support and community access</li>
                  </ul>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  {user ? (
                    <Button className="bg-gradient-premium hover:opacity-90">
                      <Crown className="h-4 w-4 mr-2" />
                      Upgrade to Premium
                    </Button>
                  ) : (
                    <>
                      <Button asChild>
                        <Link to="/auth">Sign In to Subscribe</Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link to="/auth">Create Account</Link>
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogDetail;