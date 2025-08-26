import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Eye, BookOpen, Crown, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const AllBlogs = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock blog data - replace with actual data from Supabase
  const allBlogs = [
    {
      id: 1,
      title: "Introduction to Modern Web Development",
      description: "Learn the fundamentals of HTML, CSS, and JavaScript in this comprehensive guide.",
      readTime: "8 min read",
      views: "2.1k",
      isPremium: false,
      category: "Web Development",
      publishedAt: "2 days ago"
    },
    {
      id: 2,
      title: "Advanced React Patterns and Best Practices",
      description: "Deep dive into advanced React concepts including hooks, context, and performance optimization.",
      readTime: "12 min read",
      views: "1.8k",
      isPremium: true,
      category: "React",
      publishedAt: "1 week ago"
    },
    {
      id: 3,
      title: "Building Scalable APIs with Node.js",
      description: "Learn how to create robust and scalable backend APIs using Node.js and Express.",
      readTime: "15 min read",
      views: "3.2k",
      isPremium: false,
      category: "Backend",
      publishedAt: "3 days ago"
    },
    {
      id: 4,
      title: "Advanced TypeScript Techniques",
      description: "Master advanced TypeScript features for better type safety and developer experience.",
      readTime: "10 min read",
      views: "1.5k",
      isPremium: true,
      category: "TypeScript",
      publishedAt: "5 days ago"
    },
    {
      id: 5,
      title: "Database Design Fundamentals",
      description: "Understanding relational database design principles and best practices.",
      readTime: "20 min read",
      views: "2.8k",
      isPremium: false,
      category: "Database",
      publishedAt: "1 week ago"
    },
    {
      id: 6,
      title: "Machine Learning for Beginners",
      description: "Start your ML journey with this beginner-friendly introduction to core concepts.",
      readTime: "25 min read",
      views: "4.1k",
      isPremium: true,
      category: "AI/ML",
      publishedAt: "2 weeks ago"
    }
  ];

  const filteredBlogs = allBlogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-hero py-16">
          <div className="container text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <BookOpen className="h-8 w-8 text-white" />
              <h1 className="text-4xl lg:text-5xl font-bold text-white">
                All Blog Posts
              </h1>
            </div>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Explore our comprehensive collection of educational content and tutorials
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/70"
              />
            </div>
          </div>
        </section>

        {/* Blogs Grid */}
        <section className="py-16">
          <div className="container">
            <div className="mb-8">
              <p className="text-muted-foreground">
                Showing {filteredBlogs.length} of {allBlogs.length} articles
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBlogs.map((blog) => (
                <Card key={blog.id} className="group hover:shadow-soft transition-all duration-300 bg-gradient-card border-0">
                  <CardHeader className="space-y-3">
                    <div className="flex items-start justify-between">
                      <Badge variant="secondary" className="text-xs">
                        {blog.category}
                      </Badge>
                      {blog.isPremium && (
                        <Badge className="bg-gradient-premium text-premium-foreground">
                          <Crown className="h-3 w-3 mr-1" />
                          Premium
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {blog.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {blog.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {blog.readTime}
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          {blog.views}
                        </div>
                      </div>
                      <span className="text-xs">{blog.publishedAt}</span>
                    </div>
                    <Button 
                      variant={blog.isPremium ? "premium" : "default"} 
                      className="w-full"
                      size="sm"
                      asChild
                    >
                      <Link to={`/blog/${blog.id}`}>
                        {blog.isPremium ? "Unlock with Premium" : "Read Article"}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredBlogs.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No blogs found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search terms to find what you're looking for.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AllBlogs;