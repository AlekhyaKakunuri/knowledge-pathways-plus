import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import BlogCard from "./BlogCard";

// Mock data for demonstration - updated with is_popular field
const mockBlogs = [
  {
    id: "1",
    title: "Getting Started with React Development",
    excerpt: "Learn the fundamentals of React development including components, state management, and hooks. This comprehensive guide will take you from beginner to intermediate level.",
    content: "Learn the fundamentals of React development including components, state management, and hooks. This comprehensive guide will take you from beginner to intermediate level.",
    is_premium: false,
    is_popular: true,
    is_new: false,
    created_at: "2024-01-15",
    tags: ["React", "JavaScript", "Frontend"],
    featured_image_url: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&h=300&fit=crop"
  },
  {
    id: "2",
    title: "Advanced TypeScript Patterns",
    excerpt: "Explore advanced TypeScript patterns and best practices for building scalable applications. Learn about generics, decorators, and advanced type manipulation.",
    content: "Explore advanced TypeScript patterns and best practices for building scalable applications. Learn about generics, decorators, and advanced type manipulation.",
    is_premium: true,
    is_popular: false,
    is_new: false,
    created_at: "2024-01-10",
    tags: ["TypeScript", "Advanced", "Programming"],
    featured_image_url: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=500&h=300&fit=crop"
  },
  {
    id: "3",
    title: "Building REST APIs with Node.js",
    excerpt: "Master the art of building robust REST APIs using Node.js and Express. Learn about authentication, validation, and best practices for production deployment.",
    content: "Master the art of building robust REST APIs using Node.js and Express. Learn about authentication, validation, and best practices for production deployment.",
    is_premium: false,
    is_popular: false,
    is_new: true,
    created_at: "2024-01-20",
    tags: ["Node.js", "API", "Backend"],
    featured_image_url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&h=300&fit=crop"
  },
  {
    id: "4",
    title: "Machine Learning Fundamentals",
    excerpt: "Dive into the world of machine learning with this comprehensive guide covering algorithms, data preprocessing, and model evaluation.",
    content: "Dive into the world of machine learning with this comprehensive guide covering algorithms, data preprocessing, and model evaluation.",
    is_premium: true,
    is_popular: true,
    is_new: false,
    created_at: "2024-01-12",
    tags: ["Machine Learning", "AI", "Python"],
    featured_image_url: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=500&h=300&fit=crop"
  },
  {
    id: "5",
    title: "CSS Grid Layout Mastery",
    excerpt: "Learn how to create complex layouts with CSS Grid. This free guide covers everything from basic concepts to advanced techniques.",
    content: "Learn how to create complex layouts with CSS Grid. This free guide covers everything from basic concepts to advanced techniques.",
    is_premium: false,
    is_popular: false,
    is_new: true,
    created_at: "2024-01-22",
    tags: ["CSS", "Frontend", "Layout"],
    featured_image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=300&fit=crop"
  },
  {
    id: "6",
    title: "Docker for Developers",
    excerpt: "Master containerization with Docker. Learn how to build, deploy, and manage applications using Docker containers.",
    content: "Master containerization with Docker. Learn how to build, deploy, and manage applications using Docker containers.",
    is_premium: true,
    is_popular: false,
    is_new: true,
    created_at: "2024-01-25",
    tags: ["Docker", "DevOps", "Containers"],
    featured_image_url: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=500&h=300&fit=crop"
  }
];

const PopularBlogsSection = () => {
  const [blogs, setBlogs] = useState(mockBlogs);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <section className="py-8 md:py-12 lg:py-16 bg-gray-50 px-4">
        <div className="container">
          <div className="flex items-center justify-between mb-6 md:mb-8 lg:mb-12">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">
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

  // Show only first 3 blogs
  const displayBlogs = blogs.slice(0, 3);
  const hasMoreBlogs = blogs.length > 3;

  return (
    <section className="py-8 md:py-12 lg:py-16 bg-gray-50 px-4">
      <div className="container">
        <div className="flex items-center justify-between mb-6 md:mb-8 lg:mb-12">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">
            Popular Blogs
          </h2>
          {hasMoreBlogs && (
            <Button asChild size="sm" className="bg-theme-primary hover:bg-theme-primary-hover text-white transition-all duration-300 px-3 md:px-4 py-2 text-sm">
              <Link to="/blogs">View All Blogs</Link>
            </Button>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {displayBlogs.map((blog) => (
            <BlogCard 
              key={blog.id} 
              blog={blog} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularBlogsSection;
