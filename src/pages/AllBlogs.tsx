import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import BlogCard from "@/components/BlogCard";
import { useData } from "@/contexts/DataContext";
import { Blog } from "@/lib/blogService";
import { Lock, User, AlertCircle, Search, Filter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const AllBlogs = () => {
  const { currentUser } = useAuth();
  const { getBlogs, state } = useData();
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const blogs = getBlogs();
  const loading = state.loading.blogs;

  useEffect(() => {
    let filtered = [...blogs];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(blog => blog.category === selectedCategory);
    }

    // Filter by access type
    if (selectedFilter === "free") {
      filtered = filtered.filter(blog => blog.access_type === "free");
    } else if (selectedFilter === "premium") {
      filtered = filtered.filter(blog => blog.access_type === "premium");
    }

    setFilteredBlogs(filtered);
  }, [blogs, searchTerm, selectedCategory, selectedFilter]);

  const getUniqueCategories = () => {
    const categories = blogs.map(blog => blog.category);
    return Array.from(new Set(categories));
  };

  const handleBlogClick = (blog: Blog) => {
    if (blog.access_type === 'premium' && !currentUser) {
      alert('Please sign in to read premium content');
      return;
    }
    window.location.href = `/blog/${blog.id}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading blogs...</p>
            </div>
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
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Knowledge Hub</h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Discover insights, tutorials, and expert knowledge
          </p>
          
          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search blogs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-12 text-gray-900 pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-48 h-12 text-gray-900">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {getUniqueCategories().map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                <SelectTrigger className="w-full md:w-48 h-12 text-gray-900">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Content</SelectItem>
                  <SelectItem value="free">Free Content</SelectItem>
                  <SelectItem value="premium">Premium Content</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Results Count */}
        <div className="mb-8">
          <p className="text-gray-600">
            Showing {filteredBlogs.length} of {blogs.length} blogs
          </p>
        </div>


        {/* Blogs Grid */}
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <User className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No blogs found</h3>
            <p className="text-gray-500">
              Try adjusting your search terms or filters
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
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
                      <Lock className="h-8 w-8 mx-auto mb-2" />
                      <p className="text-sm font-medium">Premium Content</p>
                      <p className="text-xs opacity-90">Sign in to read</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default AllBlogs;