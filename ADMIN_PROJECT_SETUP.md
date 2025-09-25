# Admin Project Setup Guide

## 🎯 **aicareerx-admin Project Setup**

### **Option 1: Cross-Project Firestore Access (Recommended)**

This approach keeps admin data in the main `aicareerx-51133` project and creates a separate admin app that connects to it.

#### **Step 1: Create aicareerx-admin Project**

1. **Create new Firebase project:**
   - Go to: https://console.firebase.google.com/
   - Click "Add project"
   - Project name: `aicareerx-admin`
   - Project ID: `aicareerx-admin` (or similar)

2. **Enable Authentication:**
   - Go to Authentication > Sign-in method
   - Enable "Email/Password" provider
   - Add your admin email addresses

#### **Step 2: Configure Cross-Project Access**

1. **Get aicareerx-51133 Firestore config:**
   ```javascript
   // aicareerx-51133 project config
   const aicareerxConfig = {
     apiKey: "AIzaSyDAbQUWG14WQARbIC1HH-JMOVk6l1fjip0",
     authDomain: "aicareerx-51133.firebaseapp.com",
     projectId: "aicareerx-51133",
     storageBucket: "aicareerx-51133.firebasestorage.app",
     messagingSenderId: "269079568198",
     appId: "1:269079568198:web:0e535ad4b672a07e880f47"
   };
   ```

2. **Create admin app with cross-project access:**
   ```javascript
   // In aicareerx-admin project
   import { initializeApp } from 'firebase/app';
   import { getAuth } from 'firebase/auth';
   import { getFirestore } from 'firebase/firestore';

   // Use aicareerx-51133 config for data access
   const aicareerxApp = initializeApp(aicareerxConfig, 'aicareerx-data');
   export const aicareerxDb = getFirestore(aicareerxApp);

   // Use aicareerx-admin config for auth
   const adminApp = initializeApp(adminConfig, 'admin-auth');
   export const adminAuth = getAuth(adminApp);
   ```

#### **Step 3: Admin App Structure**

```
aicareerx-admin/
├── src/
│   ├── components/
│   │   ├── AdminDashboard.tsx
│   │   ├── PaymentAdmin.tsx
│   │   ├── UserPlansManagement.tsx
│   │   └── AdminStats.tsx
│   ├── pages/
│   │   ├── Login.tsx
│   │   └── Dashboard.tsx
│   ├── lib/
│   │   ├── firebase.ts
│   │   └── adminService.ts
│   └── App.tsx
```

#### **Step 4: Admin Authentication**

```javascript
// Admin login with aicareerx-admin project
const adminLogin = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(adminAuth, email, password);
  return userCredential.user;
};

// Check if user is admin in aicareerx-51133
const checkAdminStatus = async (email) => {
  const q = query(
    collection(aicareerxDb, 'adminUsers'),
    where('email', '==', email)
  );
  const snapshot = await getDocs(q);
  return !snapshot.empty;
};
```

### **Option 2: Copy Admin Data (Complete Isolation)**

If you prefer complete isolation:

1. **Copy collections from aicareerx-51133 to aicareerx-admin:**
   - `adminUsers`
   - `payments` 
   - `userPlans`
   - `courses`
   - `settings`
   - `blogs`

2. **Use Firebase Admin SDK for data migration:**
   ```javascript
   // Migration script
   const migrateData = async () => {
     const sourceDb = getFirestore(aicareerxApp);
     const targetDb = getFirestore(adminApp);
     
     // Copy each collection
     const collections = ['adminUsers', 'payments', 'userPlans'];
     for (const collectionName of collections) {
       const snapshot = await getDocs(collection(sourceDb, collectionName));
       const batch = writeBatch(targetDb);
       
       snapshot.forEach(doc => {
         batch.set(doc(targetDb, collectionName, doc.id), doc.data());
       });
       
       await batch.commit();
     }
   };
   ```

## 🚀 **Recommended Approach: Option 1**

**Benefits:**
- ✅ Single source of truth for data
- ✅ No data duplication
- ✅ Real-time sync between user app and admin app
- ✅ Easier maintenance

**Setup Steps:**
1. Create `aicareerx-admin` Firebase project
2. Enable Authentication
3. Create admin app with cross-project Firestore access
4. Deploy admin app to `aicareerx-admin` hosting

## 📋 **Next Steps**

1. **Create the admin project** (I can help with this)
2. **Set up the admin app structure**
3. **Configure cross-project access**
4. **Deploy admin app**

Would you like me to help you create the admin project structure?


