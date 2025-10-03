import { collection, getDocs, query, orderBy, doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

export interface Course {
  id: string;
  title: string;
  short_description: string;
  description: string;
  duration: number;
  instructor: {
    name: string;
    img_url?: string;
    linkedin_profile_url?: string;
  };
  mrp: number;
  price: number;
  sale_price: number;
  tags: string[];
  thumbnail_url: string;
  banner_url: string;
  preview_video_url?: string;
  category: string;
  level: string;
  language: string;
  status: string;
  is_premium: boolean;
  enrollment_count: number;
  average_rating: number;
  addons: Array<{
    title: string;
    description: string;
    icon_id: string;
  }>;
  prerequisites: Array<{
    title: string;
    description: string;
    icon_id: string;
  }>;
  curriculum: Array<{
    module_title: string;
    duration_minutes: number;
    mini_project: string;
    lessons: Array<{
      title: string;
      duration_minutes: number;
      video_url?: string;
    }>;
  }>;
  course_curriculum?: Array<{
    module_title: string;
    duration_minutes: number;
    mini_project: string;
    lessons: Array<{
      title: string;
      duration_minutes: number;
      video_url?: string;
    }>;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  created_at: string;
  updated_at: string;
  slug: string;
  planCode?: string; // Plan code for payment processing
  // Computed fields
  isFree?: boolean;
  isPremium?: boolean;
  isMostPopular?: boolean;
  color?: string;
}

// Helper to safely get date string
const getDateString = (data: any, field: string): string => {
  const date = data[field]?.toDate?.() || data[field];
  if (date instanceof Date) {
    return date.toISOString();
  }
  return date || new Date().toISOString();
};

// Fetch all courses from Firestore
export const fetchCourses = async (): Promise<Course[]> => {
  try {
    const coursesRef = collection(db, 'courses');
    const simpleQuery = query(coursesRef);
    const simpleSnapshot = await getDocs(simpleQuery);
    
    if (simpleSnapshot.empty) {
      return [];
    }
    
    const courses: Course[] = [];
    
    simpleSnapshot.forEach((doc) => {
      const data = doc.data();
      
      // Handle instructor data (can be string or object)
      const instructor = typeof data.instructor === 'string' 
        ? { name: data.instructor, img_url: '', linkedin_profile_url: '' }
        : {
            name: data.instructor?.name || 'Unknown Instructor',
            img_url: data.instructor?.img_url || '',
            linkedin_profile_url: data.instructor?.linkedin_profile_url || ''
          };
      
      // Calculate computed fields
      const currentPrice = data.sale_price || data.price || 0;
      const isFree = currentPrice === 0;
      const isPremium = data.is_premium || currentPrice > 0;
      const isMostPopular = data.tags?.includes('Most Popular') || data.tags?.includes('popular') || false;
      
      const course: Course = {
        id: doc.id,
        title: data.title || 'Untitled Course',
        short_description: data.short_description || 'No description available',
        description: data.description || '',
        duration: data.duration || 0,
        instructor,
        mrp: data.mrp || 0,
        price: data.price || 0,
        sale_price: data.sale_price || 0,
        tags: data.tags || [],
        thumbnail_url: data.thumbnail_url || '',
        banner_url: data.banner_url || '',
        preview_video_url: data.preview_video_url || '',
        category: data.category || 'General',
        level: data.level || 'beginner',
        language: data.language || 'en',
        status: data.status || 'draft',
        is_premium: data.is_premium || false,
        enrollment_count: data.enrollment_count || 0,
        average_rating: data.average_rating || 0,
        addons: data.addons || [],
        prerequisites: data.prerequisites || [],
        curriculum: data.curriculum || data.course_curriculum || [],
        course_curriculum: data.course_curriculum || data.curriculum || [],
        faqs: data.faqs || [],
        created_at: getDateString(data, 'created_at'),
        updated_at: getDateString(data, 'updated_at'),
        slug: data.slug || doc.id,
        planCode: data.planCode || data.plan_code || '',
        // Computed fields
        isFree,
        isPremium,
        isMostPopular,
        color: data.color || '#007bff',
      };
      courses.push(course);
    });
    
    return courses;
  } catch (error) {
    return [];
  }
};

// Fetch a single course by ID
export const fetchCourseById = async (courseId: string): Promise<Course | null> => {
  try {
    const courseRef = doc(db, 'courses', courseId);
    const courseSnap = await getDoc(courseRef);

    if (courseSnap.exists()) {
      const data = courseSnap.data();
      
      // Handle instructor data
      const instructor = typeof data.instructor === 'string' 
        ? { name: data.instructor, img_url: '', linkedin_profile_url: '' }
        : {
            name: data.instructor?.name || 'Unknown Instructor',
            img_url: data.instructor?.img_url || '',
            linkedin_profile_url: data.instructor?.linkedin_profile_url || ''
          };
      
      // Calculate computed fields
      const currentPrice = data.sale_price || data.price || 0;
      const isFree = currentPrice === 0;
      const isPremium = data.is_premium || currentPrice > 0;
      const isMostPopular = data.tags?.includes('Most Popular') || data.tags?.includes('popular') || false;
      
      const course: Course = {
        id: courseSnap.id,
        title: data.title || 'Untitled Course',
        short_description: data.short_description || 'No description available',
        description: data.description || '',
        duration: data.duration || 0,
        instructor,
        mrp: data.mrp || 0,
        price: data.price || 0,
        sale_price: data.sale_price || 0,
        tags: data.tags || [],
        thumbnail_url: data.thumbnail_url || '',
        banner_url: data.banner_url || '',
        preview_video_url: data.preview_video_url || '',
        category: data.category || 'General',
        level: data.level || 'beginner',
        language: data.language || 'en',
        status: data.status || 'draft',
        is_premium: data.is_premium || false,
        enrollment_count: data.enrollment_count || 0,
        average_rating: data.average_rating || 0,
        addons: data.addons || [],
        prerequisites: data.prerequisites || [],
        curriculum: data.curriculum || data.course_curriculum || [],
        course_curriculum: data.course_curriculum || data.curriculum || [],
        faqs: data.faqs || [],
        created_at: getDateString(data, 'created_at'),
        updated_at: getDateString(data, 'updated_at'),
        slug: data.slug || courseSnap.id,
        planCode: data.planCode || data.plan_code || '',
        // Computed fields
        isFree,
        isPremium,
        isMostPopular,
        color: data.color || '#007bff',
      };
      
      return course;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

// Get free courses
export const fetchFreeCourses = async (): Promise<Course[]> => {
  try {
    const courses = await fetchCourses();
    return courses.filter(course => course.isFree);
  } catch (error) {
    return [];
  }
};

// Get premium courses
export const fetchPremiumCourses = async (): Promise<Course[]> => {
  try {
    const courses = await fetchCourses();
    return courses.filter(course => course.isPremium);
  } catch (error) {
    return [];
  }
};