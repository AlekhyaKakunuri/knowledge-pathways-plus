import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import BlogCard from "./BlogCard";
import { useData } from "@/contexts/DataContext";
import { Lock } from "lucide-react";

const PopularBlogsSection = () => {
  const { currentUser } = useAuth();
  const { getPopularBlogs, getBlogs, state } = useData();
  
  const blogs = getPopularBlogs(3);
  const allBlogs = getBlogs();
  const loading = state.loading.blogs;


  if (loading) {
    return (
      <section className="py-6 md:py-8 lg:py-10 bg-white px-4">
        <div className="container">
        <div className="text-center mb-4 md:mb-6 lg:mb-8">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
            Popular Blogs
          </h2>
          <Button asChild size="sm" className="bg-theme-primary hover:bg-theme-primary-hover text-white transition-all duration-300 px-3 md:px-4 py-2 text-sm">
            <Link to="/blogs">View All Blogs</Link>
          </Button>
        </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden bg-white border-0 shadow-md">
                <div className="animate-pulse">
                  <div className="w-full h-48 bg-gray-300"></div>
                  <CardHeader className="p-6">
                    <div className="h-6 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded"></div>
                  </CardHeader>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Show only first 3 blogs, fallback to recent blogs if no popular ones
  const displayBlogs = blogs.length > 0 ? blogs.slice(0, 3) : allBlogs.slice(0, 3);
  const hasMoreBlogs = allBlogs.length > 3;

  return (
    <section className="py-6 md:py-8 lg:py-10 bg-gray-50 px-4">
      <div className="container">
        <div className="text-center mb-4 md:mb-6 lg:mb-8">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
            Popular Blogs
          </h2>
          {hasMoreBlogs && (
            <Button asChild size="sm" className="bg-theme-primary hover:bg-theme-primary-hover text-white transition-all duration-300 px-3 md:px-4 py-2 text-sm">
              <Link to="/blogs">View All Blogs</Link>
            </Button>
          )}
        </div>
        
        {displayBlogs.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="h-16 w-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No articles yet</h3>
            <p className="text-gray-500 mb-6">
              We're working on creating amazing content for you. Check back soon!
            </p>
            <Link to="/blogs">
              <Button variant="outline" size="lg">
                Explore All Articles
              </Button>
            </Link>
          </div>
        ) : (
          <>
            {/* Mobile: Horizontal scroll */}
            <div className="sm:hidden">
              <div className="flex gap-2 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
                {displayBlogs.map((blog) => (
                  <div key={blog.id} className="relative w-[200px] flex-shrink-0">
                    <BlogCard
                      blog={{
                        id: blog.id,
                        title: blog.title,
                        excerpt: blog.excerpt,
                        content: blog.content_html,
                        is_premium: blog.access_type === 'premium',
                        is_popular: blog.labels?.includes('Most Popular') || blog.labels?.includes('popular') || false,
                        tags: blog.tags || [],
                        labels: blog.labels || [],
                        access_type: blog.access_type,
                        thumbnail_url: blog.thumbnail_url,
                        featured_image_url: blog.thumbnail_url || blog.cover_url || 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=500&h=300&fit=crop'
                      }}
                    />
                    
                    {/* Premium Lock Overlay */}
                    {blog.access_type === 'premium' && !currentUser && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                        <div className="text-center text-white">
                          <Lock className="h-6 w-6 mx-auto mb-1" />
                          <p className="text-xs font-medium">Premium</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Desktop: Grid layout */}
            <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {displayBlogs.map((blog) => (
                <div key={blog.id} className="relative">
                  <BlogCard
                    blog={{
                      id: blog.id,
                      title: blog.title,
                      excerpt: blog.excerpt,
                      content: blog.content_html,
                      is_premium: blog.access_type === 'premium',
                      is_popular: blog.labels?.includes('Most Popular') || blog.labels?.includes('popular') || false,
                      tags: blog.tags || [],
                      labels: blog.labels || [],
                      access_type: blog.access_type,
                      thumbnail_url: blog.thumbnail_url,
                      featured_image_url: blog.thumbnail_url || blog.cover_url || 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=500&h=300&fit=crop'
                    }}
                  />
                  
                  {/* Premium Lock Overlay */}
                  {blog.access_type === 'premium' && !currentUser && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                      <div className="text-center text-white">
                        <Lock className="h-6 w-6 mx-auto mb-1" />
                        <p className="text-xs font-medium">Premium</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default PopularBlogsSection;
