import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import BlogGrid from "./BlogGrid";
import { useData } from "@/contexts/DataContext";
import { Lock } from "lucide-react";

const PopularBlogsSection = () => {
  const { currentUser } = useAuth();
  const { state } = useData();
  const { blogs, loading } = state;

  // Filter and sort blogs
  const displayBlogs = blogs
    .filter(blog => blog.published_at && new Date(blog.published_at) <= new Date())
    .sort((a, b) => {
      // Sort by published date (newest first)
      return new Date(b.published_at).getTime() - new Date(a.published_at).getTime();
    })
    .slice(0, 6); // Show only 6 blogs

  const hasMoreBlogs = blogs.length > 6;

  return (
    <section className="py-4 md:py-6 lg:py-8 bg-white px-4">
      <div className="container">
        <div className="text-center mb-3 md:mb-4 lg:mb-6">
          <h2 className="text-base md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
            Popular Blogs
          </h2>
          {hasMoreBlogs && (
            <Button asChild size="sm" className="bg-theme-primary hover:bg-theme-primary-hover text-white transition-all duration-300 px-3 md:px-4 py-2 text-sm">
              <Link to="/blogs">View All Blogs</Link>
            </Button>
          )}
        </div>
        
        <BlogGrid 
          blogs={displayBlogs} 
          loading={loading.blogs}
        />
      </div>
    </section>
  );
};

export default PopularBlogsSection;