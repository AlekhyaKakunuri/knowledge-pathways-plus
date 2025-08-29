import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Brain } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import UPIPayment from "./UPIPayment";

const CoursesSection = () => {
  const [openUPI, setOpenUPI] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

  const courses = [
    {
      id: '1',
      title: 'Python Programming',
      description: 'Learn Python from basics to advanced concepts with hands-on projects.',
      icon: <Code className="h-8 w-8" />,
      currentPrice: 'Free',
      originalPrice: null,
      isPremium: false,
      level: 'Beginner',
      duration: '8 weeks'
    },
    {
      id: '2',
      title: 'AI Technologies',
      description: 'Master artificial intelligence, machine learning, and deep learning.',
      icon: <Brain className="h-8 w-8" />,
      currentPrice: '₹499',
      originalPrice: '₹999',
      isPremium: true,
      level: 'Advanced',
      duration: '12 weeks'
    }
  ];

  // Show only first 3 courses
  const displayCourses = courses.slice(0, 3);
  const hasMoreCourses = courses.length > 3;

  const handleCourseClick = (course: any) => {
    if (course.isPremium) {
      setSelectedCourse(course);
      setOpenUPI(true);
    }
    // For free courses, they will navigate to the course detail page via Link
  };

  return (
    <section className="py-16 lg:py-20 bg-white px-4">
      <div className="container">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explore Our Courses
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our carefully curated courses designed to accelerate your career
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-8">
          {displayCourses.map((course) => (
            <div key={course.id}>
              {course.isPremium ? (
                // Premium course - click to open UPI payment
                <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardHeader className="p-4 lg:p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-blue-100 rounded-xl">
                        {course.icon}
                      </div>
                      <Badge className="bg-yellow-500 text-white">
                        Premium
                      </Badge>
                    </div>
                    <CardTitle className="text-lg lg:text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {course.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 text-sm lg:text-base mb-4">
                      {course.description}
                    </CardDescription>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <span>{course.level}</span>
                      <span>•</span>
                      <span>{course.duration}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 lg:p-6 pt-0">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-blue-600">{course.currentPrice}</span>
                        {course.originalPrice && (
                          <span className="text-lg text-gray-400 line-through">{course.originalPrice}</span>
                        )}
                      </div>
                    </div>
                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white group-hover:bg-blue-700 transition-colors"
                      size="lg"
                      onClick={() => handleCourseClick(course)}
                    >
                      Enroll Now
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                // Free course - navigate to course detail
                <Link to={`/course/${course.id}`} className="block">
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
                    <CardHeader className="p-4 lg:p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-blue-100 rounded-xl">
                          {course.icon}
                        </div>
                      </div>
                      <CardTitle className="text-lg lg:text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {course.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600 text-sm lg:text-base mb-4">
                        {course.description}
                      </CardDescription>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <span>{course.level}</span>
                        <span>•</span>
                        <span>{course.duration}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 lg:p-6 pt-0">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-green-600">Free</span>
                        </div>
                      </div>
                      <Button 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white group-hover:bg-blue-700 transition-colors"
                        size="lg"
                      >
                        Start Learning
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* View All Button */}
        {hasMoreCourses && (
          <div className="text-center">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
              <Link to="/courses">
                View All Courses
              </Link>
            </Button>
          </div>
        )}
      </div>

      {/* UPI Payment Modal */}
      {selectedCourse && (
        <UPIPayment
          selectedPlan={{
            name: selectedCourse.title,
            price: selectedCourse.currentPrice.replace('₹', ''),
            description: selectedCourse.description,
            features: [
              "Full course access",
              "Downloadable resources",
              "Priority support",
              "Progress tracking",
              "Certificate of completion"
            ]
          }}
          isOpen={openUPI}
          onClose={() => {
            setOpenUPI(false);
            setSelectedCourse(null);
          }}
        />
      )}
    </section>
  );
};

export default CoursesSection;
