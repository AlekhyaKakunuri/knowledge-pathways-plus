import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Clock, BookOpen, Crown, Search, Lock, Unlock, Filter, X, TrendingUp, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ContentService, Blog, ContentFilters } from "@/services/contentService";
import { useSubscription } from "@/hooks/useSubscription";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<ContentFilters>({});
  const [categories, setCategories] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  
  // Get subscription status
  const { canAccessPremiumContent, loading: subscriptionLoading } = useSubscription();

  useEffect(() => {
    fetchBlogs();
    fetchCategories();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [blogs, filters]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const blogsData = await ContentService.getBlogs();
      setBlogs(blogsData);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const contentCategories = await ContentService.getContentCategories();
      setCategories(contentCategories.blogTags);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const applyFilters = () => {
    let filtered = [...blogs];

    // Apply search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm) ||
        blog.excerpt?.toLowerCase().includes(searchTerm) ||
        blog.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }

    // Apply category filter
    if (filters.category && filters.category !== 'all') {
      filtered = filtered.filter(blog =>
        blog.tags?.some(tag => tag.toLowerCase() === filters.category?.toLowerCase())
      );
    }

    // Apply premium filter
    if (filters.isPremium !== undefined) {
      filtered = filtered.filter(blog => blog.is_premium === filters.isPremium);
    }

    setFilteredBlogs(filtered);
  };

  const handleFilterChange = (key: keyof ContentFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  const getFilteredStats = () => {
    const total = blogs.length;
    const free = blogs.filter(blog => !blog.is_premium).length;
    const premium = blogs.filter(blog => blog.is_premium).length;
    const filtered = filteredBlogs.length;

    return { total, free, premium, filtered };
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

  const stats = getFilteredStats();

  if (loading || subscriptionLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20">
          <div className="container text-center py-20">
            <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">Loading blogs...</p>
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
        {/* Header */}
        <section className="bg-gradient-to-r from-background to-secondary/20 py-12">
          <div className="container text-center">
            <h1 className="text-4xl font-bold mb-4">All Blog Posts</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Explore our collection of articles covering web development, programming, and technology insights
            </p>
            
            {/* Content Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="bg-white/50 rounded-lg p-4">
                <div className="text-2xl font-bold text-primary">{stats.total}</div>
                <div className="text-sm text-muted-foreground">Total Blogs</div>
              </div>
              <div className="bg-white/50 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-600">{stats.free}</div>
                <div className="text-sm text-muted-foreground">Free Blogs</div>
              </div>
              <div className="bg-white/50 rounded-lg p-4">
                <div className="text-2xl font-bold text-premium">{stats.premium}</div>
                <div className="text-sm text-muted-foreground">Premium Blogs</div>
              </div>
              <div className="bg-white/50 rounded-lg p-4">
                <div className="text-2xl font-bold text-accent">{stats.filtered}</div>
                <div className="text-sm text-muted-foreground">Showing</div>
              </div>
            </div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="py-8">
          <div className="container">
            <div className="flex flex-col gap-4">
              {/* Search Bar */}
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search blogs..."
                  value={filters.search || ''}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filter Toggle */}
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2"
                >
                  <Filter className="h-4 w-4" />
                  {showFilters ? 'Hide Filters' : 'Show Filters'}
                </Button>
              </div>

              {/* Filters Panel */}
              {showFilters && (
                <div className="bg-white/50 rounded-lg p-6 max-w-2xl mx-auto w-full">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Filters</h3>
                    <Button variant="ghost" size="sm" onClick={clearFilters}>
                      <X className="h-4 w-4 mr-2" />
                      Clear All
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Category Filter */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">Category</label>
                      <select
                        value={filters.category || 'all'}
                        onChange={(e) => handleFilterChange('category', e.target.value)}
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="all">All Categories</option>
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Premium Filter */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">Content Type</label>
                      <select
                        value={filters.isPremium === undefined ? 'all' : filters.isPremium.toString()}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === 'all') {
                            handleFilterChange('isPremium', undefined);
                          } else {
                            handleFilterChange('isPremium', value === 'true');
                          }
                        }}
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="all">All Content</option>
                        <option value="false">Free Only</option>
                        <option value="true">Premium Only</option>
                      </select>
                    </div>

                    {/* Sort Options */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">Sort By</label>
                      <select
                        value={filters.sort || 'newest'}
                        onChange={(e) => handleFilterChange('sort', e.target.value)}
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="title">Title A-Z</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Blogs Grid */}
        <section className="py-12">
          <div className="container">
            {filteredBlogs.length === 0 ? (
              <div className="text-center py-20">
                <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No blogs found</h3>
                <p className="text-muted-foreground mb-6">
                  {filters.search || filters.category !== 'all' || filters.isPremium !== undefined
                    ? "Try adjusting your search or filters"
                    : "No blogs available at the moment"}
                </p>
                {Object.keys(filters).length > 0 && (
                  <Button onClick={clearFilters} variant="outline">
                    Clear Filters
                  </Button>
                )}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBlogs.map((blog) => {
                  const contentInfo = getPremiumContentInfo(blog.is_premium);
                  return (
                    <Card key={blog.id} className="group hover:shadow-lg transition-all duration-300">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex gap-2">
                            {blog.tags?.slice(0, 2).map((tag, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          {contentInfo.badge}
                        </div>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                          {blog.title}
                        </CardTitle>
                      </CardHeader>
                      
                      <CardContent className="pt-0">
                        <CardDescription className="line-clamp-3 mb-4">
                          {ContentService.getContentPreview(blog.content, 150)}
                        </CardDescription>
                        
                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-2">
                            <Clock className="h-3 w-3" />
                            {ContentService.calculateReadingTime(blog.content)} min read
                          </div>
                          <div className="flex items-center gap-2">
                            <BookOpen className="h-3 w-3" />
                            {new Date(blog.created_at).toLocaleDateString('en-IN', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </div>
                        </div>
                        
                        <Button
                          variant={contentInfo.buttonVariant}
                          className="w-full"
                          size="sm"
                          asChild
                        >
                          <Link to={contentInfo.linkPath(blog.id)}>
                            {contentInfo.buttonText}
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="container text-center">
            <TrendingUp className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Want More Content?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Subscribe to our premium plan and unlock access to all premium blog posts and exclusive content.
            </p>
            <div className="flex gap-4 justify-center">
              <Button variant="outline" asChild>
                <Link to="/pricing">View Pricing</Link>
              </Button>
              <Button variant="default" asChild>
                <Link to="/courses">Explore Courses</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AllBlogs;