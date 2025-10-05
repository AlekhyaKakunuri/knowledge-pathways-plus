import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Brain } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import UPIPayment from "./UPIPayment";
import CourseCard from "./CourseCard";
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
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 md:mb-4 text-left">
            Explore Our Courses
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-gray-600 max-w-xl md:max-w-2xl text-left">
            Choose from our carefully curated courses designed to accelerate your career
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <span className="ml-3 text-lg">Loading courses...</span>
          </div>
        ) : displayCourses.length > 0 ? (
          <>
            {/* Mobile: Horizontal scroll */}
            <div className="sm:hidden">
              <div className="flex gap-2 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
                {displayCourses.map((course) => (
                  <div key={course.id} className="w-[200px] flex-shrink-0">
                    <CourseCard
                      course={course}
                      showLearnMore={true}
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Desktop: Grid layout */}
            <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 md:mb-8">
              {displayCourses.map((course) => (
                <div key={course.id} className="w-full">
                  <CourseCard
                    course={course}
                    showLearnMore={true}
                  />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">No Courses Available</h3>
            <p className="text-gray-600">We're working on adding new courses. Check back soon!</p>
          </div>
        )}

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
