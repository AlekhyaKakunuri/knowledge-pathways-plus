import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Eye, BookOpen, Crown, Lock, Unlock, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Mock data for demonstration
const mockBlogs = [
  {
    id: "1",
    title: "Getting Started with React Development",
    excerpt: "Learn the fundamentals of React development including components, state management, and hooks. This comprehensive guide will take you from beginner to intermediate level.",
    content: "Learn the fundamentals of React development including components, state management, and hooks. This comprehensive guide will take you from beginner to intermediate level. React is a powerful JavaScript library for building user interfaces, particularly single-page applications. It's used for handling the view layer and can be used for developing both web and mobile applications. React allows developers to create large web applications that can change data, without reloading the page. Its main goal is to be fast, scalable, and simple. It works only on user interfaces in the application. This corresponds to the view in the MVC template. It can be used with a combination of other JavaScript libraries or frameworks, such as Angular JS in MVC. React was created by Jordan Walke, a software engineer at Facebook. It was first deployed on Facebook's News Feed in 2011 and later on Instagram in 2012. It was open-sourced at JSConf US in May 2013. React Native, which enables mobile application development with React, was released in March 2015. React was created by Jordan Walke, a software engineer at Facebook. It was first deployed on Facebook's News Feed in 2011 and later on Instagram in 2012. It was open-sourced at JSConf US in May 2013. React Native, which enables mobile application development with React, was released in March 2015.",
    is_premium: false,
    tags: ["React", "JavaScript", "Frontend"],
    created_at: "2024-01-15"
  },
  {
    id: "2",
    title: "Advanced TypeScript Patterns",
    excerpt: "Explore advanced TypeScript patterns and best practices for building scalable applications. Learn about generics, decorators, and advanced type manipulation.",
    content: "Explore advanced TypeScript patterns and best practices for building scalable applications. Learn about generics, decorators, and advanced type manipulation. TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale. TypeScript adds optional types to JavaScript that support tools for large-scale JavaScript applications for any browser, for any host, on any OS. TypeScript compiles to readable, standards-based JavaScript. TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale. TypeScript adds optional types to JavaScript that support tools for large-scale JavaScript applications for any browser, for any host, on any OS. TypeScript compiles to readable, standards-based JavaScript.",
    is_premium: true,
    tags: ["TypeScript", "Advanced", "Programming"],
    created_at: "2024-01-10"
  },
  {
    id: "3",
    title: "Building REST APIs with Node.js",
    excerpt: "Master the art of building robust REST APIs using Node.js and Express. Learn about authentication, validation, and best practices for production deployment.",
    content: "Master the art of building robust REST APIs using Node.js and Express. Learn about authentication, validation, and best practices for production deployment. Node.js is an open-source, cross-platform, back-end JavaScript runtime environment that runs on the V8 engine and executes JavaScript code outside a web browser. Node.js lets developers use JavaScript to write command line tools and for server-side scripting—running scripts server-side to produce dynamic web page content before the page is sent to the user's web browser. Consequently, Node.js represents a 'JavaScript everywhere' paradigm, unifying web-application development around a single programming language, rather than different languages for server-side and client-side scripts.",
    is_premium: false,
    tags: ["Node.js", "API", "Backend"],
    created_at: "2024-01-05"
  }
];

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(mockBlogs[0]);
  const [relatedBlogs, setRelatedBlogs] = useState(mockBlogs.slice(1));
  const [loading, setLoading] = useState(true);
  
  // Mock subscription status - will be replaced with REST API integration
  const canAccessPremiumContent = false;

  useEffect(() => {
    if (id) {
      // Simulate loading delay
      setTimeout(() => {
        const foundBlog = mockBlogs.find(b => b.id === id) || mockBlogs[0];
        setBlog(foundBlog);
        setRelatedBlogs(mockBlogs.filter(b => b.id !== foundBlog.id));
        setLoading(false);
      }, 1000);
    }
  }, [id]);

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(' ').length;
    return Math.ceil(words / wordsPerMinute);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  // Helper function to get premium content display info
  const getPremiumContentInfo = (isPremium: boolean) => {
    if (!isPremium) {
      return {
        badge: null,
        buttonText: "Read Article",
        buttonVariant: "default" as const,
        linkPath: (id: string) => `/blog/${id}`
      };
    }

    if (canAccessPremiumContent) {
      return {
        badge: (
          <Badge className="bg-green-100 text-green-700 border-green-200">
            <Unlock className="h-3 w-3 mr-1" />
            Unlocked
          </Badge>
        ),
        buttonText: "Read Full Article",
        buttonVariant: "default" as const,
        linkPath: (id: string) => `/blog/${id}`
      };
    }

    return {
      badge: (
        <Badge className="bg-gradient-premium text-premium-foreground">
          <Lock className="h-3 w-3 mr-1" />
          Premium
        </Badge>
      ),
      buttonText: "Unlock with Premium",
      buttonVariant: "premium" as const,
      linkPath: (id: string) => `/premium/blog/${id}`
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20">
          <div className="container">
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading blog...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20">
          <div className="container">
            <div className="text-center py-20">
              <h1 className="text-2xl font-bold mb-4">Blog Not Found</h1>
              <p className="text-muted-foreground mb-6">The blog you are looking for does not exist.</p>
              <Button asChild>
                <Link to="/blogs">Back to Blogs</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Blog Content */}
        <section className="py-12">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              {/* Back Button */}
              <div className="mb-6">
                <Button variant="ghost" asChild className="gap-2">
                  <Link to="/blogs">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Blogs
                  </Link>
                </Button>
              </div>

              {/* Header */}
              <div className="mb-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex gap-2">
                    {blog.tags?.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-sm">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  {getPremiumContentInfo(blog.is_premium).badge}
                </div>

                <h1 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                  {blog.title}
                </h1>

                {blog.excerpt && (
                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                    {blog.excerpt}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {getReadingTime(blog.content)} min read
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    {formatDate(blog.created_at)}
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    Published
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mb-8">
                  {blog.is_premium && !canAccessPremiumContent ? (
                    <Button variant="premium" size="lg" asChild>
                      <Link to={`/premium/blog/${blog.id}`}>
                        <Crown className="h-4 w-4 mr-2" />
                        Unlock with Premium
                      </Link>
                    </Button>
                  ) : (
                    <Button variant="default" size="lg" asChild>
                      <Link to={`/blog/${blog.id}`}>
                        <BookOpen className="h-4 w-4 mr-2" />
                        Read Full Article
                      </Link>
                    </Button>
                  )}
                  
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/pricing">
                      <Crown className="h-4 w-4 mr-2" />
                      View Premium Plans
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Content Preview */}
              <div className="prose prose-lg max-w-none mb-12">
                <div className="bg-muted/20 rounded-lg p-6 border">
                  <h3 className="text-lg font-semibold mb-3">Content Preview</h3>
                  <div className="line-clamp-6 text-muted-foreground">
                    {blog.content.substring(0, 500)}...
                  </div>
                  {blog.is_premium && !canAccessPremiumContent && (
                    <div className="mt-4 p-4 bg-gradient-to-r from-premium/10 to-accent/10 rounded-lg border border-premium/20">
                      <p className="text-sm text-premium font-medium">
                        🔒 This is premium content. Subscribe to unlock the full article and access all premium features.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Related Blogs */}
              {relatedBlogs.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {relatedBlogs.map((relatedBlog) => {
                      const contentInfo = getPremiumContentInfo(relatedBlog.is_premium);
                      return (
                        <Card key={relatedBlog.id} className="group hover:shadow-lg transition-all duration-300">
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                              <div className="flex gap-2">
                                {relatedBlog.tags?.slice(0, 2).map((tag, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                              {contentInfo.badge}
                            </div>
                            <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                              {relatedBlog.title}
                            </CardTitle>
                          </CardHeader>
                          
                          <CardContent className="pt-0">
                            <CardDescription className="line-clamp-2 mb-3">
                              {relatedBlog.content.substring(0, 100)}...
                            </CardDescription>
                            <Button
                              variant={contentInfo.buttonVariant}
                              size="sm"
                              className="w-full"
                              asChild
                            >
                              <Link to={contentInfo.linkPath(relatedBlog.id)}>
                                {contentInfo.buttonText}
                              </Link>
                            </Button>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Call to Action */}
              <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Enjoyed this article?</h3>
                <p className="text-muted-foreground mb-6">
                  Subscribe to our premium plan to unlock access to all premium content and exclusive articles.
                </p>
                <div className="flex gap-4 justify-center">
                  <Button variant="outline" asChild>
                    <Link to="/blogs">Browse More Blogs</Link>
                  </Button>
                  <Button variant="default" asChild>
                    <Link to="/pricing">View Pricing Plans</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogDetail;