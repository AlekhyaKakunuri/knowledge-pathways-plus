// Firebase Blog Service
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
} from 'firebase/firestore';
import { db } from './firebase';

export interface Blog {
  id: string;
  title: string;
  content_html: string;
  excerpt: string;
  author: string;
  published_at: string;
  created_at: string;
  updated_at: string;
  readTime: string;
  likes: number;
  comments: number;
  shares: number;
  link: string;
  slug: string;
  tags: string[];
  labels: string[];
  thumbnail_url?: string;
  cover_url?: string;
  access_type: 'free' | 'premium';
  category: string;
  status: 'draft' | 'published' | 'archived';
  generator?: string;
  language?: string;
  metadata?: any;
  web_master?: string;
}

// Fetch all published blogs
export const fetchAllBlogs = async (): Promise<Blog[]> => {
  try {
    const blogsRef = collection(db, 'blogs');
    
    // First, let's try a basic query to see if the collection exists
    const basicQuery = await getDocs(blogsRef);
    
    if (basicQuery.size === 0) {
      return [];
    }
    
    // Use basic query and filter in code for consistency
    const querySnapshot = basicQuery;
    
    const blogs: Blog[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      
      // Check if blog is approved (either at root level or in metadata)
      const isApproved = data.status === 'approved';
      
      if (!isApproved) {
        return;
      }
      
      blogs.push({
        id: doc.id,
        title: data.title || 'Untitled',
        content_html: data.content_html || '',
        excerpt: data.excerpt || '',
        author: data.author || 'Admin',
        published_at: data.published_at?.toDate?.()?.toISOString() || data.published_at || data.metadata?.published_at || new Date().toISOString(),
        created_at: data.created_at?.toDate?.()?.toISOString() || data.created_at || data.metadata?.created_at || new Date().toISOString(),
        updated_at: data.updated_at?.toDate?.()?.toISOString() || data.updated_at || data.metadata?.updated_at || new Date().toISOString(),
        readTime: `${Math.ceil((data.content_html?.length || 0) / 200)} min read`,
        likes: data.likes || 0,
        comments: data.comments || 0,
        shares: data.shares || 0,
        link: data.link || `/blog/${doc.id}`,
        slug: data.slug || doc.id,
        tags: data.tags || [],
        labels: data.labels || [],
        thumbnail_url: data.thumbnail_url || undefined,
        cover_url: data.cover_url || undefined,
        access_type: data.access_type || 'free',
        category: data.category || 'General',
        status: data.status || 'published',
        generator: data.generator || undefined,
        language: data.language || 'en',
        metadata: data.metadata || undefined,
        web_master: data.web_master || undefined
      });
    });
    
    return blogs;
  } catch (error) {
    return [];
  }
};

// Fetch a single blog by ID
export const fetchBlogById = async (blogId: string): Promise<Blog | null> => {
  try {
    
    const blogRef = doc(db, 'blogs', blogId);
    const blogSnap = await getDoc(blogRef);
    
    if (blogSnap.exists()) {
      const data = blogSnap.data();
      const blog: Blog = {
        id: blogSnap.id,
        title: data.title || 'Untitled',
        content_html: data.content_html || '',
        excerpt: data.excerpt || '',
        author: data.author || 'Admin',
        published_at: data.published_at?.toDate?.()?.toISOString() || data.published_at || data.metadata?.published_at || new Date().toISOString(),
        created_at: data.created_at?.toDate?.()?.toISOString() || data.created_at || data.metadata?.created_at || new Date().toISOString(),
        updated_at: data.updated_at?.toDate?.()?.toISOString() || data.updated_at || data.metadata?.updated_at || new Date().toISOString(),
        readTime: `${Math.ceil((data.content_html?.length || 0) / 200)} min read`,
        likes: data.likes || 0,
        comments: data.comments || 0,
        shares: data.shares || 0,
        link: data.link || `/blog/${blogSnap.id}`,
        slug: data.slug || blogSnap.id,
        tags: data.tags || [],
        labels: data.labels || [],
        thumbnail_url: data.thumbnail_url || undefined,
        cover_url: data.cover_url || undefined,
        access_type: data.access_type || 'free',
        category: data.category || 'General',
        status: data.status || 'published',
        generator: data.generator || undefined,
        language: data.language || 'en',
        metadata: data.metadata || undefined,
        web_master: data.web_master || undefined
      };
      
      return blog;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

// Fetch popular blogs (most liked)
export const fetchPopularBlogs = async (limitCount: number = 3): Promise<Blog[]> => {
  try {
    
    const blogsRef = collection(db, 'blogs');
    
    // First, let's try a basic query to see if the collection exists
    const basicQuery = await getDocs(blogsRef);
    
    if (basicQuery.size === 0) {
      return [];
    }
    
    // Use basic query and filter in code for consistency
    const limitedDocs = basicQuery.docs.slice(0, limitCount);
    const querySnapshot = { docs: limitedDocs, size: limitedDocs.length } as any;
    
    const blogs: Blog[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      
      // Check if blog is approved (either at root level or in metadata)
      const isApproved = data.status === 'approved';
      
      if (!isApproved) {
        return;
      }
      
      blogs.push({
        id: doc.id,
        title: data.title || 'Untitled',
        content_html: data.content_html || '',
        excerpt: data.excerpt || '',
        author: data.author || 'Admin',
        published_at: data.published_at?.toDate?.()?.toISOString() || data.published_at || data.metadata?.published_at || new Date().toISOString(),
        created_at: data.created_at?.toDate?.()?.toISOString() || data.created_at || data.metadata?.created_at || new Date().toISOString(),
        updated_at: data.updated_at?.toDate?.()?.toISOString() || data.updated_at || data.metadata?.updated_at || new Date().toISOString(),
        readTime: `${Math.ceil((data.content_html?.length || 0) / 200)} min read`,
        likes: data.likes || 0,
        comments: data.comments || 0,
        shares: data.shares || 0,
        link: data.link || `/blog/${doc.id}`,
        slug: data.slug || doc.id,
        tags: data.tags || [],
        labels: data.labels || [],
        thumbnail_url: data.thumbnail_url || undefined,
        cover_url: data.cover_url || undefined,
        access_type: data.access_type || 'free',
        category: data.category || 'General',
        status: data.status || 'published',
        generator: data.generator || undefined,
        language: data.language || 'en',
        metadata: data.metadata || undefined,
        web_master: data.web_master || undefined
      });
    });
    
    return blogs;
  } catch (error) {
    return [];
  }
};