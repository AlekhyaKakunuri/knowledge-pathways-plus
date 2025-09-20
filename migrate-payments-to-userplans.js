// Migration script to convert existing payments to userPlans
// Run this in browser console after logging in as admin

const migratePaymentsToUserPlans = async () => {
  try {
    console.log('🔄 Starting migration of payments to userPlans...');
    
    // Get all verified payments
    const paymentsQuery = firebase.firestore()
      .collection('payments')
      .where('status', '==', 'verified');
    
    const paymentsSnapshot = await paymentsQuery.get();
    
    if (paymentsSnapshot.empty) {
      console.log('❌ No verified payments found to migrate');
      return;
    }
    
    console.log(`📊 Found ${paymentsSnapshot.docs.length} verified payments to migrate`);
    
    const batch = firebase.firestore().batch();
    const userPlansRef = firebase.firestore().collection('userPlans');
    
    paymentsSnapshot.forEach((doc) => {
      const payment = doc.data();
      
      // Create user plan document
      const userPlanRef = userPlansRef.doc();
      
      const now = new Date();
      let expiryDate = new Date();
      
      // Calculate expiry date based on plan name
      if (payment.planName.toLowerCase().includes('monthly')) {
        expiryDate.setMonth(expiryDate.getMonth() + 1);
      } else if (payment.planName.toLowerCase().includes('yearly') || payment.planName.toLowerCase().includes('year')) {
        expiryDate.setFullYear(expiryDate.getFullYear() + 1);
      } else {
        // Default to 1 year for other plans
        expiryDate.setFullYear(expiryDate.getFullYear() + 1);
      }
      
      const userPlanData = {
        userId: payment.userEmail, // Using email as userId for now
        planName: payment.planName,
        status: 'verified',
        startDate: payment.createdAt || now,
        expiryDate: expiryDate,
        paymentId: payment.transactionId || doc.id,
        amount: payment.amount,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      };
      
      batch.set(userPlanRef, userPlanData);
      
      console.log(`✅ Prepared migration for: ${payment.userEmail} - ${payment.planName}`);
    });
    
    // Commit the batch
    await batch.commit();
    
    console.log('🎉 Migration completed successfully!');
    console.log(`📊 Migrated ${paymentsSnapshot.docs.length} payments to userPlans`);
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
  }
};

// Run the migration
migratePaymentsToUserPlans();
