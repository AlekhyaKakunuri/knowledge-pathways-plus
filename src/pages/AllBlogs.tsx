import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import BlogGrid from "@/components/BlogGrid";
import { useData } from "@/contexts/DataContext";
import { Blog } from "@/lib/blogService";
import { Lock, User, AlertCircle, Search, Filter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const AllBlogs = () => {
  const { state } = useData();
  const { blogs, loading } = state;
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  // Filter and sort blogs
  const filteredBlogs = useMemo(() => {
    let filtered = blogs.filter(blog => 
      blog.published_at && new Date(blog.published_at) <= new Date()
    );

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(blog => 
        blog.tags.includes(selectedCategory) || 
        blog.labels.includes(selectedCategory)
      );
    }

    // Sort blogs
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());
        break;
      case "oldest":
        filtered.sort((a, b) => new Date(a.published_at).getTime() - new Date(b.published_at).getTime());
        break;
      case "title":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    return filtered;
  }, [blogs, searchTerm, selectedCategory, sortBy]);

  // Get unique categories from tags and labels
  const categories = useMemo(() => {
    const allTags = blogs.flatMap(blog => blog.tags || []);
    const allLabels = blogs.flatMap(blog => blog.labels || []);
    const uniqueCategories = [...new Set([...allTags, ...allLabels])];
    return uniqueCategories.sort();
  }, [blogs]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container px-4">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                All Articles
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8">
                Explore our comprehensive collection of articles on AI, development, and career growth
              </p>
            </div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="py-8 bg-white border-b">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Category Filter */}
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="title">Title A-Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Results Count */}
              <div className="text-sm text-gray-600">
                <p>
                  Showing {filteredBlogs.length} of {blogs.length} blogs
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Blogs Grid */}
        <section className="py-8">
          <div className="container px-4">
            <BlogGrid 
              blogs={filteredBlogs} 
              loading={loading.blogs}
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AllBlogs;