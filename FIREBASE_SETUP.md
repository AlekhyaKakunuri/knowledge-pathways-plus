# Firebase Authentication Setup Guide

## Step 1: Firebase Console Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your existing project `educourse-6b0c9` (or create a new one)
3. Click on "Authentication" in the left sidebar
4. Click on "Get started" if you haven't set up authentication yet
5. Go to the "Sign-in method" tab
6. Enable "Email/Password" authentication method

## Step 2: Get Firebase Configuration

1. In Firebase Console, click on the gear icon (Project settings)
2. Scroll down to "Your apps" section
3. If you don't have a web app, click "Add app" and select the web icon (</>)
4. Register your app with a name (e.g., "EduMentor Web")
5. Copy the Firebase configuration object

## Step 3: Update Firebase Configuration

Replace the placeholder values in `src/lib/firebase.ts` with your actual Firebase configuration:

```typescript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "educourse-6b0c9.firebaseapp.com",
  projectId: "educourse-6b0c9",
  storageBucket: "educourse-6b0c9.appspot.com",
  messagingSenderId: "your-actual-messaging-sender-id",
  appId: "your-actual-app-id"
};
```

## Step 4: Test Authentication

1. Run `npm run dev` to start the development server
2. Navigate to `/signup` to create a new account
3. Navigate to `/signin` to sign in with existing credentials
4. Check that the header shows the user's name/email when signed in
5. Test the logout functionality

## Features Implemented

✅ **Email/Password Authentication**
- User registration with display name
- User sign-in with email/password
- Password reset functionality
- Form validation and error handling

✅ **Authentication State Management**
- Global authentication context
- Persistent authentication state
- Loading states during auth operations

✅ **UI Integration**
- Updated SignIn and SignUp pages
- Header shows user info when authenticated
- User dropdown with logout option
- Toast notifications for auth actions

✅ **Route Protection**
- ProtectedRoute component created (ready to use)
- Automatic redirect to sign-in for protected pages

## Usage Examples

### Protecting a Route
```typescript
import ProtectedRoute from '@/components/ProtectedRoute';

// In your App.tsx or router
<Route path="/dashboard" element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
} />
```

### Using Authentication in Components
```typescript
import { useAuth } from '@/contexts/AuthContext';

const MyComponent = () => {
  const { currentUser, logout } = useAuth();
  
  if (currentUser) {
    return <div>Welcome, {currentUser.displayName}!</div>;
  }
  
  return <div>Please sign in</div>;
};
```

## Security Notes

- Firebase handles password hashing and security automatically
- Email verification can be enabled in Firebase Console
- Consider enabling multi-factor authentication for enhanced security
- Set up Firebase Security Rules for your database when you add one

## Next Steps

1. Update the Firebase configuration with your actual values
2. Test the authentication flow
3. Add protected routes as needed
4. Consider adding email verification
5. Set up user profiles/additional user data storage
