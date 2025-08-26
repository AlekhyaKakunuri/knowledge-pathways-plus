import { supabase } from '@/integrations/supabase/client';

export interface Blog {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  featured_image_url: string | null;
  is_premium: boolean;
  published: boolean;
  tags: string[] | null;
  author_id: string;
  created_at: string;
  updated_at: string;
}

// Temporarily commented out until courses table is created
// export interface Course {
//   id: string;
//   title: string;
//   description: string;
//   duration: string;
//   level: string;
//   category: string;
//   instructor: string;
//   instructor_avatar: string;
//   thumbnail_url: string | null;
//   is_premium: boolean;
//   price: number;
//   modules: string[];
//   students_count: number;
//   rating: number;
//   created_at: string;
//   updated_at: string;
// }

export interface ContentFilters {
  category?: string;
  level?: string;
  tags?: string[];
  search?: string;
  isPremium?: boolean;
  limit?: number;
  sort?: 'newest' | 'oldest' | 'title' | 'rating' | 'students';
}

export interface FeaturedContent {
  blogs: Blog[];
  courses: any[]; // Temporarily any[] until courses table is created
  stats: {
    totalBlogs: number;
    totalCourses: number;
    freeBlogs: number;
    premiumBlogs: number;
    freeCourses: number;
    premiumCourses: number;
  };
}

export class ContentService {
  // ===== BLOG METHODS =====
  
  // Get all blogs with optional filtering
  static async getBlogs(filters?: ContentFilters): Promise<Blog[]> {
    try {
      let query = supabase
        .from('blogs')
        .select('*')
        .eq('published', true);

      if (filters?.isPremium !== undefined) {
        query = query.eq('is_premium', filters.isPremium);
      }

      if (filters?.category) {
        query = query.contains('tags', [filters.category]);
      }

      if (filters?.search) {
        query = query.or(`title.ilike.%${filters.search}%,excerpt.ilike.%${filters.search}%`);
      }

      if (filters?.limit) {
        query = query.limit(filters.limit);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching blogs:', error);
      return [];
    }
  }

  // Get free blogs only
  static async getFreeBlogs(limit?: number): Promise<Blog[]> {
    return this.getBlogs({ isPremium: false, limit });
  }

  // Get premium blogs only
  static async getPremiumBlogs(limit?: number): Promise<Blog[]> {
    return this.getBlogs({ isPremium: true, limit });
  }

  // Get blog by ID
  static async getBlogById(id: string): Promise<Blog | null> {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('id', id)
        .eq('published', true)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data;
    } catch (error) {
      console.error('Error fetching blog by ID:', error);
      return null;
    }
  }

  // Get blogs by category/tags
  static async getBlogsByCategory(category: string, limit?: number): Promise<Blog[]> {
    return this.getBlogs({ category, limit });
  }

