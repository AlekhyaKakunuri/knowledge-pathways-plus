import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import BlogCard from "@/components/BlogCard";

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

const AllBlogs = () => {
  const [blogs, setBlogs] = useState(mockBlogs);
  const [filteredBlogs, setFilteredBlogs] = useState(mockBlogs);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedFilter, setSelectedFilter] = useState("all");

  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = blogs;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (blog.excerpt && blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (blog.content && blog.content.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(blog =>
        blog.tags && blog.tags.some(tag => tag.toLowerCase() === selectedCategory.toLowerCase())
      );
    }

    // Filter by type (Most Popular, Premium, Free, New Blogs)
    if (selectedFilter !== "all") {
      switch (selectedFilter) {
        case "popular":
          filtered = filtered.filter(blog => blog.is_popular);
          break;
        case "premium":
          filtered = filtered.filter(blog => blog.is_premium);
          break;
        case "free":
          filtered = filtered.filter(blog => !blog.is_premium);
          break;
        case "new":
          filtered = filtered.filter(blog => blog.is_new);
          break;
      }
    }

    setFilteredBlogs(filtered);
  }, [blogs, searchTerm, selectedCategory, selectedFilter]);

  const getCategories = () => {
    const categories = new Set<string>();
    blogs.forEach(blog => {
      if (blog.tags) {
        blog.tags.forEach(tag => categories.add(tag));
      }
    });
    return Array.from(categories).sort();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="py-8 md:py-12 lg:py-16 px-4">
          <div className="container">
            <div className="text-center">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
                All Blogs
              </h1>
              <p className="text-sm md:text-base lg:text-lg text-gray-600">Loading blogs...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-8 md:py-12 lg:py-16 px-4">
        <div className="container">
          {/* Header */}
          <div className="text-center mb-6 md:mb-8 lg:mb-12">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
              All Blogs
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-gray-600 max-w-xl md:max-w-2xl mx-auto">
              Explore our collection of educational content and insights
            </p>
          </div>

          {/* Search and Filter Controls */}
          <div className="mb-6 md:mb-8 flex flex-col sm:flex-row gap-3 md:gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-md"
              />
            </div>
            <Select value={selectedFilter} onValueChange={setSelectedFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Blogs</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="new">New Blogs</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {getCategories().map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              Showing {filteredBlogs.length} of {blogs.length} blogs
            </p>
          </div>

          {/* Blog Grid - Using BlogCard component */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredBlogs.map((blog) => (
              <BlogCard 
                key={blog.id} 
                blog={blog} 
              />
            ))}
          </div>

          {/* No Results Message */}
          {filteredBlogs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg mb-4">No blogs found matching your criteria.</p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                  setSelectedFilter("all");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AllBlogs;