import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface BlogCardProps {
  blog: {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    is_premium: boolean;
    is_popular?: boolean; // New field for popular blogs
    tags: string[];
    featured_image_url: string;
  };
  index?: number;
  showSpecialBadges?: boolean;
}

const BlogCard = ({ blog, index = 0, showSpecialBadges = false }: BlogCardProps) => {
  return (
    <Card className="overflow-hidden bg-white border-0 shadow-md hover:shadow-lg transition-shadow flex flex-col">
      <div className="relative">
        <img 
          src={blog.featured_image_url} 
          alt={blog.title}
          className="w-full h-48 object-cover"
        />
      </div>
      
      {/* Badges positioned below image, above title - using data fields instead of index */}
      {(blog.is_popular || blog.is_premium) && (
        <div className="px-6 pt-4 pb-2">
          <div className="flex justify-between items-center gap-2 mb-3">
            {/* Show Most Popular badge on the left if blog is marked as popular */}
            {blog.is_popular && (
              <Badge className="text-xs bg-red-500 text-white px-2 py-1 w-fit">
                Most Popular
              </Badge>
            )}
            
            {/* Show Premium badge on the right if blog is premium */}
            {blog.is_premium && (
              <Badge className="text-xs bg-yellow-500 text-white px-2 py-1 w-fit ml-auto">
                Premium
              </Badge>
            )}
          </div>
        </div>
      )}
      
      <CardHeader className="p-6 pb-4 flex-grow">
        <CardTitle className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
          {blog.title}
        </CardTitle>
        <CardDescription className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
          {blog.excerpt || blog.content.substring(0, 120) + '...'}
        </CardDescription>
        
        {/* Tags positioned above Read More button */}
        <div className="flex flex-wrap gap-2 mb-4">
          {blog.tags?.slice(0, 3).map((tag, tagIndex) => (
            <Badge key={tagIndex} variant="secondary" className="text-xs bg-gray-100 text-gray-700 hover:bg-gray-200">
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>
      
      {/* Read More button positioned at the bottom of each card */}
      <CardContent className="p-6 pt-0 mt-auto">
        <Link 
          to={`/blog/${blog.id}`}
          className="text-theme-primary hover:text-theme-primary-hover font-medium inline-flex items-center text-sm transition-colors hover:underline"
        >
          Read More
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
