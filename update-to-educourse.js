const fs = require('fs');
const path = require('path');

// Configuration for eduCourse project
// Replace these with your actual eduCourse Firebase configuration
const educourseConfig = {
  apiKey: "YOUR_EDUCOURSE_API_KEY",
  authDomain: "eduCourse-XXXXX.firebaseapp.com", 
  projectId: "eduCourse-XXXXX",
  storageBucket: "eduCourse-XXXXX.firebasestorage.app",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

function updateFirebaseConfig() {
  
  const firebaseConfigPath = 'src/lib/firebase.ts';
  
  const newConfig = `import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration for eduCourse project
const firebaseConfig = {
  apiKey: "${educourseConfig.apiKey}",
  authDomain: "${educourseConfig.authDomain}",
  projectId: "${educourseConfig.projectId}",
  storageBucket: "${educourseConfig.storageBucket}",
  messagingSenderId: "${educourseConfig.messagingSenderId}",
  appId: "${educourseConfig.appId}",
  measurementId: "${educourseConfig.measurementId}"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;`;

  fs.writeFileSync(firebaseConfigPath, newConfig);
}

function updateFirebaseJson() {
  
  const firebaseJson = {
    "firestore": {
      "rules": "firestore.rules"
    },
    "hosting": {
      "public": "dist",
      "ignore": [
        "firebase.json",
        "**/.*",
        "**/node_modules/**"
      ],
      "rewrites": [
        {
          "source": "**",
          "destination": "/index.html"
        }
      ]
    }
  };
  
  fs.writeFileSync('firebase.json', JSON.stringify(firebaseJson, null, 2));
}

function updatePackageJson() {
  
  const packageJsonPath = 'package.json';
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  // Update project name and description
  packageJson.name = 'educourse-knowledge-pathways';
  packageJson.description = 'EduCourse - Knowledge Pathways Plus - Educational Platform';
  
  // Update deploy scripts
  packageJson.scripts.deploy = 'firebase deploy';
  packageJson.scripts['deploy:hosting'] = 'firebase deploy --only hosting';
  packageJson.scripts['deploy:firestore'] = 'firebase deploy --only firestore';
  
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
}

function createEnvironmentFile() {
  
  const envContent = `# EduCourse Project Environment Variables
VITE_API_BASE_URL=https://api.educourse.com
VITE_FIREBASE_PROJECT_ID=${educourseConfig.projectId}
VITE_FIREBASE_AUTH_DOMAIN=${educourseConfig.authDomain}
`;

  fs.writeFileSync('.env', envContent);
}

function main() {
  
  // Uncomment these lines after updating the educourseConfig
  // updateFirebaseConfig();
  // updateFirebaseJson();
  // updatePackageJson();
  // createEnvironmentFile();
  
}

main();



