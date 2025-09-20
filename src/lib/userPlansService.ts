import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  query, 
  where, 
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './firebase';

export interface UserPlan {
  id: string;
  userId: string;
  planName: string;
  status: 'pending' | 'verified' | 'expired' | 'cancelled';
  startDate: any; // Firestore timestamp
  expiryDate: any; // Firestore timestamp
  paymentId: string;
  amount: string;
  createdAt: any; // Firestore timestamp
  updatedAt: any; // Firestore timestamp
}

export interface CreateUserPlanData {
  userId: string;
  planName: string;
  status: 'pending' | 'verified' | 'expired' | 'cancelled';
  paymentId: string;
  amount: string;
  startDate?: any;
  expiryDate?: any;
}

// Get all user plans
export const getUserPlans = async (): Promise<UserPlan[]> => {
  try {
    const q = query(
      collection(db, 'userPlans'),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const userPlans: UserPlan[] = [];
    
    querySnapshot.forEach((doc) => {
      userPlans.push({ id: doc.id, ...doc.data() } as UserPlan);
    });
    
    return userPlans;
  } catch (error) {
    throw error;
  }
};

// Create a new user plan
export const createUserPlan = async (data: CreateUserPlanData): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, 'userPlans'), {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

// Verify payment and set start/expiry dates
export const verifyPayment = async (planId: string, planName: string, amount?: string): Promise<void> => {
  try {
    const planRef = doc(db, 'userPlans', planId);
    const now = new Date();
    
    // Calculate expiry date based on plan
    let expiryDate = new Date();
    
    // Check plan name for explicit period indicators
    if (planName.toLowerCase().includes('monthly')) {
      expiryDate.setMonth(expiryDate.getMonth() + 1);
    } else if (planName.toLowerCase().includes('yearly') || planName.toLowerCase().includes('year')) {
      expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    } else if (planName.toLowerCase().includes('premium')) {
      // For Premium plans, determine period based on amount
      const planAmount = amount ? parseInt(amount) : 0;
      if (planAmount === 449) {
        // Monthly Premium plan
        expiryDate.setMonth(expiryDate.getMonth() + 1);
      } else if (planAmount === 4308) {
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
    
    await updateDoc(planRef, {
      status: 'verified',
      startDate: now,
      expiryDate: expiryDate,
      updatedAt: serverTimestamp()
    });
    
  } catch (error) {
    throw error;
  }
};

// Extend or change plan
export const updatePlan = async (
  planId: string, 
  updates: {
    planName?: string;
    expiryDate?: Date;
  }
): Promise<void> => {
  try {
    const planRef = doc(db, 'userPlans', planId);
    
    await updateDoc(planRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });
    
  } catch (error) {
    throw error;
  }
};

// Get plan duration in days
export const getPlanDuration = (planName: string): number => {
  if (planName.toLowerCase().includes('monthly')) {
    return 30;
  } else if (planName.toLowerCase().includes('yearly') || planName.toLowerCase().includes('year')) {
    return 365;
  } else {
    return 365; // Default to 1 year
  }
};

// Check if plan is expired
export const isPlanExpired = (expiryDate: any): boolean => {
  if (!expiryDate) return false;
  
  const expiry = expiryDate.toDate ? expiryDate.toDate() : new Date(expiryDate);
  const now = new Date();
  
  return expiry < now;
};
