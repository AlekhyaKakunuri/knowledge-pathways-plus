import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Eye, BookOpen, Video, Crown, Users, Loader2, TrendingUp, Star, Lock, Unlock } from "lucide-react";
import { Link } from "react-router-dom";
import { ContentService, Blog } from "@/services/contentService";
import { useSubscription } from "@/hooks/useSubscription";

const ContentPreview = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalBlogs: 0,
    totalCourses: 0,
    freeBlogs: 0,
    premiumBlogs: 0,
    freeCourses: 0,
    premiumCourses: 0
  });
  
  // Get subscription status
  const { canAccessPremiumContent, loading: subscriptionLoading } = useSubscription();

  useEffect(() => {
    fetchFeaturedContent();
  }, []);

  const fetchFeaturedContent = async () => {
    try {
      setLoading(true);
      const featuredContent = await ContentService.getFeaturedContent();
      setBlogs(featuredContent.blogs);
      setCourses(featuredContent.courses);
      setStats(featuredContent.stats);
    } catch (error) {
      console.error('Error fetching featured content:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getReadingTime = (content: string) => {
    return ContentService.calculateReadingTime(content);
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
      priceDisplay: <span className="text-lg font-bold text-premium">₹{course.price}</span>
    };
  };

  if (loading || subscriptionLoading) {
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
                {blogs.length} articles
              </Badge>
            </div>
            <Button variant="outline" asChild>
              <Link to="/blogs">View All Blogs</Link>
            </Button>
          </div>

          {blogs.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No blogs available</h3>
              <p className="text-muted-foreground">Check back soon for new content!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((post) => {
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
                        {ContentService.getContentPreview(post.content, 120)}
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
          )}
        </div>

        {/* Video Courses Section */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Video className="h-6 w-6 text-accent" />
              <h3 className="text-2xl font-bold">Featured Video Courses</h3>
              <Badge variant="secondary" className="ml-2">
                {courses.length} courses
              </Badge>
            </div>
            <Button variant="accent" asChild>
              <Link to="/courses">View All Courses</Link>
            </Button>
          </div>

          {courses.length === 0 ? (
            <div className="text-center py-12">
              <Video className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No courses available</h3>
              <p className="text-muted-foreground">Check back soon for new content!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course: any) => {
                const courseInfo = getCourseDisplayInfo(course);
                return (
                  <Card key={course.id} className="group hover:shadow-soft transition-all duration-300 bg-gradient-card border-0">
                    <CardHeader className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {course.category}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {course.level}
                          </Badge>
                        </div>
                        {courseInfo.badge}
                      </div>
                      <CardTitle className="group-hover:text-accent transition-colors">
                        {course.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-3">
                        {ContentService.getContentPreview(course.description, 120)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {course.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {course.students_count} students
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">{course.rating}</span>
                        </div>
                        {courseInfo.priceDisplay}
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
          )}
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