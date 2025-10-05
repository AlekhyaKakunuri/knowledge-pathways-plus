import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useSubscriptionCheck } from "@/hooks/useSubscriptionCheck";

interface BlogCardProps {
  blog: {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    is_premium: boolean;
    is_popular?: boolean;
    tags: string[];
    labels?: string[];
    access_type: 'free' | 'premium';
    featured_image_url: string;
    thumbnail_url?: string;
  };
  index?: number;
  showSpecialBadges?: boolean;
}

const BlogCard = ({ blog, index = 0, showSpecialBadges = false }: BlogCardProps) => {
  const { currentUser } = useAuth();
  const { canAccessPremiumContent } = useSubscriptionCheck();
  const navigate = useNavigate();

  // Check if user can access premium content
  const hasAccessToPremiumBlog = currentUser && canAccessPremiumContent && blog.access_type === 'premium';

  const handleReadMore = () => {
    if (blog.access_type === 'premium' && !hasAccessToPremiumBlog) {
      // Redirect to pricing page for premium content
      navigate('/pricing');
    } else {
      // Navigate to blog detail page
      navigate(`/blog/${blog.id}`);
    }
  };

  // Use thumbnail_url if available, otherwise fallback to featured_image_url
  const imageUrl = blog.thumbnail_url || blog.featured_image_url;
  
  return (
    <Card className="overflow-hidden bg-white border-0 shadow-md hover:shadow-lg transition-shadow flex flex-col h-full">
      <div className="relative">
        <img 
          src={imageUrl} 
          alt={blog.title}
          className="w-full h-24 sm:h-48 object-cover"
        />
        
        {/* Access Type Badge - positioned on image */}
        <div className="absolute top-1 right-1 sm:top-3 sm:right-3">
          <Badge 
            className={`text-[8px] sm:text-xs px-1 py-0.5 sm:px-2 sm:py-1 ${
              blog.access_type === 'premium' 
                ? 'bg-yellow-500 text-white' 
                : 'bg-green-500 text-white'
            }`}
          >
            {blog.access_type === 'premium' ? 'Premium' : 'Free'}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="p-2 sm:p-6 pb-2 sm:pb-4 flex-grow flex flex-col">
        {/* 2. Labels - top 3 labels positioned below image, above title */}
        {blog.labels && blog.labels.length > 0 && (
          <div className="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-3">
            {blog.labels.slice(0, 3).map((label, labelIndex) => (
              <Badge 
                key={labelIndex} 
                className="text-[8px] sm:text-xs bg-blue-100 text-blue-800 px-1 py-0.5 sm:px-2 sm:py-1"
              >
                {label}
              </Badge>
            ))}
          </div>
        )}
        
        {/* 3. Title */}
        <CardTitle className="text-xs sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3 line-clamp-2 min-h-[2rem] sm:min-h-[3.5rem]">
          {blog.title}
        </CardTitle>
        
        {/* 4. Only 2 lines of excerpt - If exceed also we need to show 2 lines */}
        <CardDescription className="text-gray-600 text-[10px] sm:text-sm leading-relaxed line-clamp-2 mb-2 sm:mb-4 min-h-[1.5rem] sm:min-h-[2.5rem] flex-grow">
          {blog.excerpt || blog.content.substring(0, 120) + '...'}
        </CardDescription>
      </CardHeader>
      
      {/* 5. [top2 tags, read more] positioned at the bottom of each card */}
      <CardContent className="p-2 sm:p-6 pt-0 mt-auto">
        <div className="flex items-center justify-between">
          {/* Top 2 tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {blog.tags.slice(0, 2).map((tag, tagIndex) => (
                <Badge 
                  key={tagIndex} 
                  variant="secondary" 
                  className="text-[8px] sm:text-xs bg-gray-100 text-gray-700 hover:bg-gray-200 px-1 py-0.5 sm:px-2 sm:py-1"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          
          {/* Read More button */}
          <button
            onClick={handleReadMore}
            className="text-theme-primary hover:text-theme-primary-hover font-medium inline-flex items-center text-[10px] sm:text-sm transition-colors hover:underline"
          >
            {blog.access_type === 'premium' && !hasAccessToPremiumBlog ? 'Subscribe to Read' : 'Read More'}
            <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
