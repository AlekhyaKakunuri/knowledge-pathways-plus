import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Code, Brain, Users, Star, Clock, Users as UsersIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useSubscriptionCheck } from "@/hooks/useSubscriptionCheck";
import UPIPayment from "./UPIPayment";
import { Course } from "@/lib/courseService";

interface CourseCardProps {
  course: Course;
  showLearnMore?: boolean;
  onLearnMore?: () => void;
}

const CourseCard = ({ course, showLearnMore = true, onLearnMore }: CourseCardProps) => {
  const [isUPIOpen, setIsUPIOpen] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { 
    isActive, 
    isPremium, 
    planName, 
    canAccessAICourse,
    canAccessPremiumContent 
  } = useSubscriptionCheck();
  
  // Get category icon
  const getCategoryIcon = () => {
    const iconMap: { [key: string]: any } = {
      'AI/ML': Brain,
      'Programming': Code,
      'Data Science': Users,
      'Web Development': Code,
      'Mobile Development': Code,
      'General': Code,
    };
    return iconMap[course.category] || Code;
  };
  
  const CategoryIcon = getCategoryIcon();
  
  // Limit tags to 3
  const displayTags = course.tags.slice(0, 3);

  // Format price
  const formatPrice = () => {
    if (course.isFree) {
      return 'Free';
    }
    const currentPrice = course.sale_price || course.price;
    return `₹${currentPrice.toLocaleString()}`;
  };

  // Determine if user has access to this course based on subscription
  const hasAccessToCourse = () => {
    if (course.isFree) return true;
    
    // Check if user has AI course subscription for AI/ML courses
    if (course.category === 'AI/ML' || course.tags.includes('AI') || course.tags.includes('LLM')) {
      return canAccessAICourse;
    }
    
    // For other premium courses, check general premium access
    return canAccessPremiumContent;
  };

  const hasActiveSubscription = hasAccessToCourse();


  const handleEnrollClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    const currentPrice = course.sale_price || course.price;

    if (currentPrice === 0) {
      // For free courses, navigate to course detail page
      navigate(`/course/${course.id}`);
      return;
    }
    
    // For paid courses, check if user has active subscription
    if (hasActiveSubscription) {
      // User has premium subscription, navigate to course detail page
      navigate(`/course/${course.id}`);
      return;
    }
    
    // Check if user is authenticated
    if (!currentUser) {
      // User is not logged in, redirect to sign in page
      navigate('/signin');
      return;
    }
    
    // For all paid courses, use UPI payment modal
    setIsUPIOpen(true);
  };

  const handleCardClick = () => {
    navigate(`/course/${course.id}`);
  };

  return (
    <>
      <Card 
        className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden flex flex-col h-full cursor-pointer"
        onClick={handleCardClick}
      >
        <CardContent className="p-0 flex flex-col flex-1">
          {/* Course Header with Banner Image */}
          <div className="relative h-[100px] sm:h-[200px] overflow-hidden">
            {course.banner_url ? (
              <img 
                src={course.banner_url}
                alt={course.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className={`w-full h-full ${course.color || 'bg-blue-500'} flex flex-col justify-center items-center text-center`}>
                <div className="w-6 h-6 sm:w-16 sm:h-16 bg-white/20 rounded-lg flex items-center justify-center mb-1 sm:mb-4">
                  <CategoryIcon className="w-3 h-3 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-white font-bold text-xs sm:text-lg px-1 sm:px-4">{course.title}</h3>
              </div>
            )}
            
            {/* Overlay badges */}
            <div className="absolute top-1 left-1 sm:top-4 sm:left-4 flex flex-wrap gap-1 sm:gap-2">
              {course.isMostPopular && (
                <Badge className="bg-red-500 text-white text-[8px] sm:text-xs px-1 py-0.5 sm:px-2 sm:py-1">
                  Most Popular
                </Badge>
              )}
              {course.is_premium && (
                <Badge className="bg-yellow-500 text-white text-[8px] sm:text-xs px-1 py-0.5 sm:px-2 sm:py-1">
                  Premium
                </Badge>
              )}
              {course.isFree && (
                <Badge className="bg-green-500 text-white text-[8px] sm:text-xs px-1 py-0.5 sm:px-2 sm:py-1">
                  Free
                </Badge>
              )}
            </div>
          </div>

          {/* Course Details */}
          <div className="p-2 sm:p-6 bg-white flex-1 flex flex-col">
            {/* 1. Title */}
            <h3 className="text-xs sm:text-xl font-bold leading-tight mb-2 sm:mb-4 text-gray-900 line-clamp-2">{course.title}</h3>
            
            {/* 2. [duration, level value, rating] - same line */}
            <div className="flex items-center gap-1 sm:gap-4 mb-2 sm:mb-4 text-[10px] sm:text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-medium">Level:</span> {course.level}
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
                <span>{course.average_rating.toFixed(1)}</span>
              </div>
            </div>
            
            {/* 3. [Instructor details(icon, name), sale price, mrp price] - same line */}
            <div className="flex items-center justify-between mb-2 sm:mb-4">
              {/* Instructor */}
              <div className="flex items-center gap-1 sm:gap-3">
                <div className="w-4 h-4 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-gray-200">
                  {course.instructor.img_url ? (
                    <img 
                      src={course.instructor.img_url}
                      alt={course.instructor.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img 
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(course.instructor.name)}&background=random&color=fff&size=40`}
                      alt={course.instructor.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div>
                  <p className="text-[10px] sm:text-sm font-medium text-gray-900 line-clamp-1">{course.instructor.name}</p>
                  <p className="text-[8px] sm:text-xs text-gray-500">{course.category}</p>
                </div>
              </div>
              
              {/* Pricing */}
              <div className="text-right">
                {course.isFree ? (
                  <span className="text-[10px] sm:text-xl font-bold text-green-600">Free</span>
                ) : (
                  <div className="flex flex-col items-end">
                    {course.sale_price && course.price > course.sale_price && (
                      <>
                        <span className="text-[8px] sm:text-sm text-gray-500 line-through">
                          ₹{course.price.toLocaleString()}
                        </span>
                        <span className="text-[10px] sm:text-xl font-bold text-theme-primary">
                          {formatPrice()}
                        </span>
                      </>
                    )}
                    {(!course.sale_price || course.price <= course.sale_price) && (
                      <span className="text-[10px] sm:text-xl font-bold text-theme-primary">
                        {formatPrice()}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* 4. [Enroll, view details buttons] - same line */}
            <div className="flex gap-1 sm:gap-3 mt-auto">
              <Button 
                className="flex-1 bg-theme-primary hover:bg-theme-primary-hover text-white font-semibold py-1 sm:py-2.5 text-[9px] sm:text-sm"
                onClick={handleEnrollClick}
              >
                {course.isFree 
                  ? "Start Free" 
                  : hasActiveSubscription 
                    ? (canAccessAICourse && (course.category === 'AI/ML' || course.tags.includes('AI') || course.tags.includes('LLM'))
                        ? "Access AI Course" 
                        : "Access Course")
                    : "Enroll Now"
                }
              </Button>
              {showLearnMore && (
                <Button 
                  variant="outline" 
                  className="flex-1 border-theme-primary text-theme-primary hover:bg-theme-primary hover:text-white font-semibold py-1 sm:py-2.5 text-[9px] sm:text-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/course/${course.id}`);
                  }}
                >
                  View Details
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* UPI Payment Modal */}
      {isUPIOpen && (
        <UPIPayment
          selectedPlan={{
            name: course.title,
            price: (course.sale_price || course.price).toString(),
            description: course.short_description,
            planCode: 'PREMIUM_GENAI_DEV_01',
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