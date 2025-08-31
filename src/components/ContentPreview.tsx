import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Eye, BookOpen, Video, Crown, Users, Loader2, TrendingUp, Star, Lock, Unlock } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for demonstration - same as Course Page
const mockBlogs = [
  {
    id: "1",
    title: "Getting Started with React Development",
    content: "Learn the fundamentals of React development including components, state management, and hooks. This comprehensive guide will take you from beginner to intermediate level.",
    excerpt: "Learn the fundamentals of React development including components, state management, and hooks.",
    is_premium: false,
    tags: ["React", "JavaScript"],
    created_at: "2024-01-15",
    author: "John Doe"
  },
  {
    id: "2",
    title: "Advanced TypeScript Patterns",
    content: "Explore advanced TypeScript patterns and best practices for building scalable applications. Learn about generics, decorators, and advanced type manipulation.",
    excerpt: "Explore advanced TypeScript patterns and best practices for building scalable applications.",
    is_premium: true,
    tags: ["TypeScript", "Advanced"],
    created_at: "2024-01-10",
    author: "Jane Smith"
  },
  {
    id: "3",
    title: "Building REST APIs with Node.js",
    content: "Master the art of building robust REST APIs using Node.js and Express. Learn about authentication, validation, and best practices for production deployment.",
    excerpt: "Master the art of building robust REST APIs using Node.js and Express.",
    is_premium: false,
    tags: ["Node.js", "API"],
    created_at: "2024-01-05",
    author: "Mike Johnson"
  }
];

// Updated course data to match Course Page exactly
const mockCourses = [
  {
    id: "1",
    title: "Data Structures & Algorithms",
    description: "Master fundamental data structures and algorithms with hands-on coding challenges and real-world applications.",
    duration: "12 weeks",
    level: "Intermediate",
    category: "Computer Science",
    instructor: "John Smith",
    instructorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    is_premium: true,
    price: 299,
    currentPrice: "299",
    originalPrice: "499",
    students_count: 1250,
    rating: 4.8,
    badge: "New",
    badgeColor: "bg-theme-bg-light text-theme-primary"
  },
  {
    id: "2",
    title: "System Design",
    description: "Learn to design scalable systems and architecture patterns used by top tech companies.",
    duration: "10 weeks",
    level: "Advanced",
    category: "System Design",
    instructor: "Sarah Johnson",
    instructorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    is_premium: true,
    price: 399,
    currentPrice: "399",
    originalPrice: "599",
    students_count: 850,
    rating: 4.9,
    badge: "Most Popular",
    badgeColor: "bg-blue-100 text-blue-800"
  },
  {
    id: "3",
    title: "Machine Learning",
    description: "Introduction to machine learning concepts, algorithms, and practical applications using Python.",
    duration: "16 weeks",
    level: "Intermediate",
    category: "AI & ML",
    instructor: "Mike Chen",
    instructorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    is_premium: true,
    price: 499,
    currentPrice: "499",
    originalPrice: "799",
    students_count: 650,
    rating: 4.7,
    badge: "New",
    badgeColor: "bg-theme-bg-light text-theme-primary"
  }
];

