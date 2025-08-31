# 🔥 Get Your Firebase Configuration

## Step 1: Access Firebase Console
1. Go to: https://console.firebase.google.com/
2. Sign in with your Google account
3. You should see your project `educourse-6b0c9`

## Step 2: Get Configuration Values
1. **Click on your project** `educourse-6b0c9`
2. **Click the gear icon** ⚙️ (Project settings) in the left sidebar
3. **Scroll down** to "Your apps" section
4. **If you see a web app** (</> icon):
   - Click on it to see the config
5. **If you don't see a web app**:
   - Click "Add app" button
   - Select the web icon `</>`
   - Enter app nickname: `EduMentor Web`
   - Click "Register app"

## Step 3: Copy Configuration
You'll see something like this:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC-your-actual-key-here",
  authDomain: "educourse-6b0c9.firebaseapp.com",
  projectId: "educourse-6b0c9",
  storageBucket: "educourse-6b0c9.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};
```

## Step 4: Enable Authentication
1. **In Firebase Console**, click "Authentication" in left sidebar
2. **Click "Get started"** if you haven't set it up
3. **Go to "Sign-in method" tab**
4. **Click on "Email/Password"**
5. **Enable the first toggle** (Email/Password)
6. **Click "Save"**

## Step 5: Update Your Code
Replace the placeholder values in `src/lib/firebase.ts`:

```typescript
const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY_HERE",
  authDomain: "educourse-6b0c9.firebaseapp.com",
  projectId: "educourse-6b0c9",
  storageBucket: "educourse-6b0c9.appspot.com",
  messagingSenderId: "YOUR_ACTUAL_SENDER_ID",
  appId: "YOUR_ACTUAL_APP_ID"
};
```

## Step 6: Test
1. Save the file
2. Refresh your browser
3. Try signing in - the error should be gone!

## 🚨 Important Notes:
- **Keep your API key secure** - don't share it publicly
- **The authDomain, projectId, storageBucket** should already be correct
- **Only replace the apiKey, messagingSenderId, and appId** with your actual values

## 📞 Need Help?
If you can't access Firebase Console or need the actual values, let me know and I can help you get them!
