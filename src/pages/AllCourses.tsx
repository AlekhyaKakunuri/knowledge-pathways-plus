import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Video, Crown, Search, Play } from "lucide-react";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const AllCourses = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock course data - replace with actual data from Supabase
  const allCourses = [
    {
      id: 1,
      title: "Complete Python Programming Course",
      description: "Master Python from basics to advanced concepts with hands-on projects.",
      duration: "24 hours",
      students: "5.2k",
      isPremium: false,
      category: "Python",
      level: "Beginner"
    },
    {
      id: 2,
      title: "Machine Learning Masterclass",
      description: "Comprehensive course covering ML algorithms, deep learning, and practical applications.",
      duration: "32 hours",
      students: "3.8k",
      isPremium: true,
      category: "AI/ML",
      level: "Advanced"
    },
    {
      id: 3,
      title: "UI/UX Design Fundamentals",
      description: "Learn design principles, user research, and create stunning user interfaces.",
      duration: "18 hours",
      students: "4.1k",
      isPremium: true,
      category: "Design",
      level: "Intermediate"
    },
    {
      id: 4,
      title: "Full Stack Web Development",
      description: "Build complete web applications using modern technologies and frameworks.",
      duration: "45 hours",
      students: "6.7k",
      isPremium: false,
      category: "Web Development",
      level: "Intermediate"
    },
    {
      id: 5,
      title: "Data Science with R",
      description: "Analyze data and create insights using R programming and statistical methods.",
      duration: "28 hours",
      students: "2.9k",
      isPremium: true,
      category: "Data Science",
      level: "Intermediate"
    },
    {
      id: 6,
      title: "Mobile App Development with React Native",
      description: "Create cross-platform mobile applications using React Native framework.",
      duration: "22 hours",
      students: "3.5k",
      isPremium: false,
      category: "Mobile Development",
      level: "Intermediate"
    }
  ];

  const filteredCourses = allCourses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.level.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-hero py-16">
          <div className="container text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Video className="h-8 w-8 text-white" />
              <h1 className="text-4xl lg:text-5xl font-bold text-white">
                All Video Courses
              </h1>
            </div>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Comprehensive video courses to master new skills and advance your career
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/70"
              />
            </div>
          </div>
        </section>

        {/* Courses Grid */}
        <section className="py-16">
          <div className="container">
            <div className="mb-8">
              <p className="text-muted-foreground">
                Showing {filteredCourses.length} of {allCourses.length} courses
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
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
                      <Play className="h-4 w-4 mr-2" />
                      {course.isPremium ? "Unlock with Premium" : "Start Course"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredCourses.length === 0 && (
              <div className="text-center py-12">
                <Video className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No courses found</h3>
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

export default AllCourses;