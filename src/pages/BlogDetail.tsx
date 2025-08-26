import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Eye, BookOpen, Crown, Lock, Unlock, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ContentService, Blog } from "@/services/contentService";
import { useSubscription } from "@/hooks/useSubscription";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Get subscription status
  const { canAccessPremiumContent, loading: subscriptionLoading } = useSubscription();

  useEffect(() => {
    if (id) {
      fetchBlog();
    }
  }, [id]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const blogData = await ContentService.getBlogById(id!);
      if (!blogData) {
        setError('Blog not found');
        return;
      }
      
      setBlog(blogData);
      
      // Fetch related blogs
      const related = await ContentService.getRelatedBlogs(id!, blogData.tags || []);
      setRelatedBlogs(related);
    } catch (err) {
      console.error('Error fetching blog:', err);
      setError('Failed to load blog');
    } finally {
      setLoading(false);
    }
  };

  const getReadingTime = (content: string) => {
    return ContentService.calculateReadingTime(content);
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
        linkPath: (id: string) => `/blog/${id}` // Premium users can access via regular blog route
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

  if (loading || subscriptionLoading) {
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

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20">
          <div className="container">
            <div className="text-center py-20">
              <h1 className="text-2xl font-bold mb-4">Blog Not Found</h1>
              <p className="text-muted-foreground mb-6">{error || 'The blog you are looking for does not exist.'}</p>
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
                    {ContentService.getContentPreview(blog.content, 500)}
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
                              {ContentService.getContentPreview(relatedBlog.content, 100)}
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