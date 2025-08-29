import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Blog = Database["public"]["Tables"]["blogs"]["Row"];

export interface BlogWithImage extends Blog {
  featured_image_url: string;
}

export const blogService = {
  // Fetch all published blogs
  async getPublishedBlogs(): Promise<BlogWithImage[]> {
    try {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching blogs:", error);
        throw error;
      }

      // Add default image if none exists
      const blogsWithImages = data?.map(blog => ({
        ...blog,
        featured_image_url: blog.featured_image_url || "/hero-education.jpg"
      })) || [];

      return blogsWithImages;
    } catch (error) {
      console.error("Error in getPublishedBlogs:", error);
      return [];
    }
  },

  // Fetch popular blogs (you can implement your own logic for popularity)
  async getPopularBlogs(limit: number = 6): Promise<BlogWithImage[]> {
    try {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false })
        .limit(limit);

      if (error) {
        console.error("Error fetching popular blogs:", error);
        throw error;
      }

      // Add default image if none exists
      const blogsWithImages = data?.map(blog => ({
        ...blog,
        featured_image_url: blog.featured_image_url || "/hero-education.jpg"
      })) || [];

      return blogsWithImages;
    } catch (error) {
      console.error("Error in getPopularBlogs:", error);
      return [];
    }
  },

  // Fetch a single blog by ID
  async getBlogById(id: string): Promise<BlogWithImage | null> {
    try {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("id", id)
        .eq("published", true)
        .single();

      if (error) {
        console.error("Error fetching blog:", error);
        return null;
      }

      return {
        ...data,
        featured_image_url: data.featured_image_url || "/hero-education.jpg"
      };
    } catch (error) {
      console.error("Error in getBlogById:", error);
      return null;
    }
  }
};

