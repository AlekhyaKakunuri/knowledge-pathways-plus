import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Video, ArrowLeft, Star, Play, BookOpen, Lock, Crown, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSubscription } from "@/hooks/useSubscription";
import { useState, useEffect } from "react";

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { canAccessPremiumContent, loading: subscriptionLoading } = useSubscription();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Mock course data based on ID - replace with actual data from Supabase
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
              topics: ["What is Artificial Intelligence", "AI vs ML vs DL", "AI applications in industry"],
              isLocked: false
            },
            {
              title: "Machine Learning Fundamentals",
              duration: "6 hours",
              topics: ["Supervised vs Unsupervised Learning", "Linear Regression", "Classification Algorithms"],
              isLocked: !canAccessPremiumContent
            },
            {
              title: "Deep Learning Basics",
              duration: "8 hours",
              topics: ["Neural Networks", "Backpropagation", "Activation Functions"],
              isLocked: !canAccessPremiumContent
            },
            {
              title: "Advanced Neural Networks",
              duration: "10 hours",
              topics: ["CNN for Computer Vision", "RNN for NLP", "Transformers"],
              isLocked: !canAccessPremiumContent
            },
            {
              title: "AI Project Implementation",
              duration: "5 hours",
              topics: ["Model Deployment", "API Development", "Production Considerations"],
              isLocked: !canAccessPremiumContent
            }
          ],
          requirements: [
            "Strong programming fundamentals",
            "Basic mathematics and statistics",
            "Understanding of data structures",
            "Python programming experience"
          ],
          whatYouWillLearn: [
            "Build and train machine learning models",
            "Implement deep learning algorithms",
            "Work with neural networks",
            "Deploy AI models in production",
            "Solve real-world AI problems"
          ]
        });
      }
      
      setLoading(false);
    };

    fetchCourseData();
  }, [id, canAccessPremiumContent]);

  if (loading || subscriptionLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-20 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Loading course...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
          <Button onClick={() => navigate('/courses')}>Back to Courses</Button>
        </div>
        <Footer />
      </div>
    );
  }

  const isPremiumCourse = course.isPremium;
  const canAccessContent = !isPremiumCourse || canAccessPremiumContent;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Back Navigation */}
        <section className="bg-gradient-to-r from-background to-secondary/20 py-6">
          <div className="container">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Courses
            </Button>
          </div>
        </section>

        {/* Course Header */}
        <section className="py-12">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-start justify-between mb-6">
                <div className="flex gap-2">
                  <Badge variant="secondary" className="text-sm">
                    {course.category}
                  </Badge>
                  <Badge variant="outline" className="text-sm">
                    {course.level}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  {isPremiumCourse && (
                    <Badge className="bg-yellow-500 text-white">
                      <Crown className="h-3 w-3 mr-1" />
                      Premium
                    </Badge>
                  )}
                  <Badge className={isPremiumCourse ? "bg-blue-600 text-white" : "bg-green-600 text-white"}>
                    <BookOpen className="h-3 w-3 mr-1" />
                    {isPremiumCourse ? "Premium Course" : "Free Course"}
                  </Badge>
                </div>
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                {course.title}
              </h1>
              
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {course.description}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {course.duration}
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  {course.students} students
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  4.8/5 rating
                </div>
              </div>

              {/* Instructor Info */}
              <div className="flex items-center gap-4 mb-8 p-4 bg-gradient-card rounded-lg border-0">
                <img
                  src={course.instructorAvatar}
                  alt={course.instructor}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm text-muted-foreground">Instructor</p>
                  <p className="font-semibold">{course.instructor}</p>
                </div>
              </div>

              {/* Course Modules */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Video className="h-5 w-5" />
                    Course Curriculum
                  </CardTitle>
                  <CardDescription>
                    {course.modules.length} modules • {course.duration} total duration
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {course.modules.map((module: any, index: number) => (
                      <div key={index} className={`flex items-start gap-4 p-3 rounded-lg transition-colors ${
                        module.isLocked ? 'bg-muted/30 opacity-60' : 'hover:bg-muted/50'
                      }`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                          module.isLocked 
                            ? 'bg-muted text-muted-foreground' 
                            : 'bg-primary/10 text-primary'
                        }`}>
                          {module.isLocked ? <Lock className="h-4 w-4" /> : index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{module.title}</h4>
                            {module.isLocked && (
                              <Badge variant="outline" className="text-xs">
                                <Lock className="h-2 w-2 mr-1" />
                                Premium
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{module.duration}</p>
                          <div className="flex flex-wrap gap-1">
                            {module.topics.map((topic: string, topicIndex: number) => (
                              <Badge key={topicIndex} variant="secondary" className="text-xs">
                                {topic}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Requirements and What You'll Learn */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {course.requirements.map((req: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                          <span className="text-sm">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">What You'll Learn</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {course.whatYouWillLearn.map((item: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0"></div>
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Course Action Buttons */}
              <div className="text-center">
                {canAccessContent ? (
                  // User can access the course content
                  <div className="space-y-4">
                    <Button
                      size="lg"
                      className="bg-gradient-accent hover:bg-gradient-accent/90 text-accent-foreground px-8 py-3 text-lg"
                    >
                      <Play className="h-5 w-5 mr-2" />
                      {isPremiumCourse ? 'Continue Learning' : 'Start Learning for Free'}
                    </Button>
                    {isPremiumCourse && (
                      <div className="flex items-center justify-center gap-2 text-sm text-green-600">
                        <CheckCircle className="h-4 w-4" />
                        Premium access granted
                      </div>
                    )}
                    <p className="text-sm text-muted-foreground mt-3">
                      {isPremiumCourse 
                        ? 'Full course access • All modules unlocked' 
                        : 'No credit card required • Start learning immediately'
                      }
                    </p>
                  </div>
                ) : (
                  // User needs subscription to access premium content
                  <div className="space-y-4">
                    <div className="bg-muted/50 p-6 rounded-lg border-2 border-dashed border-muted-foreground/30">
                      <div className="flex items-center justify-center gap-3 mb-4">
                        <Lock className="h-8 w-8 text-muted-foreground" />
                        <h3 className="text-lg font-semibold">Premium Content Locked</h3>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        Subscribe to our premium plan to unlock this course and access all premium content.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Button
                          size="lg"
                          className="bg-gradient-accent hover:bg-gradient-accent/90 text-accent-foreground px-6 py-2"
                          onClick={() => navigate('/pricing')}
                        >
                          <Crown className="h-4 w-4 mr-2" />
                          View Pricing Plans
                        </Button>
                        <Button
                          variant="outline"
                          size="lg"
                          className="px-6 py-2"
                          onClick={() => navigate('/contact')}
                        >
                          Contact Support
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CourseDetail;

