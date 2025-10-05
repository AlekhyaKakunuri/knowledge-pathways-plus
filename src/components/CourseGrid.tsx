import { Course } from "@/types/course";
import CourseCard from "./CourseCard";

interface CourseGridProps {
  courses: Course[];
  showLearnMore?: boolean;
  loading?: boolean;
  className?: string;
}

const CourseGrid = ({ courses, showLearnMore = false, loading = false, className = "" }: CourseGridProps) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-theme-primary"></div>
        <span className="ml-3 text-lg">Loading courses...</span>
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No courses available at the moment.</p>
      </div>
    );
  }

  return (
    <>
      {/* Mobile: Horizontal scroll with smaller cards */}
      <div className="sm:hidden">
        <div className="flex gap-2 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
          {courses.map((course) => (
            <div key={course.id} className="w-[280px] flex-shrink-0">
              <CourseCard
                course={course}
                showLearnMore={showLearnMore}
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Desktop: Grid layout */}
      <div className={`hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
        {courses.map((course) => (
          <div key={course.id} className="w-full">
            <CourseCard
              course={course}
              showLearnMore={showLearnMore}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default CourseGrid;
