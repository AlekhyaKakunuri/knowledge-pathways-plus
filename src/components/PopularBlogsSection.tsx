import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { blogService, BlogWithImage } from "@/services/blogService";

const PopularBlogsSection = () => {
  const [blogs, setBlogs] = useState<BlogWithImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const fetchedBlogs = await blogService.getPopularBlogs(6);
        setBlogs(fetchedBlogs);
      } catch (err) {
        setError("Failed to fetch blogs");
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <section className="py-16 lg:py-20 bg-gray-50 px-4">
        <div className="container">
          <div className="flex items-center justify-between mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
              Popular Blogs
            </h2>
            <Button asChild variant="outline" size="sm" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 px-4 py-2">
              <Link to="/blogs">View All Blogs</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
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

  if (error) {
    return (
      <section className="py-16 lg:py-20 bg-gray-50 px-4">
        <div className="container text-center">
          <p className="text-red-600 text-lg">{error}</p>
        </div>
      </section>
    );
  }

  // Show only first 3 blogs
  const displayBlogs = blogs.slice(0, 3);
  const hasMoreBlogs = blogs.length > 3;

  return (
    <section className="py-16 lg:py-20 bg-gray-50 px-4">
      <div className="container">
        <div className="flex items-center justify-between mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            Popular Blogs
          </h2>
          {hasMoreBlogs && (
            <Button asChild variant="outline" size="sm" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 px-4 py-2">
              <Link to="/blogs">View All Blogs</Link>
            </Button>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {displayBlogs.map((blog, index) => (
            <Card key={blog.id} className="overflow-hidden bg-white border-0 shadow-md hover:shadow-lg transition-shadow flex flex-col">
              <div className="relative">
                <img 
                  src={blog.featured_image_url} 
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
              </div>
              <CardHeader className="p-6 pb-4 flex-grow">
                {/* Badge positioned below image, above title - matching image colors exactly */}
                {index === 0 && (
                  <Badge className="inline-block mb-3 text-xs bg-red-500 text-white px-2 py-1 w-fit">
                    Most Popular
                  </Badge>
                )}
                {index === 1 && (
                  <Badge className="inline-block mb-3 text-xs bg-yellow-500 text-white px-2 py-1 w-fit">
                    Premium
                  </Badge>
                )}
                {/* No badge for the third card as shown in the image */}
                
                <CardTitle className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                  {blog.title}
                </CardTitle>
                <CardDescription className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
                  {blog.excerpt || blog.content.substring(0, 120) + '...'}
                </CardDescription>
                
                {/* Tags positioned above Read More button */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {blog.tags?.slice(0, 3).map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="secondary" className="text-xs bg-gray-100 text-gray-700 hover:bg-gray-200">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              
              {/* Read More button positioned at the bottom of each card */}
              <CardContent className="p-6 pt-0 mt-auto">
                <Link 
                  to={`/blog/${blog.id}`}
                  className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center text-sm transition-colors hover:underline"
                >
                  Read More
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularBlogsSection;
