import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { Link } from "react-router-dom";

interface CourseCardProps {
  course: {
    id: string;
    title: string;
    duration: string;
    instructor: string;
    instructorAvatar: string;
    currentPrice: string;
    originalPrice: string;
    badge: string;
    badgeColor: string;
    is_premium?: boolean;
  };
  onLearnMore?: () => void;
}

const CourseCard = ({ course, onLearnMore }: CourseCardProps) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 bg-white border-0 shadow-md">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between mb-3">
          <Badge className={course.badgeColor}>
            {course.badge}
          </Badge>
        </div>
                 <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-theme-primary transition-colors">
          {course.title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="h-4 w-4" />
          {course.duration}
        </div>
        
        <div className="flex items-center gap-3">
          <img
            src={course.instructorAvatar}
            alt={course.instructor}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="text-sm font-medium text-gray-700">{course.instructor}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-theme-primary">${course.currentPrice}</span>
          <span className="text-lg text-gray-500 line-through">${course.originalPrice}</span>
        </div>
        
                 <Button 
          className="w-full bg-theme-primary hover:bg-theme-primary-hover text-white"
          onClick={onLearnMore}
        >
          Learn More
        </Button>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
