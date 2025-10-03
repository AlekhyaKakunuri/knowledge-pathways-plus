import { collection, addDoc, serverTimestamp, doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

export interface PaymentData {
  payment_id: string;
  user_id: string;
  user_email: string;
  plan_name: string;
  amount: number;
  payment_method: string;
  status: 'pending' | 'verified' | 'rejected';
  created_at: any; // Firestore timestamp
  updated_at: any; // Firestore timestamp
  utr_number: string;
  payment_screenshot_url: string;
  remarks: string;
  verified_at?: any; // Firestore timestamp
  verified_by: string;
}

export const savePaymentDetails = async (paymentData: {
  planName: string;
  amount: number;
  userEmail: string;
  userName: string;
  userId: string; // Firebase localId
  transactionId: string;
  paymentScreenshot?: string;
}) => {
  try {
    // Generate a unique payment ID
    const paymentId = `pay_${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    const cleanData = {
      payment_id: paymentId,
      user_id: paymentData.userId, // Using Firebase localId
      user_email: paymentData.userEmail,
      plan_name: paymentData.planName,
      amount: paymentData.amount,
      payment_method: 'UPI',
      status: 'pending',
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      utr_number: paymentData.transactionId,
      payment_screenshot_url: paymentData.paymentScreenshot || '',
      remarks: `Payment submitted by ${paymentData.userEmail}`,
      verified_at: null,
      verified_by: ''
    };

    const docRef = await addDoc(collection(db, 'payments'), cleanData);
    
    return { success: true, id: docRef.id };
  } catch (error) {
    return { success: false, error: error };
  }
};

export const updatePaymentStatus = async (paymentId: string, status: 'verified' | 'rejected', verifiedBy: string, remarks?: string) => {
  try {
    const paymentRef = doc(db, 'payments', paymentId);
    
    const updateData: any = {
      status: status,
      updated_at: serverTimestamp(),
      verified_at: serverTimestamp(),
      verified_by: verifiedBy,
    };
    
    if (remarks) {
      updateData.remarks = remarks;
    }
    
    await updateDoc(paymentRef, updateData);
    
    // If payment is verified, also create a user plan
    if (status === 'verified') {
      await createUserPlanFromPayment(paymentId);
    }
    
    return { success: true };
  } catch (error) {
    return { success: false, error: error };
  }
};

// Create user plan when payment is verified
const createUserPlanFromPayment = async (paymentId: string) => {
  try {
    // Get the payment details
    const paymentRef = doc(db, 'payments', paymentId);
    const paymentDoc = await getDoc(paymentRef);
    
    if (!paymentDoc.exists()) {
      return;
    }
    
    const paymentData = paymentDoc.data();
    
    // Calculate expiry date based on plan
    const now = new Date();
    let expiryDate = new Date();
    
    // Check plan name to determine expiry
    const planName = paymentData.plan_name || '';
    
    if (planName === 'PREMIUM_MONTHLY') {
      // Monthly Premium plan - 1 month access
      expiryDate.setMonth(expiryDate.getMonth() + 1);
    } else if (planName === 'PREMIUM_YEARLY') {
      // Yearly Premium plan - 1 year access
      expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    } else if (planName === 'PREMIUM_GENAI_DEV_01') {
      // GenAI Developer Course - lifetime access (set to 10 years)
      expiryDate.setFullYear(expiryDate.getFullYear() + 10);
    } else if (planName === 'FREE') {
      // Free plan - 1 year access
      expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    } else {
      // Fallback to plan name for explicit period indicators
      if (planName.toLowerCase().includes('monthly')) {
        expiryDate.setMonth(expiryDate.getMonth() + 1);
      } else if (planName.toLowerCase().includes('yearly') || planName.toLowerCase().includes('year')) {
        expiryDate.setFullYear(expiryDate.getFullYear() + 1);
      } else if (planName.toLowerCase().includes('premium')) {
        // For Premium plans, determine period based on amount
        const amount = paymentData.amount;
        if (amount === 449) {
          // Monthly Premium plan
          expiryDate.setMonth(expiryDate.getMonth() + 1);
        } else if (amount === 4308) {
          // Yearly Premium plan
          expiryDate.setFullYear(expiryDate.getFullYear() + 1);
        } else {
          // Default to 1 year for other Premium amounts
          expiryDate.setFullYear(expiryDate.getFullYear() + 1);
        }
      } else if (planName.toLowerCase().includes('ai fundamentals')) {
        // AI Fundamentals course - 1 year access
        expiryDate.setFullYear(expiryDate.getFullYear() + 1);
      } else {
        // Default to 1 year for other plans
        expiryDate.setFullYear(expiryDate.getFullYear() + 1);
      }
    }
    
    // Create user plan
    const userPlanData = {
      userId: paymentData.user_email || '',
      planName: paymentData.plan_name,
      status: 'verified',
      startDate: now,
      expiryDate: expiryDate,
      paymentId: paymentData.payment_id || paymentId,
      amount: paymentData.amount,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    const userPlanRef = await addDoc(collection(db, 'userPlans'), userPlanData);
    
  } catch (error) {
  }
};

// Create course enrollment payment
export const createCourseEnrollmentPayment = async (courseData: {
  courseId: string;
  courseTitle: string;
  planName: string;
  amount: number;
  userEmail: string;
  userName: string;
  userId: string; // Firebase localId
  transactionId?: string;
  utrNumber?: string;
  paymentScreenshot?: string;
}) => {
  try {
    // Generate a unique payment ID
    const paymentId = `pay_${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    const paymentData = {
      payment_id: paymentId,
      user_id: courseData.userId, // Using Firebase localId
      user_email: courseData.userEmail,
      plan_name: courseData.planName,
      amount: courseData.amount,
      payment_method: 'UPI',
      status: 'pending',
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      utr_number: courseData.utrNumber || courseData.transactionId || '', // Use UTR number or transaction ID
      payment_screenshot_url: courseData.paymentScreenshot || '', // Will be filled when user submits payment
      remarks: `Course enrollment payment submitted by ${courseData.userEmail}`, // Will be filled by admin
      verified_at: null,
      verified_by: ''
    };

    const docRef = await addDoc(collection(db, 'payments'), paymentData);
    
    return { success: true, paymentId: docRef.id, paymentData };
  } catch (error) {
    return { success: false, error: error };
  }
};
