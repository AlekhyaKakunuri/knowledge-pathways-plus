# How to View Payment Details in Firebase Console

## Step 1: Access Firebase Console
1. Go to [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Select your project: `educourse-6b0c9`

## Step 2: Navigate to Firestore Database
1. In the left sidebar, click on **"Firestore Database"**
2. If you haven't set up Firestore yet, click **"Create database"**
3. Choose **"Start in test mode"** (for now)
4. Select a location (choose closest to your users)

## Step 3: View Payment Data
1. You'll see a collection called **"payments"**
2. Click on **"payments"** to see all payment records
3. Each document represents one payment submission

## Step 4: Payment Data Structure
Each payment document contains:
```json
{
  "transactionId": "TXN123456789",
  "planName": "AI Fundamentals",
  "amount": "449",
  "userEmail": "user@example.com",
  "userName": "User Name",
  "paymentScreenshot": "screenshot_description_or_url",
  "status": "pending",
  "createdAt": "2025-01-27T10:30:00Z"
}
```

## Step 5: Real-time Updates
- The admin dashboard shows **real-time updates**
- When a user submits a payment, it appears immediately
- No need to refresh the page

## Step 6: Test the Flow
1. **Submit a test payment** through your UPI Payment modal
2. **Check Firebase Console** - you should see the new payment record
3. **Check Admin Dashboard** - you should see the payment in real-time

## Step 7: Admin Actions (Future)
- **Verify Payment**: Change status from "pending" to "verified"
- **Reject Payment**: Change status from "pending" to "rejected"
- **Add Notes**: Add admin notes for verification

## Troubleshooting
- If you don't see data, check browser console for errors
- Make sure Firebase project ID is correct in `src/lib/firebase.ts`
- Ensure Firestore rules allow read/write access
