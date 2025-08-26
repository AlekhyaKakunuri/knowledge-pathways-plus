-- Create blogs table
CREATE TABLE public.blogs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image_url TEXT,
  is_premium BOOLEAN NOT NULL DEFAULT false,
  published BOOLEAN NOT NULL DEFAULT false,
  tags TEXT[],
  author_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create courses table
CREATE TABLE public.courses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  duration TEXT NOT NULL,
  level TEXT NOT NULL,
  category TEXT NOT NULL,
  instructor TEXT NOT NULL,
  instructor_avatar TEXT,
  thumbnail_url TEXT,
  is_premium BOOLEAN NOT NULL DEFAULT false,
  price INTEGER NOT NULL DEFAULT 0,
  modules TEXT[],
  students_count INTEGER NOT NULL DEFAULT 0,
  rating DECIMAL(3,2) NOT NULL DEFAULT 0.0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

-- Create policies for blogs
CREATE POLICY "Anyone can view published blogs" 
ON public.blogs 
FOR SELECT 
USING (published = true);

CREATE POLICY "Authors can manage their own blogs" 
ON public.blogs 
FOR ALL 
USING (auth.uid() = author_id);

-- Create policies for courses
CREATE POLICY "Anyone can view courses" 
ON public.courses 
FOR SELECT 
USING (true);

CREATE POLICY "Instructors can manage their own courses" 
ON public.courses 
FOR ALL 
USING (auth.uid()::text = instructor);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_blogs_updated_at
BEFORE UPDATE ON public.blogs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_courses_updated_at
BEFORE UPDATE ON public.courses
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data for testing
INSERT INTO public.blogs (title, content, excerpt, is_premium, published, tags, author_id) VALUES
-- FREE BLOGS
(
  'Getting Started with React Hooks',
  'React Hooks are a powerful feature introduced in React 16.8 that allows you to use state and other React features without writing a class component. In this comprehensive guide, we will explore the most commonly used hooks and how to implement them in your React applications. We will cover useState, useEffect, useContext, useReducer, and custom hooks. You will learn how to manage component state, handle side effects, share data between components, and create reusable logic. By the end of this article, you will have a solid understanding of React Hooks and be able to use them effectively in your projects.',
  'Learn the fundamentals of React Hooks and how to use them effectively in your applications.',
  false,
  true,
  ARRAY['React', 'JavaScript', 'Frontend'],
  '00000000-0000-0000-0000-000000000001'
),
(
  'CSS Grid Layout: A Complete Guide',
  'CSS Grid Layout is a powerful two-dimensional layout system designed for the web. It lets you lay out items in rows and columns, and has many features that make building complex layouts straightforward. In this comprehensive guide, we will explore CSS Grid from the basics to advanced concepts. You will learn about grid containers, grid items, grid lines, grid areas, and responsive design techniques. We will also cover practical examples and best practices for using CSS Grid in real-world projects.',
  'Comprehensive guide to CSS Grid Layout with practical examples and best practices.',
  false,
  true,
  ARRAY['CSS', 'Layout', 'Frontend'],
  '00000000-0000-0000-0000-000000000001'
),
(
  'Introduction to TypeScript',
  'TypeScript is a superset of JavaScript that adds static typing to the language. It helps catch errors at compile time and provides better tooling support. In this beginner-friendly guide, we will explore TypeScript fundamentals including types, interfaces, classes, generics, and modules. You will learn how to set up a TypeScript project, configure the compiler, and gradually migrate existing JavaScript code. By the end, you will understand the benefits of TypeScript and how to use it effectively.',
  'Learn TypeScript fundamentals and how to add static typing to your JavaScript projects.',
  false,
  true,
  ARRAY['TypeScript', 'JavaScript', 'Programming'],
  '00000000-0000-0000-0000-000000000001'
),
(
  'Git Basics for Beginners',
  'Git is a distributed version control system that helps developers track changes in their code and collaborate with others. In this comprehensive guide, we will cover Git fundamentals including repositories, commits, branches, merging, and remote collaboration. You will learn essential Git commands, understand branching strategies, and discover best practices for version control. Whether you are new to Git or want to refresh your knowledge, this guide will provide you with a solid foundation.',
  'Master Git fundamentals and learn essential version control concepts and commands.',
  false,
  true,
  ARRAY['Git', 'Version Control', 'Development'],
  '00000000-0000-0000-0000-000000000001'
),
(
  'Responsive Web Design Principles',
  'Responsive web design is an approach that makes web pages render well on a variety of devices and window or screen sizes. In this comprehensive guide, we will explore responsive design principles, CSS media queries, flexible grids, and mobile-first development. You will learn how to create websites that work seamlessly across desktop, tablet, and mobile devices. We will also cover modern CSS techniques like Flexbox and Grid for building responsive layouts.',
  'Learn responsive web design principles and create websites that work on all devices.',
  false,
  true,
  ARRAY['CSS', 'Responsive Design', 'Frontend'],
  '00000000-0000-0000-0000-000000000001'
),

