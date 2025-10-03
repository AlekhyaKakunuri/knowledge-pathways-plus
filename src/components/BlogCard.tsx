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
          className="w-full h-48 object-cover"
        />
        
        {/* Access Type Badge - positioned on image */}
        <div className="absolute top-3 right-3">
          <Badge 
            className={`text-xs px-2 py-1 ${
              blog.access_type === 'premium' 
                ? 'bg-yellow-500 text-white' 
                : 'bg-green-500 text-white'
            }`}
          >
            {blog.access_type === 'premium' ? 'Premium' : 'Free'}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="p-6 pb-4 flex-grow flex flex-col">
        {/* Labels - positioned below image, above title */}
        {blog.labels && blog.labels.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {blog.labels.slice(0, 2).map((label, labelIndex) => (
              <Badge 
                key={labelIndex} 
                className="text-xs bg-blue-100 text-blue-800 px-2 py-1"
              >
                {label}
              </Badge>
            ))}
          </div>
        )}
        
        <CardTitle className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 min-h-[3.5rem]">
          {blog.title}
        </CardTitle>
        
        <CardDescription className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4 min-h-[4.5rem] flex-grow">
          {blog.excerpt || blog.content.substring(0, 120) + '...'}
        </CardDescription>
        
        {/* Tags positioned above Read More button */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {blog.tags.slice(0, 3).map((tag, tagIndex) => (
              <Badge 
                key={tagIndex} 
                variant="secondary" 
                className="text-xs bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                {tag}
              </Badge>
            ))}
            {blog.tags.length > 3 && (
              <Badge variant="outline" className="text-xs text-gray-500">
                +{blog.tags.length - 3} more
              </Badge>
            )}
          </div>
        )}
      </CardHeader>
      
      {/* Read More button positioned at the bottom of each card */}
      <CardContent className="p-6 pt-0 mt-auto">
        <button
          onClick={handleReadMore}
          className="text-theme-primary hover:text-theme-primary-hover font-medium inline-flex items-center text-sm transition-colors hover:underline"
        >
          {blog.access_type === 'premium' && !hasAccessToPremiumBlog ? 'Subscribe to Read' : 'Read More'}
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
