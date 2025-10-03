import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { fetchCourses, fetchCourseById, Course } from '@/lib/courseService';
import { fetchAllBlogs, fetchBlogById, Blog } from '@/lib/blogService';

// State interface
interface DataState {
  courses: Course[];
  blogs: Blog[];
  loading: {
    courses: boolean;
    blogs: boolean;
  };
  error: {
    courses: string | null;
    blogs: string | null;
  };
  lastFetched: {
    courses: number | null;
    blogs: number | null;
  };
}

// Action types
type DataAction =
  | { type: 'FETCH_COURSES_START' }
  | { type: 'FETCH_COURSES_SUCCESS'; payload: Course[] }
  | { type: 'FETCH_COURSES_ERROR'; payload: string }
  | { type: 'FETCH_BLOGS_START' }
  | { type: 'FETCH_BLOGS_SUCCESS'; payload: Blog[] }
  | { type: 'FETCH_BLOGS_ERROR'; payload: string }
  | { type: 'REFRESH_COURSES' }
  | { type: 'REFRESH_BLOGS' };

// Initial state
const initialState: DataState = {
  courses: [],
  blogs: [],
  loading: {
    courses: false,
    blogs: false,
  },
  error: {
    courses: null,
    blogs: null,
  },
  lastFetched: {
    courses: null,
    blogs: null,
  },
};

// Reducer
function dataReducer(state: DataState, action: DataAction): DataState {
  switch (action.type) {
    case 'FETCH_COURSES_START':
      return {
        ...state,
        loading: { ...state.loading, courses: true },
        error: { ...state.error, courses: null },
      };
    case 'FETCH_COURSES_SUCCESS':
      return {
        ...state,
        courses: action.payload,
        loading: { ...state.loading, courses: false },
        error: { ...state.error, courses: null },
        lastFetched: { ...state.lastFetched, courses: Date.now() },
      };
    case 'FETCH_COURSES_ERROR':
      return {
        ...state,
        loading: { ...state.loading, courses: false },
        error: { ...state.error, courses: action.payload },
      };
    case 'FETCH_BLOGS_START':
      return {
        ...state,
        loading: { ...state.loading, blogs: true },
        error: { ...state.error, blogs: null },
      };
    case 'FETCH_BLOGS_SUCCESS':
      return {
        ...state,
        blogs: action.payload,
        loading: { ...state.loading, blogs: false },
        error: { ...state.error, blogs: null },
        lastFetched: { ...state.lastFetched, blogs: Date.now() },
      };
    case 'FETCH_BLOGS_ERROR':
      return {
        ...state,
        loading: { ...state.loading, blogs: false },
        error: { ...state.error, blogs: action.payload },
      };
    case 'REFRESH_COURSES':
      return {
        ...state,
        loading: { ...state.loading, courses: true },
        error: { ...state.error, courses: null },
      };
    case 'REFRESH_BLOGS':
      return {
        ...state,
        loading: { ...state.loading, blogs: true },
        error: { ...state.error, blogs: null },
      };
    default:
      return state;
  }
}

// Context
const DataContext = createContext<{
  state: DataState;
  dispatch: React.Dispatch<DataAction>;
  // Utility methods
  getCourseById: (id: string) => Course | undefined;
  getBlogById: (id: string) => Blog | undefined;
  refreshCourses: () => Promise<void>;
  refreshBlogs: () => Promise<void>;
  // Data access methods
  getCourses: () => Course[];
  getBlogs: () => Blog[];
  getPopularCourses: (limit?: number) => Course[];
  getPopularBlogs: (limit?: number) => Blog[];
} | null>(null);

// Provider component
export function DataProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  // Fetch courses on mount
  useEffect(() => {
    const loadCourses = async () => {
      if (state.courses.length === 0 && !state.loading.courses) {
        dispatch({ type: 'FETCH_COURSES_START' });
        try {
          const courses = await fetchCourses();
          dispatch({ type: 'FETCH_COURSES_SUCCESS', payload: courses });
        } catch (error) {
          dispatch({ type: 'FETCH_COURSES_ERROR', payload: 'Failed to load courses' });
        }
      }
    };

    loadCourses();
  }, []);

  // Fetch blogs on mount
  useEffect(() => {
    const loadBlogs = async () => {
      if (state.blogs.length === 0 && !state.loading.blogs) {
        dispatch({ type: 'FETCH_BLOGS_START' });
        try {
          const blogs = await fetchAllBlogs();
          dispatch({ type: 'FETCH_BLOGS_SUCCESS', payload: blogs });
        } catch (error) {
          dispatch({ type: 'FETCH_BLOGS_ERROR', payload: 'Failed to load blogs' });
        }
      }
    };

    loadBlogs();
  }, []);

  // Utility methods
  const getCourseById = (id: string): Course | undefined => {
    return state.courses.find(course => course.id === id);
  };

  const getBlogById = (id: string): Blog | undefined => {
    return state.blogs.find(blog => blog.id === id);
  };

  const refreshCourses = async (): Promise<void> => {
    dispatch({ type: 'REFRESH_COURSES' });
    try {
      const courses = await fetchCourses();
      dispatch({ type: 'FETCH_COURSES_SUCCESS', payload: courses });
    } catch (error) {
      dispatch({ type: 'FETCH_COURSES_ERROR', payload: 'Failed to refresh courses' });
    }
  };

  const refreshBlogs = async (): Promise<void> => {
    dispatch({ type: 'REFRESH_BLOGS' });
    try {
      const blogs = await fetchAllBlogs();
      dispatch({ type: 'FETCH_BLOGS_SUCCESS', payload: blogs });
    } catch (error) {
      dispatch({ type: 'FETCH_BLOGS_ERROR', payload: 'Failed to refresh blogs' });
    }
  };

  const getCourses = (): Course[] => {
    return state.courses;
  };

  const getBlogs = (): Blog[] => {
    return state.blogs;
  };

  const getPopularCourses = (limit: number = 3): Course[] => {
    return state.courses
      .filter(course => course.isMostPopular)
      .slice(0, limit);
  };

  const getPopularBlogs = (limit: number = 3): Blog[] => {
    // First try to get blogs with popular labels
    const popularBlogs = state.blogs.filter(blog => 
      blog.labels?.includes('Most Popular') || 
      blog.labels?.includes('popular') ||
      blog.labels?.includes('Popular')
    );
    
    // If we have popular blogs, return them
    if (popularBlogs.length > 0) {
      return popularBlogs.slice(0, limit);
    }
    
    // If no popular blogs found, return the most recent blogs
    return state.blogs
      .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
      .slice(0, limit);
  };

  const value = {
    state,
    dispatch,
    getCourseById,
    getBlogById,
    refreshCourses,
    refreshBlogs,
    getCourses,
    getBlogs,
    getPopularCourses,
    getPopularBlogs,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

// Hook to use the data context
export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}

export default DataContext;