-- PREMIUM BLOGS
(
  'Advanced State Management with Redux Toolkit',
  'State management is a crucial aspect of building scalable React applications. Redux Toolkit provides a modern, opinionated way to work with Redux that simplifies common use cases and reduces boilerplate code. In this advanced guide, we will explore Redux Toolkit features including createSlice, createAsyncThunk, and RTK Query. You will learn how to implement complex state management patterns, handle asynchronous operations, and optimize performance. We will also cover testing strategies and best practices for large-scale applications.',
  'Master Redux Toolkit for efficient state management in large React applications.',
  true,
  true,
  ARRAY['React', 'Redux', 'State Management'],
  '00000000-0000-0000-0000-000000000001'
),
(
  'Advanced JavaScript Design Patterns',
  'Design patterns are reusable solutions to common problems in software design. In this comprehensive guide, we will explore advanced JavaScript design patterns including creational, structural, and behavioral patterns. You will learn about the Singleton pattern, Factory pattern, Observer pattern, and many more. We will also cover modern JavaScript features like modules, classes, and decorators for implementing these patterns. By the end, you will have a deep understanding of design patterns and how to apply them in your projects.',
  'Master advanced JavaScript design patterns and learn how to create maintainable, scalable code.',
  true,
  true,
  ARRAY['JavaScript', 'Design Patterns', 'Architecture'],
  '00000000-0000-0000-0000-000000000001'
),
(
  'Performance Optimization Techniques',
  'Performance optimization is crucial for creating fast, responsive web applications. In this advanced guide, we will explore various optimization techniques including code splitting, lazy loading, caching strategies, and bundle optimization. You will learn how to use tools like Webpack, analyze performance with Lighthouse, and implement best practices for faster loading times. We will also cover server-side optimization, CDN strategies, and monitoring techniques.',
  'Learn advanced performance optimization techniques to create lightning-fast web applications.',
  true,
  true,
  ARRAY['Performance', 'Optimization', 'Web Development'],
  '00000000-0000-0000-0000-000000000001'
),
(
  'Advanced CSS Animations and Transitions',
  'CSS animations and transitions can bring your websites to life with smooth, engaging interactions. In this comprehensive guide, we will explore advanced CSS animation techniques including keyframes, transforms, transitions, and 3D effects. You will learn how to create complex animations, optimize performance, and implement smooth user experiences. We will also cover animation libraries, browser compatibility, and best practices for creating professional-grade animations.',
  'Master advanced CSS animations and create stunning, interactive user experiences.',
  true,
  true,
  ARRAY['CSS', 'Animations', 'Frontend'],
  '00000000-0000-0000-0000-000000000001'
),
(
  'Full-Stack Development with Next.js',
  'Next.js is a powerful React framework that enables full-stack development with features like server-side rendering, API routes, and file-based routing. In this comprehensive guide, we will explore Next.js from basics to advanced concepts. You will learn how to build full-stack applications, implement authentication, handle database operations, and deploy to production. We will also cover performance optimization, SEO strategies, and best practices for building scalable applications.',
  'Learn full-stack development with Next.js and build production-ready applications.',
  true,
  true,
  ARRAY['Next.js', 'React', 'Full-Stack'],
  '00000000-0000-0000-0000-000000000001'
);

