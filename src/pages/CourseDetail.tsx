import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Video, ArrowLeft, Star, Play, BookOpen } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock course data - replace with actual data from Supabase
  const course = {
    id: 1,
    title: "Complete Python Programming Course",
    description: "Master Python from basics to advanced concepts with hands-on projects. This comprehensive course covers everything from fundamental programming concepts to advanced Python features, making it perfect for beginners and intermediate developers alike.",
    duration: "24 hours",
    students: "5.2k",
    category: "Python",
    level: "Beginner",
    instructor: "Dr. Emily Rodriguez",
    instructorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    modules: [
      {
        title: "Introduction to Python",
        duration: "2 hours",
        topics: ["What is Python", "Setting up your environment", "Your first Python program"]
      },
      {
        title: "Python Basics",
        duration: "4 hours",
        topics: ["Variables and data types", "Control structures", "Functions and scope"]
      },
      {
        title: "Data Structures",
        duration: "6 hours",
        topics: ["Lists and tuples", "Dictionaries and sets", "Working with data"]
      },
      {
        title: "Object-Oriented Programming",
        duration: "8 hours",
        topics: ["Classes and objects", "Inheritance and polymorphism", "Advanced OOP concepts"]
      },
      {
        title: "Practical Projects",
        duration: "4 hours",
        topics: ["Web scraping", "Data analysis", "Building a simple web app"]
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
  };

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
                <Badge className="bg-gradient-accent text-accent-foreground">
                  <BookOpen className="h-3 w-3 mr-1" />
                  Free Course
                </Badge>
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
                    {course.modules.map((module, index) => (
                      <div key={index} className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold flex-shrink-0">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium mb-1">{module.title}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{module.duration}</p>
                          <div className="flex flex-wrap gap-1">
                            {module.topics.map((topic, topicIndex) => (
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
                      {course.requirements.map((req, index) => (
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
                      {course.whatYouWillLearn.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0"></div>
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Start Course Button */}
              <div className="text-center">
                <Button
                  size="lg"
                  className="bg-gradient-accent hover:bg-gradient-accent/90 text-accent-foreground px-8 py-3 text-lg"
                >
                  <Play className="h-5 w-5 mr-2" />
                  Start Learning for Free
                </Button>
                <p className="text-sm text-muted-foreground mt-3">
                  No credit card required • Start learning immediately
                </p>
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

