import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useSubscriptionCheck } from "@/hooks/useSubscriptionCheck";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Crown, Lock, Unlock, ArrowLeft, User, Calendar, AlertCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useData } from "@/contexts/DataContext";
import { Blog } from "@/lib/blogService";
import "@/styles/blog-content.css";

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { currentUser } = useAuth();
  const { getBlogById, state } = useData();
  const { canAccessPremiumContent } = useSubscriptionCheck();
  const navigate = useNavigate();

  const blog = id ? getBlogById(id) : null;
  const loading = state.loading.blogs;
  const error = blog ? null : (id ? "Blog not found" : "Blog ID not provided");

  // Check if user can access premium content
  const hasAccessToPremiumBlog = currentUser && canAccessPremiumContent && blog?.access_type === 'premium';
  
  // Debug logging

  const handleSubscribe = () => {
    // Redirect to pricing page for subscription
    navigate('/pricing');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading blog...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Blog Not Found</h1>
            <p className="text-gray-600 mb-6">{error || "The blog you're looking for doesn't exist."}</p>
            <Link to="/blogs">
              <Button>Back to Blogs</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <div className="blog-detail-header bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 flex items-center">
        <div className="container mx-auto px-4 w-full">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Link to="/blogs" className="inline-flex items-center text-blue-100 hover:text-white mb-4 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blogs
            </Link>

            {/* Blog Meta */}
            <div className="flex items-center gap-4 mb-4 text-blue-100 text-sm">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{blog.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(blog.published_at)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{blog.readTime}</span>
              </div>
              {blog.language && (
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-white/20 px-2 py-1 rounded">
                    {blog.language.toUpperCase()}
                  </span>
                </div>
              )}
            </div>

            {/* Title */}
            <h1 className="blog-title text-3xl lg:text-4xl font-bold mb-4 leading-tight">
              {blog.title}
            </h1>

            {/* Excerpt */}
            <p className="blog-excerpt text-lg text-blue-100 mb-6 leading-relaxed">
              {blog.excerpt}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {blog.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="bg-white/20 text-white border-white/30">
                  {tag}
                </Badge>
              ))}
              {blog.labels.map((label, index) => (
                <Badge key={`label-${index}`} variant="outline" className="bg-white/10 text-white border-white/30">
                  {label}
                </Badge>
              ))}
            </div>

            {/* Access Type Badge */}
            <div className="flex items-center gap-2">
              {blog.access_type === 'premium' ? (
                <Badge className="bg-yellow-500 text-yellow-900">
                  <Crown className="h-3 w-3 mr-1" />
                  Premium Content
                </Badge>
              ) : (
                <Badge className="bg-green-500 text-green-900">
                  <Unlock className="h-3 w-3 mr-1" />
                  Free Content
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Premium Content Access Check */}
          {blog.access_type === 'premium' && !hasAccessToPremiumBlog && (
            <Card className="mb-8 border-amber-200 bg-amber-50">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Lock className="h-8 w-8 text-amber-600 mt-1" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-amber-800 mb-2">
                      Premium Content
                    </h3>
                    <p className="text-amber-700 mb-4">
                      This blog post contains premium content. {!currentUser ? 'Please sign in and subscribe' : 'Please subscribe to a premium plan'} to access the full article.
                    </p>
                    <div className="flex gap-3">
                      {!currentUser ? (
                        <Link to="/signin">
                          <Button className="bg-amber-600 hover:bg-amber-700">
                            Sign In
                          </Button>
                        </Link>
                      ) : null}
                      <Button variant="outline" onClick={handleSubscribe}>
                        View Subscription Plans
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Content Preview for Premium (when not authenticated or no subscription) */}
          {blog.access_type === 'premium' && !hasAccessToPremiumBlog ? (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Content Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="blog-content">
                  <p className="text-gray-600">
                    {blog.excerpt}
                  </p>
                  <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                    <p className="text-sm text-gray-500 text-center">
                      {!currentUser ? 'Sign in to read the full content' : 'Subscribe to a premium plan to read the full content'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            /* Full Content */
            <Card className="mb-8">
              <CardContent className="p-8">
                <div 
                  className="blog-content"
                  dangerouslySetInnerHTML={{ 
                    __html: blog.content_html 
                  }}
                />
              </CardContent>
            </Card>
          )}

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BlogDetail;