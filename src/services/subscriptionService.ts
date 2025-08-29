import { supabase } from '@/lib/supabase';

// ========================================
// TYPE DEFINITIONS
// ========================================

export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  is_active: boolean;
  email_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface Plan {
  id: string;
  name: string;
  display_name: string;
  description?: string;
  price_inr: number;
  duration_days: number;
  features?: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserSubscription {
  id: string;
  user_id: string;
  plan_id: string;
  payment_status: 'PAID' | 'FAILED' | 'PENDING';
  subscription_status: 'ACTIVE' | 'EXPIRED' | 'CANCELLED';
  amount_inr: number;
  currency: string;
  payment_date?: string;
  subscription_start: string;
  subscription_end?: string;
  payment_gateway?: string;
  payment_reference?: string;
  created_at: string;
  updated_at: string;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  content_type: 'FREE' | 'PREMIUM';
  author_id?: string;
  tags?: string[];cd
  is_published: boolean;
  published_at?: string;
  featured_image_url?: string;
  read_time_minutes?: number;
  created_at: string;
  updated_at: string;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  description?: string;
  short_description?: string;
  price_inr: number;
  original_price_inr?: number;
  currency: string;
  access_type: string;
  duration?: string;
  level?: string;
  category?: string;
  instructor_id?: string;
  featured_image_url?: string;
  preview_video_url?: string;
  is_published: boolean;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export interface CourseModule {
  id: string;
  course_id: string;
  title: string;
  description?: string;
  order_index: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface CourseLesson {
  id: string;
  module_id: string;
  title: string;
  description?: string;
  content_type: 'VIDEO' | 'TEXT' | 'QUIZ' | 'ASSIGNMENT';
  content_url?: string;
  duration_minutes?: number;
  order_index: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserCourse {
  id: string;
  user_id: string;
  course_id: string;
  payment_status: 'PAID' | 'FAILED' | 'PENDING';
  access_status: 'ACTIVE' | 'EXPIRED' | 'REVOKED';
  amount_paid_inr: number;
  currency: string;
  payment_date: string;
  payment_gateway?: string;
  payment_reference?: string;
  purchase_date: string;
  expires_at?: string;
  created_at: string;
  updated_at: string;
}

export interface UserPlanInfo {
  plan_name: string;
  display_name: string;
  subscription_status: string;
  payment_status: string;
  amount_inr: number;
  subscription_end?: string;
}

export interface UserCourseInfo {
  course_id: string;
  course_title: string;
  purchase_date: string;
  amount_paid_inr: number;
  access_status: string;
}

// ========================================
// SUBSCRIPTION SERVICE CLASS
// ========================================

export class SubscriptionService {
  // ========================================
  // PLAN MANAGEMENT
  // ========================================

  static async getAllPlans(): Promise<Plan[]> {
    try {
      const { data, error } = await supabase
        .from('plans')
        .select('*')
        .eq('is_active', true)
        .order('price_inr', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching plans:', error);
      return [];
    }
  }

  static async getPlanById(planId: string): Promise<Plan | null> {
    try {
      const { data, error } = await supabase
        .from('plans')
        .select('*')
        .eq('id', planId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching plan:', error);
      return null;
    }
  }

  // ========================================
  // USER SUBSCRIPTION MANAGEMENT (FOR BLOGS)
  // ========================================

  static async getUserBlogPlan(userId: string): Promise<UserPlanInfo | null> {
    try {
      const { data, error } = await supabase
        .rpc('get_user_blog_plan', { user_uuid: userId });

      if (error) throw error;
      return data?.[0] || null;
    } catch (error) {
      console.error('Error fetching user blog plan:', error);
      return null;
    }
  }

  static async createUserSubscription(
    userId: string,
    planId: string,
    amountInr: number,
    paymentGateway: string,
    paymentReference: string
  ): Promise<UserSubscription | null> {
    try {
      const { data, error } = await supabase
        .from('user_subscriptions')
        .insert({
          user_id: userId,
          plan_id: planId,
          payment_status: 'PAID',
          subscription_status: 'ACTIVE',
          amount_inr: amountInr,
          payment_gateway: paymentGateway,
          payment_reference: paymentReference,
          subscription_start: new Date().toISOString(),
          subscription_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating user subscription:', error);
      return null;
    }
  }

  static async updateSubscriptionStatus(
    subscriptionId: string,
    status: 'ACTIVE' | 'EXPIRED' | 'CANCELLED'
  ): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('user_subscriptions')
        .update({ subscription_status: status })
        .eq('id', subscriptionId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error updating subscription status:', error);
      return false;
    }
  }

  // ========================================
  // BLOG ACCESS CONTROL
  // ========================================

  static async canAccessBlog(userId: string, blogId: string): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .rpc('can_access_blog', { user_uuid: userId, blog_id: blogId });

      if (error) throw error;
      return data || false;
    } catch (error) {
      console.error('Error checking blog access:', error);
      return false;
    }
  }

  static async getAccessibleBlogs(userId: string): Promise<Blog[]> {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('is_published', true)
        .or(`content_type.eq.FREE,and(can_access_blog.eq.${userId})`);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching accessible blogs:', error);
      return [];
    }
  }

  // ========================================
  // COURSE ACCESS CONTROL (UDEMY-STYLE)
  // ========================================

  static async canAccessCourse(userId: string, courseId: string): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .rpc('can_access_course', { user_uuid: userId, course_id: courseId });

      if (error) throw error;
      return data || false;
    } catch (error) {
      console.error('Error checking course access:', error);
      return false;
    }
  }

  static async getUserPurchasedCourses(userId: string): Promise<UserCourseInfo[]> {
    try {
      const { data, error } = await supabase
        .rpc('get_user_purchased_courses', { user_uuid: userId });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching user purchased courses:', error);
      return [];
    }
  }

  static async purchaseCourse(
    userId: string,
    courseId: string,
    amountInr: number,
    paymentGateway: string,
    paymentReference: string
  ): Promise<UserCourse | null> {
    try {
      const { data, error } = await supabase
        .from('user_courses')
        .insert({
          user_id: userId,
          course_id: courseId,
          payment_status: 'PAID',
          access_status: 'ACTIVE',
          amount_paid_inr: amountInr,
          payment_gateway: paymentGateway,
          payment_reference: paymentReference,
          purchase_date: new Date().toISOString()
          // expires_at is NULL for lifetime access
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error purchasing course:', error);
      return null;
    }
  }

  static async getCourseWithAccessStatus(
    userId: string,
    courseId: string
  ): Promise<{ course: Course; access_status: 'UNLOCKED' | 'LOCKED' } | null> {
    try {
      const { data, error } = await supabase
        .rpc('can_access_course', { user_uuid: userId, course_id: courseId });

      if (error) throw error;

      const { data: course, error: courseError } = await supabase
        .from('courses')
        .select('*')
        .eq('id', courseId)
        .single();

      if (courseError) throw courseError;

      return {
        course,
        access_status: data ? 'UNLOCKED' : 'LOCKED'
      };
    } catch (error) {
      console.error('Error fetching course with access status:', error);
      return null;
    }
  }

  // ========================================
  // COURSE CONTENT ACCESS
  // ========================================

  static async getCourseModules(courseId: string, userId: string): Promise<CourseModule[]> {
    try {
      // Check if user owns the course
      const canAccess = await this.canAccessCourse(userId, courseId);
      if (!canAccess) {
        return [];
      }

      const { data, error } = await supabase
        .from('course_modules')
        .select('*')
        .eq('course_id', courseId)
        .eq('is_published', true)
        .order('order_index', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching course modules:', error);
      return [];
    }
  }

  static async getCourseLessons(moduleId: string, userId: string): Promise<CourseLesson[]> {
    try {
      // Get the course ID from the module
      const { data: module, error: moduleError } = await supabase
        .from('course_modules')
        .select('course_id')
        .eq('id', moduleId)
        .single();

      if (moduleError) throw moduleError;

      // Check if user owns the course
      const canAccess = await this.canAccessCourse(userId, module.course_id);
      if (!canAccess) {
        return [];
      }

      const { data, error } = await supabase
        .from('course_lessons')
        .select('*')
        .eq('module_id', moduleId)
        .eq('is_published', true)
        .order('order_index', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching course lessons:', error);
      return [];
    }
  }

  // ========================================
  // UTILITY FUNCTIONS
  // ========================================

  static async getUserStats(userId: string): Promise<{
    blogPlan: string;
    purchasedCoursesCount: number;
    totalSpent: number;
  }> {
    try {
      const [blogPlan, purchasedCourses] = await Promise.all([
        this.getUserBlogPlan(userId),
        this.getUserPurchasedCourses(userId)
      ]);

      const totalSpent = purchasedCourses.reduce((sum, course) => sum + course.amount_paid_inr, 0);

      return {
        blogPlan: blogPlan?.plan_name || 'free',
        purchasedCoursesCount: purchasedCourses.length,
        totalSpent
      };
    } catch (error) {
      console.error('Error fetching user stats:', error);
      return {
        blogPlan: 'free',
        purchasedCoursesCount: 0,
        totalSpent: 0
      };
    }
  }

  static async checkPaymentStatus(paymentReference: string): Promise<{
    status: 'PAID' | 'FAILED' | 'PENDING';
    amount: number;
    currency: string;
  } | null> {
    try {
      // This would integrate with your payment gateway (Razorpay, etc.)
      // For now, returning mock data
      return {
        status: 'PAID',
        amount: 0,
        currency: 'INR'
      };
    } catch (error) {
      console.error('Error checking payment status:', error);
      return null;
    }
  }
}

// ========================================
// REACT HOOKS
// ========================================

import { useState, useEffect, useCallback } from 'react';

export const useBlogSubscription = (userId: string) => {
  const [userPlan, setUserPlan] = useState<UserPlanInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserPlan = async () => {
      try {
        setLoading(true);
        const plan = await SubscriptionService.getUserBlogPlan(userId);
        setUserPlan(plan);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch user plan');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserPlan();
    }
  }, [userId]);

  const canAccessBlog = useCallback(async (blogId: string) => {
    return await SubscriptionService.canAccessBlog(userId, blogId);
  }, [userId]);

  return {
    userPlan,
    loading,
    error,
    canAccessBlog,
    hasActiveSubscription: userPlan?.plan_name !== 'free',
    isSubscribedUser: userPlan?.plan_name === 'subscribed'
  };
};

export const useCourseAccess = (userId: string) => {
  const [purchasedCourses, setPurchasedCourses] = useState<UserCourseInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPurchasedCourses = async () => {
      try {
        setLoading(true);
        const courses = await SubscriptionService.getUserPurchasedCourses(userId);
        setPurchasedCourses(courses);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch purchased courses');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchPurchasedCourses();
    }
  }, [userId]);

  const canAccessCourse = useCallback(async (courseId: string) => {
    return await SubscriptionService.canAccessCourse(userId, courseId);
  }, [userId]);

  const purchaseCourse = useCallback(async (
    courseId: string,
    amountInr: number,
    paymentGateway: string,
    paymentReference: string
  ) => {
    return await SubscriptionService.purchaseCourse(userId, courseId, amountInr, paymentGateway, paymentReference);
  }, [userId]);

  return {
    purchasedCourses,
    loading,
    error,
    canAccessCourse,
    purchaseCourse,
    hasPurchasedCourse: (courseId: string) => purchasedCourses.some(c => c.course_id === courseId)
  };
};
