import { Blog } from "@/lib/blogService";
import BlogCard from "./BlogCard";

interface BlogGridProps {
  blogs: Blog[];
  loading?: boolean;
  className?: string;
}

const BlogGrid = ({ blogs, loading = false, className = "" }: BlogGridProps) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-theme-primary"></div>
        <span className="ml-3 text-lg">Loading blogs...</span>
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No blogs available at the moment.</p>
      </div>
    );
  }

  // Helper function to transform blog data
  const transformBlog = (blog: Blog) => ({
    id: blog.id,
    title: blog.title,
    excerpt: blog.excerpt,
    content: blog.content_html,
    is_premium: blog.access_type === 'premium',
    is_popular: blog.labels?.includes('Most Popular') || blog.labels?.includes('popular') || false,
    tags: blog.tags || [],
    labels: blog.labels || [],
    access_type: blog.access_type || 'free',
    featured_image_url: blog.thumbnail_url || blog.cover_url,
    thumbnail_url: blog.thumbnail_url
  });

  return (
    <>
      {/* Mobile: Horizontal scroll with smaller cards */}
      <div className="sm:hidden">
        <div className="flex gap-2 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
          {blogs.map((blog) => (
            <div key={blog.id} className="relative w-[280px] flex-shrink-0">
              <BlogCard blog={transformBlog(blog)} />
            </div>
          ))}
        </div>
      </div>
      
      {/* Desktop: Grid layout */}
      <div className={`hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
        {blogs.map((blog) => (
          <div key={blog.id} className="relative">
            <BlogCard blog={transformBlog(blog)} />
          </div>
        ))}
      </div>
    </>
  );
};

export default BlogGrid;
