import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration
// You need to get these values from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyCggF07vzUudLQPRW4Ev1zH6WGl52LhKUU", // Replace with your actual API key
  authDomain: "educourse-6b0c9.firebaseapp.com",
  projectId: "educourse-6b0c9",
  storageBucket: "educourse-6b0c9.firebasestorage.app",
  messagingSenderId: "691040887316", // Replace with your actual sender ID
  appId: "1:691040887316:web:cf3d4835e557fcc7b6fd01" // Replace with your actual app ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