INSERT INTO public.courses (title, description, duration, level, category, instructor, instructor_avatar, is_premium, price, modules, students_count, rating) VALUES
-- FREE COURSES
(
  'React Fundamentals for Beginners',
  'Learn React from scratch with this comprehensive course designed for beginners. You will build real-world projects and understand core concepts including components, props, state, and lifecycle methods. This course provides hands-on experience with modern React development practices.',
  '8 hours',
  'Beginner',
  'Frontend Development',
  'Sarah Johnson',
  'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
  false,
  0,
  ARRAY['Introduction to React', 'Components and Props', 'State and Lifecycle', 'Handling Events', 'Conditional Rendering', 'Lists and Keys'],
  1250,
  4.8
),
(
  'HTML and CSS Fundamentals',
  'Master the basics of web development with HTML and CSS. Learn how to create structured web pages, style them beautifully, and make them responsive. This course covers semantic HTML, modern CSS techniques, and responsive design principles.',
  '6 hours',
  'Beginner',
  'Web Development',
  'Mike Chen',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  false,
  0,
  ARRAY['HTML Structure', 'CSS Styling', 'Layout Techniques', 'Responsive Design', 'Forms and Inputs', 'Best Practices'],
  2100,
  4.7
),
(
  'JavaScript Basics',
  'Learn JavaScript fundamentals including variables, functions, objects, arrays, and DOM manipulation. This course provides a solid foundation for web development and prepares you for learning frameworks like React.',
  '10 hours',
  'Beginner',
  'JavaScript',
  'Emily Rodriguez',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
  false,
  0,
  ARRAY['Variables and Data Types', 'Functions and Scope', 'Objects and Arrays', 'DOM Manipulation', 'Events and Handlers', 'Async JavaScript'],
  1800,
  4.6
),
(
  'Git and GitHub for Beginners',
  'Learn version control with Git and collaboration with GitHub. This course covers essential Git commands, branching strategies, and collaborative workflows. Perfect for developers who want to work effectively in teams.',
  '4 hours',
  'Beginner',
  'Version Control',
  'David Kim',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  false,
  0,
  ARRAY['Git Basics', 'Repository Management', 'Branching and Merging', 'Collaboration', 'GitHub Workflows', 'Best Practices'],
  950,
  4.5
),
(
  'CSS Flexbox and Grid',
  'Master modern CSS layout techniques with Flexbox and Grid. Learn how to create flexible, responsive layouts that work across all devices. This course covers practical examples and real-world use cases.',
  '5 hours',
  'Beginner',
  'CSS',
  'Lisa Wang',
  'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
  false,
  0,
  ARRAY['Flexbox Fundamentals', 'Grid Layout Basics', 'Responsive Design', 'Practical Examples', 'Browser Support', 'Best Practices'],
  1200,
  4.7
),

-- PREMIUM COURSES
(
  'Advanced JavaScript Patterns',
  'Master advanced JavaScript concepts including closures, prototypes, async programming, and design patterns. This course covers complex topics that will take your JavaScript skills to the next level.',
  '12 hours',
  'Advanced',
  'JavaScript',
  'Dr. Michael Chen',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  true,
  29,
  ARRAY['Closures and Scope', 'Prototypes and Inheritance', 'Async Programming', 'Design Patterns', 'Performance Optimization', 'Testing Strategies'],
  890,
  4.9
),
(
  'Full-Stack Development with Node.js',
  'Build complete web applications using Node.js, Express, and MongoDB. Learn both frontend and backend development in this comprehensive course. Perfect for developers who want to become full-stack engineers.',
  '20 hours',
  'Intermediate',
  'Full-Stack Development',
  'Alex Rodriguez',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  true,
  49,
  ARRAY['Node.js Basics', 'Express Framework', 'Database Integration', 'Authentication', 'API Development', 'Deployment'],
  567,
  4.7
),
(
  'Machine Learning Fundamentals',
  'Learn the basics of machine learning including algorithms, data preprocessing, and model evaluation. This course covers both theoretical concepts and practical implementation using Python.',
  '15 hours',
  'Intermediate',
  'AI/ML',
  'Dr. Sarah Williams',
  'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
  true,
  39,
  ARRAY['Introduction to ML', 'Data Preprocessing', 'Supervised Learning', 'Unsupervised Learning', 'Model Evaluation', 'Practical Projects'],
  450,
  4.8
),
(
  'Advanced React Development',
  'Take your React skills to the next level with advanced concepts including hooks, context, performance optimization, and testing. This course covers real-world scenarios and best practices.',
  '18 hours',
  'Advanced',
  'React',
  'John Smith',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  true,
  44,
  ARRAY['Advanced Hooks', 'Context and State Management', 'Performance Optimization', 'Testing Strategies', 'Advanced Patterns', 'Real-world Projects'],
  320,
  4.9
),
(
  'UI/UX Design Masterclass',
  'Learn professional UI/UX design principles, user research, and design tools. This course covers the complete design process from research to prototyping and user testing.',
  '25 hours',
  'Intermediate',
  'Design',
  'Maria Garcia',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
  true,
  59,
  ARRAY['Design Principles', 'User Research', 'Wireframing', 'Prototyping', 'User Testing', 'Design Systems'],
  280,
  4.8
);
