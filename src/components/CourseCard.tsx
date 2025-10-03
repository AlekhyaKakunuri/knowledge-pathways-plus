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
  
  // Format duration
  const formatDuration = (duration: number) => {
    if (duration < 1) {
      return `${Math.round(duration * 60)} min`;
    }
    return `${duration} hours`;
  };
  
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


  const handleEnrollClick = () => {
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

  return (
    <>
      <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden flex flex-col h-full">
        <CardContent className="p-0 flex flex-col flex-1">
          {/* Course Header with Banner Image */}
          <div className="relative h-[200px] overflow-hidden">
            {course.banner_url ? (
              <img 
                src={course.banner_url}
                alt={course.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className={`w-full h-full ${course.color || 'bg-blue-500'} flex flex-col justify-center items-center text-center`}>
                <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                  <CategoryIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-white font-bold text-lg px-4">{course.title}</h3>
              </div>
            )}
            
            {/* Overlay badges */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              {course.isMostPopular && (
                <Badge className="bg-red-500 text-white text-xs">
                  Most Popular
                </Badge>
              )}
              {course.is_premium && (
                <Badge className="bg-yellow-500 text-white text-xs">
                  Premium
                </Badge>
              )}
              {course.isFree && (
                <Badge className="bg-green-500 text-white text-xs">
                  Free
                </Badge>
              )}
            </div>
          </div>

          {/* Course Details */}
          <div className="p-6 bg-white flex-1 flex flex-col">
            <div className="mb-4">
              {/* Tags - Limited to 3 */}
              <div className="flex flex-wrap gap-2 mb-4">
                {displayTags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="text-xs bg-gray-100 text-gray-700 hover:bg-gray-200"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              
              {/* Title */}
              <h3 className="text-xl font-bold leading-tight mb-3 text-gray-900">{course.title}</h3>
              
              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                {course.short_description || 'Learn with expert guidance'}
              </p>
              
              {/* Course Stats */}
              <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{formatDuration(course.duration)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <UsersIcon className="w-4 h-4" />
                  <span>{course.enrollment_count.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>{course.average_rating.toFixed(1)}</span>
                </div>
              </div>
              
              {/* Duration and Price */}
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Level:</span> {course.level}
                </div>
                <div className="text-right">
                  {course.isFree ? (
                    <span className="text-xl font-bold text-green-600">Free</span>
                  ) : (
                    <div className="flex flex-col items-end">
                      {course.sale_price && course.price > course.sale_price && (
                        <>
                          <span className="text-sm text-gray-500 line-through">
                            ₹{course.price.toLocaleString()}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-xl font-bold text-theme-primary">
                              {formatPrice()}
                            </span>
                            <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-medium">
                              {Math.round(((course.price - course.sale_price) / course.price) * 100)}% OFF
                            </span>
                          </div>
                        </>
                      )}
                      {(!course.sale_price || course.price <= course.sale_price) && (
                        <span className="text-xl font-bold text-theme-primary">
                          {formatPrice()}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Instructor */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
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
                  <p className="text-sm font-medium text-gray-900">{course.instructor.name}</p>
                  <p className="text-xs text-gray-500">{course.category}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-auto">
              <Button 
                className="flex-1 bg-theme-primary hover:bg-theme-primary-hover text-white font-semibold py-2.5"
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
                  className="flex-1 border-theme-primary text-theme-primary hover:bg-theme-primary hover:text-white font-semibold py-2.5"
                  onClick={() => navigate(`/course/${course.id}`)}
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