  // Get related blogs (same tags, excluding current blog)
  static async getRelatedBlogs(currentBlogId: string, tags: string[], limit: number = 3): Promise<Blog[]> {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('published', true)
        .neq('id', currentBlogId)
        .contains('tags', tags)
        .limit(limit)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching related blogs:', error);
      return [];
    }
  }

  // ===== COURSE METHODS (Temporarily commented out) =====
  
  // Temporarily commented out until courses table is created
  /*
  // Get all courses with optional filtering
  static async getCourses(filters?: ContentFilters): Promise<Course[]> {
    try {
      let query = supabase
        .from('courses')
        .select('*');

      if (filters?.isPremium !== undefined) {
        query = query.eq('is_premium', filters.isPremium);
      }

      if (filters?.category) {
        query = query.eq('category', filters.category);
      }

      if (filters?.level) {
        query = query.eq('level', filters.level);
      }

      if (filters?.search) {
        query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
      }

      if (filters?.limit) {
        query = query.limit(filters.limit);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching courses:', error);
      return [];
    }
  }

  // Get free courses only
  static async getFreeCourses(limit?: number): Promise<Course[]> {
    return this.getCourses({ isPremium: false, limit });
  }

  // Get premium courses only
  static async getPremiumCourses(limit?: number): Promise<Course[]> {
    return this.getCourses({ isPremium: true, limit });
  }

  // Get course by ID
  static async getCourseById(id: string): Promise<Course | null> {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('id', id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data;
    } catch (error) {
      console.error('Error fetching course by ID:', error);
      return null;
    }
  }

  // Get courses by category
  static async getCoursesByCategory(category: string, limit?: number): Promise<Course[]> {
    return this.getCourses({ category, limit });
  }

  // Get courses by level
  static async getCoursesByLevel(level: string, limit?: number): Promise<Course[]> {
    return this.getCourses({ level, limit });
  }
  */

  // ===== FEATURED CONTENT =====
  
  // Get featured content with smart selection
  static async getFeaturedContent(): Promise<FeaturedContent> {
    try {
      // Get a balanced mix of content (blogs only for now)
      const [freeBlogs, premiumBlogs] = await Promise.all([
        this.getFreeBlogs(2),      // 2 free blogs
        this.getPremiumBlogs(1),   // 1 premium blog
      ]);

      // Get content statistics
      const stats = await this.getContentStats();

      return {
        blogs: [...freeBlogs, ...premiumBlogs].sort(() => Math.random() - 0.5).slice(0, 3),
        courses: [], // Empty until courses table is created
        stats
      };
    } catch (error) {
      console.error('Error fetching featured content:', error);
      return {
        blogs: [],
        courses: [],
        stats: {
          totalBlogs: 0,
          totalCourses: 0,
          freeBlogs: 0,
          premiumBlogs: 0,
          freeCourses: 0,
          premiumCourses: 0
        }
      };
    }
  }

  // ===== CONTENT STATISTICS =====
  
  // Get comprehensive content statistics
  static async getContentStats() {
    try {
      const [totalBlogs, freeBlogs, premiumBlogs] = await Promise.all([
        this.getBlogs(),
        this.getFreeBlogs(),
        this.getPremiumBlogs(),
      ]);

      return {
        totalBlogs: totalBlogs.length,
        totalCourses: 0, // Will be updated when courses table is created
        freeBlogs: freeBlogs.length,
        premiumBlogs: premiumBlogs.length,
        freeCourses: 0, // Will be updated when courses table is created
        premiumCourses: 0 // Will be updated when courses table is created
      };
    } catch (error) {
      console.error('Error fetching content stats:', error);
      return {
        totalBlogs: 0,
        totalCourses: 0,
        freeBlogs: 0,
        premiumBlogs: 0,
        freeCourses: 0,
        premiumCourses: 0
      };
    }
  }

  // ===== SEARCH AND FILTERING =====
  
  // Search across all content
  static async searchContent(query: string, type?: 'blog' | 'course'): Promise<{ blogs: Blog[], courses: any[] }> {
    try {
      const results = { blogs: [], courses: [] };

      if (!type || type === 'blog') {
        results.blogs = await this.getBlogs({ search: query });
      }

      // Courses search will be enabled when courses table is created
      // if (!type || type === 'course') {
      //   results.courses = await this.getCourses({ search: query });
      // }

      return results;
    } catch (error) {
      console.error('Error searching content:', error);
      return { blogs: [], courses: [] };
    }
  }

  // Get content categories
  static async getContentCategories() {
    try {
      const blogs = await this.getBlogs();

      const blogTags = new Set<string>();
      const courseCategories: string[] = []; // Empty until courses table is created
      const courseLevels: string[] = []; // Empty until courses table is created

      blogs.forEach(blog => {
        blog.tags?.forEach(tag => blogTags.add(tag));
      });

      return {
        blogTags: Array.from(blogTags),
        courseCategories,
        courseLevels
      };
    } catch (error) {
      console.error('Error fetching content categories:', error);
      return {
        blogTags: [],
        courseCategories: [],
        courseLevels: []
      };
    }
  }

  // ===== UTILITY METHODS =====
  
  // Check if content exists
  static async contentExists(id: string, type: 'blog' | 'course'): Promise<boolean> {
    try {
      if (type === 'blog') {
        const blog = await this.getBlogById(id);
        return blog !== null;
      } else {
        // Course check will be enabled when courses table is created
        // const course = await this.getCourseById(id);
        // return course !== null;
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  // Get content preview (for cards)
  static getContentPreview(content: string, maxLength: number = 150): string {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength).trim() + '...';
  }

  // Calculate reading time
  static calculateReadingTime(content: string, wordsPerMinute: number = 200): number {
    const words = content.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  }
}
