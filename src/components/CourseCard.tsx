import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Code, Brain, Users } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import CourseDetailsModal from "./CourseDetailsModal";
import UPIPayment from "./UPIPayment";

interface CourseCardProps {
  course: {
    id: number;
    title: string;
    description: string;
    price: number;
    originalPrice: number;
    duration: string;
    level: string;
    icon: any;
    color: string;
    category: string;
    students: number;
    rating: number;
    lessons: number;
    instructor: string;
    isFree: boolean;
    isPremium: boolean;
    isMostPopular: boolean;
  };
  showLearnMore?: boolean;
  onLearnMore?: () => void;
}

const CourseCard = ({ course, showLearnMore = true, onLearnMore }: CourseCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUPIOpen, setIsUPIOpen] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  const IconComponent = course.icon;

  const handleEnrollClick = () => {
    if (course.price === 0) {
      // For free courses, no authentication needed
      // You can add your free course enrollment logic here
      console.log("Starting free course:", course.title);
      return;
    }
    
    // For paid courses, check authentication
    if (currentUser) {
      // User is logged in, open UPI payment modal
      setIsUPIOpen(true);
    } else {
      // User is not logged in, redirect to sign in page
      navigate('/signin');
    }
  };

  return (
    <>
      <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden flex flex-col h-full">
        <CardContent className="p-0 flex flex-col flex-1">
          {/* Course Header - Logo Only */}
          <div className={`${course.color} p-6 text-white relative overflow-hidden h-[140px] flex flex-col justify-center items-center text-center`}>
            {/* Logo at top */}
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
              <IconComponent className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Course Details - Simple Layout */}
          <div className="p-4 bg-white flex-1 flex flex-col">
            <div className="mb-4">
              {/* Badges in white section */}
              <div className="flex gap-2 mb-4">
                {course.isMostPopular && (
                  <Badge className="bg-red-500 hover:bg-red-500 text-white px-2 py-1 text-xs font-medium">
                    Most Popular
                  </Badge>
                )}
                {course.isPremium && (
                  <Badge className="bg-yellow-500 hover:bg-yellow-500 text-white px-2 py-1 text-xs font-medium">
                    Premium
                  </Badge>
                )}
                {course.isFree && (
                  <Badge className="bg-green-500 hover:bg-green-500 text-white px-2 py-1 text-xs font-medium">
                    Free
                  </Badge>
                )}
              </div>
              
              {/* Title */}
              <h3 className="text-lg font-bold leading-tight mb-4">{course.title}</h3>
              
              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed mb-4">{course.description}</p>
              
              {/* Duration and Price in same row */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-600">Duration: {course.duration}</span>
                {course.isFree ? (
                  <span className="text-xl font-bold text-green-600">Free</span>
                ) : (
                  <span className="text-xl font-bold text-theme-primary">${course.price}</span>
                )}
              </div>
              
              {/* Instructor with avatar */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
                  <img 
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(course.instructor)}&background=random`} 
                    alt={course.instructor}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-sm text-gray-600">{course.instructor}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                className="flex-1 bg-theme-primary hover:bg-theme-primary-hover text-white font-semibold py-2.5"
                onClick={handleEnrollClick}
              >
                {course.price === 0 ? "Start Free" : "Enroll Now"}
              </Button>
              {showLearnMore && (
                <Button 
                  variant="outline" 
                  className="flex-1 border-theme-primary text-theme-primary hover:bg-theme-primary hover:text-white font-semibold py-2.5"
                  onClick={() => setIsModalOpen(true)}
                >
                  View Details
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Course Details Modal */}
      {isModalOpen && (
        <CourseDetailsModal
          course={course}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {/* UPI Payment Modal */}
      {isUPIOpen && (
        <UPIPayment
          selectedPlan={{
            name: course.title,
            price: course.price.toString(),
            description: course.description,
            features: [
              "Full course access",
              "Downloadable resources",
              "Priority support",
              "Progress tracking",
              "Certificate of completion"
            ]
          }}
          isOpen={isUPIOpen}
          onClose={() => setIsUPIOpen(false)}
        />
      )}
    </>
  );
};

export default CourseCard;