import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Eye, BookOpen, Video, Crown, Users } from "lucide-react";
import { Link } from "react-router-dom";

const ContentPreview = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Introduction to Modern Web Development",
      description: "Learn the fundamentals of HTML, CSS, and JavaScript in this comprehensive guide.",
      readTime: "8 min read",
      views: "2.1k",
      isPremium: false,
      category: "Web Development"
    },
    {
      id: 2,
      title: "Advanced React Patterns and Best Practices",
      description: "Deep dive into advanced React concepts including hooks, context, and performance optimization.",
      readTime: "12 min read",
      views: "1.8k",
      isPremium: true,
      category: "React"
    },
    {
      id: 3,
      title: "Building Scalable APIs with Node.js",
      description: "Learn how to create robust and scalable backend APIs using Node.js and Express.",
      readTime: "15 min read",
      views: "3.2k",
      isPremium: false,
      category: "Backend"
    }
  ];

  const videoCourses = [
    {
      id: 1,
      title: "Complete Python Programming Course",
      description: "Master Python from basics to advanced concepts with hands-on projects.",
      duration: "24 hours",
      students: "5.2k",
      isPremium: false,
      category: "Python"
    },
    {
      id: 2,
      title: "Machine Learning Masterclass",
      description: "Comprehensive course covering ML algorithms, deep learning, and practical applications.",
      duration: "32 hours",
      students: "3.8k",
      isPremium: true,
      category: "AI/ML"
    },
    {
      id: 3,
      title: "UI/UX Design Fundamentals",
      description: "Learn design principles, user research, and create stunning user interfaces.",
      duration: "18 hours",
      students: "4.1k",
      isPremium: true,
      category: "Design"
    }
  ];

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

        {/* Blog Posts Section */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <BookOpen className="h-6 w-6 text-primary" />
              <h3 className="text-2xl font-bold">Latest Blog Posts</h3>
            </div>
            <Button variant="outline" asChild>
              <Link to="/blogs">View All Blogs</Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Card key={post.id} className="group hover:shadow-soft transition-all duration-300 bg-gradient-card border-0">
                <CardHeader className="space-y-3">
                  <div className="flex items-start justify-between">
                    <Badge variant="secondary" className="text-xs">
                      {post.category}
                    </Badge>
                    {post.isPremium && (
                      <Badge className="bg-gradient-premium text-premium-foreground">
                        <Crown className="h-3 w-3 mr-1" />
                        Premium
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3">
                    {post.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {post.readTime}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {post.views}
                      </div>
                    </div>
                  </div>
                  <Button 
                    variant={post.isPremium ? "premium" : "default"} 
                    className="w-full"
                    size="sm"
                    asChild
                  >
                    <Link to={`/blog/${post.id}`}>
                      {post.isPremium ? "Unlock with Premium" : "Read Article"}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Video Courses Section */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Video className="h-6 w-6 text-accent" />
              <h3 className="text-2xl font-bold">Featured Video Courses</h3>
            </div>
            <Button variant="accent" asChild>
              <Link to="/courses">View All Courses</Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videoCourses.map((course) => (
              <Card key={course.id} className="group hover:shadow-soft transition-all duration-300 bg-gradient-card border-0">
                <CardHeader className="space-y-3">
                  <div className="flex items-start justify-between">
                    <Badge variant="secondary" className="text-xs">
                      {course.category}
                    </Badge>
                    {course.isPremium && (
                      <Badge className="bg-gradient-premium text-premium-foreground">
                        <Crown className="h-3 w-3 mr-1" />
                        Premium
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="group-hover:text-accent transition-colors">
                    {course.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3">
                    {course.description}
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
                        {course.students}
                      </div>
                    </div>
                  </div>
                  <Button 
                    variant={course.isPremium ? "premium" : "accent"} 
                    className="w-full"
                    size="sm"
                  >
                    {course.isPremium ? "Unlock with Premium" : "Start Course"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentPreview;