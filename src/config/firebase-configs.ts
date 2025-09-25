// Firebase configurations for different projects
export const firebaseConfigs = {
  aicareerx: {
    apiKey: "AIzaSyDAbQUWG14WQARbIC1HH-JMOVk6l1fjip0",
    authDomain: "aicareerx-51133.firebaseapp.com",
    projectId: "aicareerx-51133",
    storageBucket: "aicareerx-51133.firebasestorage.app",
    messagingSenderId: "269079568198",
    appId: "1:269079568198:web:0e535ad4b672a07e880f47",
    measurementId: "G-HHRMJBRZSK"
  },
  educourse: {
    apiKey: "AIzaSyCggF07vzUudLQPRW4Ev1zH6WGl52LhKUU",
    authDomain: "educourse-6b0c9.firebaseapp.com",
    projectId: "educourse-6b0c9",
    storageBucket: "educourse-6b0c9.firebasestorage.app",
    messagingSenderId: "691040887316",
    appId: "1:691040887316:web:cf3d4835e557fcc7b6fd01",
    measurementId: "G-THWSM4R7QK"
  }
};

// Get current project from environment variable
const currentProject = import.meta.env.VITE_FIREBASE_PROJECT || 'aicareerx';

export const firebaseConfig = firebaseConfigs[currentProject as keyof typeof firebaseConfigs];