const ContentPreview = () => {
  const [loading, setLoading] = useState(true);
  
  // Mock subscription status - will be replaced with REST API integration
  const canAccessPremiumContent = false; // This will come from your REST API

  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(' ').length;
    return Math.ceil(words / wordsPerMinute);
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
        linkPath: (id: string) => `/blog/${id}`
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

  // Helper function to get course display info
  const getCourseDisplayInfo = (course: any) => {
    if (!course.is_premium) {
      return {
        badge: null,
        buttonText: "Start Course",
        buttonVariant: "accent" as const,
        linkPath: `/course/${course.id}`,
        priceDisplay: <span className="text-lg font-bold text-green-600">Free</span>
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
        buttonText: "Start Course",
        buttonVariant: "default" as const,
        linkPath: `/course/${course.id}`,
        priceDisplay: <span className="text-lg font-bold text-green-600">Included</span>
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
      linkPath: `/premium/course/${course.id}`,
      priceDisplay: <span className="text-lg font-bold text-premium">${course.price}</span>
    };
  };

  if (loading) {
    return (
      <section className="py-20 bg-gradient-card">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Explore Our Learning Content
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our collection of blogs and video courses designed to accelerate your learning journey
            </p>
          </div>
          
          <div className="text-center py-20">
            <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">Loading featured content...</p>
          </div>
        </div>
      </section>
    );
  }

  const stats = {
    totalBlogs: mockBlogs.length,
    totalCourses: mockCourses.length,
    freeBlogs: mockBlogs.filter(b => !b.is_premium).length,
    premiumBlogs: mockBlogs.filter(b => b.is_premium).length,
    freeCourses: mockCourses.filter(c => !c.is_premium).length,
    premiumCourses: mockCourses.filter(c => c.is_premium).length
  };

  return (
    <section className="py-20 bg-gradient-card">
      <div className="container">
        {/* Header with Stats */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Explore Our Learning Content
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Discover our collection of blogs and video courses designed to accelerate your learning journey
          </p>
          
          {/* Content Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="bg-white/50 rounded-lg p-4">
              <div className="text-2xl font-bold text-primary">{stats.totalBlogs}</div>
              <div className="text-sm text-muted-foreground">Total Blogs</div>
            </div>
            <div className="bg-white/50 rounded-lg p-4">
              <div className="text-2xl font-bold text-accent">{stats.totalCourses}</div>
              <div className="text-sm text-muted-foreground">Total Courses</div>
            </div>
            <div className="bg-white/50 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600">{stats.freeBlogs + stats.freeCourses}</div>
              <div className="text-sm text-muted-foreground">Free Content</div>
            </div>
            <div className="bg-white/50 rounded-lg p-4">
              <div className="text-2xl font-bold text-premium">{stats.premiumBlogs + stats.premiumCourses}</div>
              <div className="text-sm text-muted-foreground">Premium Content</div>
            </div>
          </div>
        </div>

        {/* Blog Posts Section */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <BookOpen className="h-6 w-6 text-primary" />
              <h3 className="text-2xl font-bold">Latest Blog Posts</h3>
              <Badge variant="secondary" className="ml-2">
                {mockBlogs.length} articles
              </Badge>
            </div>
            {/* View All Button */}
            <div className="text-center mt-8">
              <Link 
                to="/blogs"
                                 className="inline-flex items-center justify-center px-6 py-3 bg-theme-primary text-white font-medium rounded-lg hover:bg-theme-primary-hover transition-colors"
              >
                View All Blogs
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockBlogs.map((post) => {
              const contentInfo = getPremiumContentInfo(post.is_premium);
              return (
                <Card key={post.id} className="group hover:shadow-soft transition-all duration-300 bg-gradient-card border-0">
                  <CardHeader className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-2">
                        {post.tags?.slice(0, 2).map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      {contentInfo.badge}
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {getReadingTime(post.content)} min read
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          {formatDate(post.created_at)}
                        </div>
                      </div>
                    </div>
                    <Button 
                      variant={contentInfo.buttonVariant}
                      className="w-full"
                      size="sm"
                      asChild
                    >
                      <Link to={contentInfo.linkPath(post.id)}>
                        {contentInfo.buttonText}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Video Courses Section */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Video className="h-6 w-6 text-accent" />
              <h3 className="text-2xl font-bold">Featured Video Courses</h3>
              <Badge variant="secondary" className="ml-2">
                {mockCourses.length} courses
              </Badge>
            </div>
            <Button variant="accent" asChild>
              <Link to="/courses">View All Courses</Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockCourses.map((course: any) => {
              const courseInfo = getCourseDisplayInfo(course);
              return (
                <Card key={course.id} className="group hover:shadow-lg transition-all duration-300 bg-gradient-card border-0">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-3">
                      <Badge className={course.badgeColor}>
                        {course.badge}
                      </Badge>
                      {courseInfo.badge}
                    </div>
                    <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-theme-primary transition-colors">
                      {course.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      {course.duration}
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <img
                        src={course.instructorAvatar}
                        alt={course.instructor}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="text-sm font-medium text-gray-700">{course.instructor}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                                             <span className="text-2xl font-bold text-theme-primary">${course.currentPrice}</span>
                      <span className="text-lg text-gray-500 line-through">${course.originalPrice}</span>
                    </div>
                    
                    <Button 
                      variant={courseInfo.buttonVariant}
                      className="w-full"
                      size="sm"
                      asChild
                    >
                      <Link to={courseInfo.linkPath}>
                        {courseInfo.buttonText}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white/50 rounded-2xl p-8 max-w-2xl mx-auto">
            <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Ready to Level Up?</h3>
            <p className="text-muted-foreground mb-6">
              Explore our premium content and take your skills to the next level
            </p>
            <div className="flex gap-4 justify-center">
              <Button variant="outline" asChild>
                <Link to="/blogs">Browse All Blogs</Link>
              </Button>
              <Button variant="default" asChild>
                <Link to="/courses">Explore Courses</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentPreview;