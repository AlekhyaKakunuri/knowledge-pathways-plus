import { collection, addDoc, serverTimestamp, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from './firebase';

export interface PaymentData {
  id: string;
  transactionId: string;
  planName: string;
  amount: string;
  userEmail: string;
  userName: string;
  status: string;
  createdAt: any;
}

// Check if payment already exists in user plans (by transactionId + amount)
export const checkPaymentExistsInUserPlans = async (transactionId: string, amount: string): Promise<boolean> => {
  try {
    console.log('Checking if payment exists in user plans:', transactionId, amount);
    const q = query(
      collection(db, 'userPlans'),
      where('paymentId', '==', transactionId),
      where('amount', '==', amount)
    );
    
    const querySnapshot = await getDocs(q);
    const exists = !querySnapshot.empty;
    console.log(`Payment ${transactionId} (${amount}) exists in user plans:`, exists);
    
    if (exists) {
      querySnapshot.forEach((doc) => {
        console.log('Found user plan:', doc.id, doc.data());
      });
    }
    
    return exists;
  } catch (error) {
    console.error('Error checking if payment exists:', error);
    return false;
  }
};

// Get all user plans to check which payments exist
export const getAllUserPlans = async () => {
  try {
    const q = query(
      collection(db, 'userPlans'),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const userPlans: any[] = [];
    
    querySnapshot.forEach((doc) => {
      userPlans.push({ id: doc.id, ...doc.data() });
    });
    
    console.log('All user plans:', userPlans);
    return userPlans;
  } catch (error) {
    console.error('Error getting all user plans:', error);
    return [];
  }
};

// Add a single payment to user plans
export const addPaymentToUserPlans = async (paymentData: PaymentData) => {
  try {
    // Check if payment already exists
    const exists = await checkPaymentExistsInUserPlans(paymentData.transactionId, paymentData.amount);
    if (exists) {
      return { success: false, error: 'Payment already exists in user plans' };
    }
    // Calculate expiry date based on plan
    const now = new Date();
    let expiryDate = new Date();
    
    // Check plan name for explicit period indicators
    if (paymentData.planName.toLowerCase().includes('monthly')) {
      expiryDate.setMonth(expiryDate.getMonth() + 1);
    } else if (paymentData.planName.toLowerCase().includes('yearly') || paymentData.planName.toLowerCase().includes('year')) {
      expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    } else if (paymentData.planName.toLowerCase().includes('premium')) {
      // For Premium plans, determine period based on amount
      const amount = parseInt(paymentData.amount);
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
    } else if (paymentData.planName.toLowerCase().includes('ai fundamentals')) {
      // AI Fundamentals course - 1 year access
      expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    } else {
      // Default to 1 year for other plans
      expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    }
    
    // Create user plan
    const userPlanData = {
      userId: paymentData.userEmail,
      planName: paymentData.planName,
      status: 'verified', // Always set to verified when adding to user plans
      startDate: now, // Set start date to now when adding to user plans
      expiryDate: expiryDate,
      paymentId: paymentData.transactionId,
      amount: paymentData.amount,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    console.log('Creating user plan with data:', userPlanData);
    const docRef = await addDoc(collection(db, 'userPlans'), userPlanData);
    console.log('User plan created with ID:', docRef.id);
    return { success: true, id: docRef.id };
    
  } catch (error) {
    console.error('Error creating user plan:', error);
    return { success: false, error: error };
  }
};
