import { collection, addDoc, getDocs, query, where, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

// Migrate existing verified payments to userPlans collection
export const migrateExistingPayments = async () => {
  try {
    // Get all payments (verified and pending)
    const paymentsQuery = query(
      collection(db, 'payments')
    );
    
    const paymentsSnapshot = await getDocs(paymentsQuery);
    
    if (paymentsSnapshot.empty) {
      console.log('No payments found to migrate');
      return { success: true, migrated: 0 };
    }
    
    console.log(`Found ${paymentsSnapshot.docs.length} payments to migrate`);
    let migratedCount = 0;
    
    for (const paymentDoc of paymentsSnapshot.docs) {
      const paymentData = paymentDoc.data();
      console.log('Processing payment:', paymentData);
      
      // Check if user plan already exists for this payment
      const existingUserPlansQuery = query(
        collection(db, 'userPlans'),
        where('paymentId', '==', paymentData.transactionId || paymentDoc.id)
      );
      
      const existingUserPlans = await getDocs(existingUserPlansQuery);
      
      if (!existingUserPlans.empty) {
        console.log(`User plan already exists for payment ${paymentData.transactionId}`);
        continue;
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
        userId: paymentData.userEmail || '',
        planName: paymentData.planName,
        status: paymentData.status || 'pending', // Use actual payment status
        startDate: paymentData.createdAt || now,
        expiryDate: expiryDate,
        paymentId: paymentData.transactionId || paymentDoc.id,
        amount: paymentData.amount,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      
      console.log('Creating user plan with data:', userPlanData);
      await addDoc(collection(db, 'userPlans'), userPlanData);
      migratedCount++;
      console.log(`Successfully migrated payment ${paymentData.transactionId}`);
    }
    
    console.log(`Migration completed! Migrated ${migratedCount} payments to userPlans`);
    return { success: true, migrated: migratedCount };
    
  } catch (error) {
    console.error('Migration failed:', error);
    return { success: false, error: error };
  }
};
