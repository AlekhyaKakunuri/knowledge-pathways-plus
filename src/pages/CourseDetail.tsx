import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Video, ArrowLeft, Star, Play, BookOpen, Lock, Crown, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // Mock subscription status - will be replaced with REST API integration
  const canAccessPremiumContent = false;
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Mock course data based on ID - replace with actual data from REST API
  useEffect(() => {
    const fetchCourseData = () => {
      setLoading(true);
      
      // Mock data - replace with actual API call
      if (id === '1') {
        // Python Programming - Free Course
        setCourse({
          id: 1,
          title: "Python Programming",
          description: "Learn Python from basics to advanced concepts with hands-on projects. This comprehensive course covers everything from fundamental programming concepts to advanced Python features, making it perfect for beginners and intermediate developers alike.",
          duration: "8 weeks",
          students: "5.2k",
          category: "Python",
          level: "Beginner",
          instructor: "Dr. Emily Rodriguez",
          instructorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
          isPremium: false,
          currentPrice: "Free",
          originalPrice: null,
          modules: [
            {
              title: "Introduction to Python",
              duration: "2 hours",
              topics: ["What is Python", "Setting up your environment", "Your first Python program"],
              isLocked: false
            },
            {
              title: "Python Basics",
              duration: "4 hours",
              topics: ["Variables and data types", "Control structures", "Functions and scope"],
              isLocked: false
            },
            {
              title: "Data Structures",
              duration: "6 hours",
              topics: ["Lists and tuples", "Dictionaries and sets", "Working with data"],
              isLocked: false
            },
            {
              title: "Object-Oriented Programming",
              duration: "8 hours",
              topics: ["Classes and objects", "Inheritance and polymorphism", "Advanced OOP concepts"],
              isLocked: false
            },
            {
              title: "Practical Projects",
              duration: "4 hours",
              topics: ["Web scraping", "Data analysis", "Building a simple web app"],
              isLocked: false
            }
          ],
          requirements: [
            "No prior programming experience required",
            "Basic computer literacy",
            "A computer with internet access"
          ],
          whatYouWillLearn: [
            "Write clean, efficient Python code",
            "Understand programming fundamentals",
            "Work with various data structures",
            "Build object-oriented applications",
            "Create practical projects from scratch"
          ]
        });
      } else if (id === '2') {
        // AI Technologies - Premium Course
        setCourse({
          id: 2,
          title: "AI Technologies",
          description: "Master artificial intelligence, machine learning, and deep learning. This advanced course covers cutting-edge AI technologies, neural networks, and practical applications in real-world scenarios.",
          duration: "12 weeks",
          students: "3.8k",
          category: "AI/ML",
          level: "Advanced",
          instructor: "Dr. Michael Chen",
          instructorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
          isPremium: true,
          currentPrice: "$99",
          originalPrice: "$149",
          modules: [
            {
              title: "Introduction to AI",
              duration: "3 hours",
              topics: ["What is Artificial Intelligence", "AI vs ML vs DL", "AI applications in real world"],
              isLocked: false
            },
            {
              title: "Machine Learning Fundamentals",
              duration: "6 hours",
              topics: ["Supervised vs Unsupervised Learning", "Linear Regression", "Classification algorithms"],
              isLocked: false
            },
            {
              title: "Deep Learning Basics",
              duration: "8 hours",
              topics: ["Neural Networks", "Backpropagation", "Activation functions"],
              isLocked: false
            },
            {
              title: "Advanced Neural Networks",
              duration: "10 hours",
              topics: ["CNN for Computer Vision", "RNN for NLP", "Transformers"],
              isLocked: false
            },
            {
              title: "AI Project Implementation",
              duration: "5 hours",
              topics: ["Building an AI chatbot", "Image recognition system", "Deploying AI models"],
              isLocked: false
            }
          ],
          requirements: [
            "Strong programming fundamentals",
            "Basic mathematics and statistics",
            "Understanding of linear algebra",
            "Python programming experience"
          ],
          whatYouWillLearn: [
            "Implement machine learning algorithms",
            "Build and train neural networks",
            "Work with deep learning frameworks",
            "Create real-world AI applications",
            "Deploy AI models to production"
          ]
        });
      } else {
        // Default course
        setCourse({
          id: 3,
          title: "Web Development Fundamentals",
          description: "Learn the basics of web development including HTML, CSS, and JavaScript. Build responsive websites and understand modern web development practices.",
          duration: "6 weeks",
          students: "2.1k",
          category: "Web Development",
          level: "Beginner",
          instructor: "Sarah Johnson",
          instructorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
          isPremium: false,
          currentPrice: "Free",
          originalPrice: null,
          modules: [
            {
              title: "HTML Basics",
              duration: "2 hours",
              topics: ["HTML structure", "Semantic elements", "Forms and inputs"],
              isLocked: false
            },
            {
              title: "CSS Styling",
              duration: "3 hours",
              topics: ["CSS selectors", "Layout and positioning", "Responsive design"],
              isLocked: false
            },
            {
              title: "JavaScript Fundamentals",
              duration: "4 hours",
              topics: ["Variables and functions", "DOM manipulation", "Event handling"],
              isLocked: false
            }
          ],
          requirements: [
            "Basic computer skills",
            "Text editor (VS Code recommended)",
            "Web browser"
          ],
          whatYouWillLearn: [
            "Create responsive websites",
            "Write clean HTML and CSS",
            "Add interactivity with JavaScript",
            "Understand web development workflow",
            "Deploy websites online"
          ]
        });
      }
      
      // Simulate loading delay
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };

    fetchCourseData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20">
          <div className="container">
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading course...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20">
          <div className="container">
            <div className="text-center py-20">
              <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
              <p className="text-muted-foreground mb-6">The course you are looking for does not exist.</p>
              <Button onClick={() => navigate('/courses')}>Back to Courses</Button>
            </div>
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
        <div className="container">
          {/* Back Button */}
          <div className="mb-6">
            <Button variant="ghost" onClick={() => navigate('/courses')} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Courses
            </Button>
          </div>

          {/* Course Header */}
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Course Info */}
            <div className="lg:col-span-2">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex gap-2">
                  <Badge variant="secondary">{course.category}</Badge>
                  <Badge variant="outline">{course.level}</Badge>
                  {course.isPremium && (
                    <Badge className="bg-gradient-premium text-premium-foreground">
                      <Crown className="h-3 w-3 mr-1" />
                      Premium
                    </Badge>
                  )}
                </div>
              </div>

              <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {course.description}
              </p>

              {/* Course Stats */}
              <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {course.duration}
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  {course.students} students enrolled
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  4.8 (2.1k reviews)
                </div>
              </div>

              {/* Instructor */}
              <div className="flex items-center gap-3 mb-6">
                <img
                  src={course.instructorAvatar}
                  alt={course.instructor}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-medium">Created by {course.instructor}</p>
                  <p className="text-sm text-muted-foreground">Expert Instructor</p>
                </div>
              </div>
            </div>

            {/* Course Card */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {course.currentPrice}
                  </div>
                  {course.originalPrice && (
                    <div className="text-lg text-muted-foreground line-through">
                      {course.originalPrice}
                    </div>
                  )}
                  <Badge variant="secondary" className="w-full">
                    {course.isPremium ? 'Premium Course' : 'Free Course'}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full" size="lg">
                    <Play className="h-4 w-4 mr-2" />
                    {course.isPremium && !canAccessPremiumContent ? 'Unlock with Premium' : 'Start Learning'}
                  </Button>
                  
                  {course.isPremium && !canAccessPremiumContent && (
                    <Button variant="outline" className="w-full" size="lg">
                      <Crown className="h-4 w-4 mr-2" />
                      View Premium Plans
                    </Button>
                  )}

                  <div className="text-center text-sm text-muted-foreground">
                    <p>✓ Full lifetime access</p>
                    <p>✓ Access on mobile and TV</p>
                    <p>✓ Certificate of completion</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Course Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* What You'll Learn */}
              <Card>
                <CardHeader>
                  <CardTitle>What you'll learn</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-3">
                    {course.whatYouWillLearn.map((item: string, index: number) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Course Content */}
              <Card>
                <CardHeader>
                  <CardTitle>Course content</CardTitle>
                  <CardDescription>
                    {course.modules.length} sections • {course.modules.reduce((acc: number, module: any) => acc + parseInt(module.duration), 0)} total hours
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {course.modules.map((module: any, index: number) => (
                      <div
                        key={index}
                        className={`flex items-center justify-between p-3 rounded-lg border ${
                          module.isLocked ? 'bg-muted/50' : 'bg-background'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {module.isLocked ? (
                            <Lock className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Play className="h-4 w-4 text-primary" />
                          )}
                          <div>
                            <p className="font-medium">{module.title}</p>
                            <p className="text-sm text-muted-foreground">{module.duration}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" disabled={module.isLocked}>
                          {module.isLocked ? 'Locked' : 'Preview'}
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Requirements */}
              <Card>
                <CardHeader>
                  <CardTitle>Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {course.requirements.map((req: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm">{req}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Course Features */}
              <Card>
                <CardHeader>
                  <CardTitle>This course includes:</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Video className="h-4 w-4 text-primary" />
                    {course.modules.reduce((acc: number, module: any) => acc + parseInt(module.duration), 0)} hours on-demand video
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <BookOpen className="h-4 w-4 text-primary" />
                    Downloadable resources
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Certificate of completion
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-primary" />
                    Full lifetime access
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CourseDetail;

