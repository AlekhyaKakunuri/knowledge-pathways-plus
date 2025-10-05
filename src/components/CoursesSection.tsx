import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Brain } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import UPIPayment from "./UPIPayment";
import CourseGrid from "./CourseGrid";
import { useData } from "@/contexts/DataContext";

const CoursesSection = () => {
  const [openUPI, setOpenUPI] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const { getCourses, state } = useData();
  
  const courses = getCourses();
  const loading = state.loading.courses;

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
    <section className="py-6 md:py-8 lg:py-10 bg-gray-50 px-4">
      <div className="container">
        <div className="mb-4 md:mb-6 lg:mb-8">
            <h2 className="text-base md:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 md:mb-4 text-left">
              Explore Our Courses
            </h2>
          <p className="text-sm md:text-base lg:text-lg text-gray-600 max-w-xl md:max-w-2xl text-left">
            Choose from our carefully curated courses designed to accelerate your career
          </p>
        </div>

        <CourseGrid 
          courses={displayCourses} 
          showLearnMore={true} 
          loading={loading}
          className="mb-6 md:mb-8"
        />

        {/* View All Button */}
        {hasMoreCourses && (
          <div className="text-center">
            <Button asChild size="lg" className="bg-theme-primary hover:bg-theme-primary-hover text-white px-8 py-3">
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
            planCode: 'PREMIUM_GENAI_DEV_01',
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
