// Script to add sample blog data to Firebase
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, Timestamp } = require('firebase/firestore');

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAbQUWG14WQARbIC1HH-JMOVk6l1fjip0",
  authDomain: "aicareerx-51133.firebaseapp.com",
  projectId: "aicareerx-51133",
  storageBucket: "aicareerx-51133.firebasestorage.app",
  messagingSenderId: "269079568198",
  appId: "1:269079568198:web:0e535ad4b672a07e880f47",
  measurementId: "G-HHRMJBRZSK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const sampleBlogs = [
  {
    title: "Getting Started with React Development",
    content_html: `
      <h2>Introduction to React</h2>
      <p>React is a powerful JavaScript library for building user interfaces. In this comprehensive guide, we'll cover everything you need to know to get started with React development.</p>
      
      <h3>What is React?</h3>
      <p>React is a declarative, efficient, and flexible JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called "components".</p>
      
      <h3>Key Features</h3>
      <ul>
        <li>Component-based architecture</li>
        <li>Virtual DOM for better performance</li>
        <li>One-way data flow</li>
        <li>JSX syntax</li>
        <li>Hooks for state management</li>
      </ul>
      
      <h3>Setting Up Your First React App</h3>
      <p>To create a new React application, you can use Create React App:</p>
      <pre><code>npx create-react-app my-app
cd my-app
npm start</code></pre>
      
      <p>This will create a new React application with all the necessary dependencies and start the development server.</p>
    `,
    excerpt: "Learn the fundamentals of React development including components, state management, and hooks. This comprehensive guide will take you from beginner to intermediate level.",
    author: "Naveenkumar",
    published_at: Timestamp.fromDate(new Date('2024-01-15')),
    created_at: Timestamp.fromDate(new Date('2024-01-15')),
    updated_at: Timestamp.fromDate(new Date('2024-01-15')),
    access_type: "free",
    category: "Programming",
    status: "published",
    tags: ["React", "JavaScript", "Frontend"],
    labels: ["Most Popular", "Recent"],
    likes: 25,
    comments: 8,
    shares: 12,
    link: "/blog/react-getting-started",
    slug: "react-getting-started",
    thumbnail_url: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&h=300&fit=crop",
    generator: "manual",
    language: "en"
  },
  {
    title: "Advanced TypeScript Patterns",
    content_html: `
      <h2>Advanced TypeScript Patterns</h2>
      <p>Explore advanced TypeScript patterns and best practices for building scalable applications. Learn about generics, decorators, and advanced type manipulation.</p>
      
      <h3>Generics in TypeScript</h3>
      <p>Generics allow you to create reusable components that can work with multiple types. They provide a way to make components more flexible and type-safe.</p>
      
      <pre><code>function identity&lt;T&gt;(arg: T): T {
  return arg;
}

let output = identity&lt;string&gt;("myString");
let output2 = identity&lt;number&gt;(42);</code></pre>
      
      <h3>Decorators</h3>
      <p>Decorators provide a way to add both annotations and a meta-programming syntax for class declarations and members.</p>
      
      <h3>Advanced Type Manipulation</h3>
      <p>TypeScript provides powerful type manipulation utilities that allow you to create complex types from simpler ones.</p>
    `,
    excerpt: "Explore advanced TypeScript patterns and best practices for building scalable applications. Learn about generics, decorators, and advanced type manipulation.",
    author: "Naveenkumar",
    published_at: Timestamp.fromDate(new Date('2024-01-10')),
    created_at: Timestamp.fromDate(new Date('2024-01-10')),
    updated_at: Timestamp.fromDate(new Date('2024-01-10')),
    access_type: "premium",
    category: "Programming",
    status: "published",
    tags: ["TypeScript", "Advanced", "Programming"],
    labels: ["Most Popular"],
    likes: 18,
    comments: 5,
    shares: 8,
    link: "/blog/advanced-typescript-patterns",
    slug: "advanced-typescript-patterns",
    thumbnail_url: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=500&h=300&fit=crop",
    generator: "manual",
    language: "en"
  },
  {
    title: "Docker for Developers",
    content_html: `
      <h2>Docker for Developers</h2>
      <p>Learn how to containerize your applications with Docker. This guide covers everything from basic concepts to advanced deployment strategies.</p>
      
      <h3>What is Docker?</h3>
      <p>Docker is a platform that enables developers to package applications into containers—lightweight, portable, self-sufficient units that can run anywhere.</p>
      
      <h3>Key Benefits</h3>
      <ul>
        <li>Consistency across environments</li>
        <li>Easy deployment and scaling</li>
        <li>Resource efficiency</li>
        <li>Version control for applications</li>
      </ul>
      
      <h3>Basic Docker Commands</h3>
      <pre><code># Build an image
docker build -t my-app .

# Run a container
docker run -p 3000:3000 my-app

# List containers
docker ps

# Stop a container
docker stop container-id</code></pre>
    `,
    excerpt: "Learn how to containerize your applications with Docker. This guide covers everything from basic concepts to advanced deployment strategies.",
    author: "Naveenkumar",
    published_at: Timestamp.fromDate(new Date('2024-01-20')),
    created_at: Timestamp.fromDate(new Date('2024-01-20')),
    updated_at: Timestamp.fromDate(new Date('2024-01-20')),
    access_type: "free",
    category: "DevOps",
    status: "published",
    tags: ["Docker", "DevOps", "Containers"],
    labels: ["Recent"],
    likes: 12,
    comments: 3,
    shares: 5,
    link: "/blog/docker-for-developers",
    slug: "docker-for-developers",
    thumbnail_url: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=500&h=300&fit=crop",
    generator: "manual",
    language: "en"
  }
];

async function addSampleBlogs() {
  try {
    
    for (const blog of sampleBlogs) {
      const blogsRef = collection(db, 'blogs');
      const docRef = await addDoc(blogsRef, blog);
    }
    
  } catch (error) {
  }
}

// Run the script
addSampleBlogs();