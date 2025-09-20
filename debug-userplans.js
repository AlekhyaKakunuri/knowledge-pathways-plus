// Debug script to check what's actually in userPlans collection
// Run this in browser console

const debugUserPlans = async () => {
  try {
    console.log('🔍 Checking userPlans collection...');
    
    // Get all userPlans
    const userPlansQuery = firebase.firestore()
      .collection('userPlans')
      .orderBy('createdAt', 'desc');
    
    const userPlansSnapshot = await userPlansQuery.get();
    
    console.log(`📊 Found ${userPlansSnapshot.docs.length} user plans:`);
    
    userPlansSnapshot.forEach((doc, index) => {
      const data = doc.data();
      console.log(`${index + 1}. ID: ${doc.id}`);
      console.log(`   Payment ID: ${data.paymentId}`);
      console.log(`   Plan Name: ${data.planName}`);
      console.log(`   Status: ${data.status}`);
      console.log(`   User: ${data.userId}`);
      console.log(`   Amount: ${data.amount}`);
      console.log('---');
    });
    
    // Get all payments
    console.log('🔍 Checking payments collection...');
    const paymentsQuery = firebase.firestore()
      .collection('payments')
      .orderBy('createdAt', 'desc');
    
    const paymentsSnapshot = await paymentsQuery.get();
    
    console.log(`📊 Found ${paymentsSnapshot.docs.length} payments:`);
    
    paymentsSnapshot.forEach((doc, index) => {
      const data = doc.data();
      console.log(`${index + 1}. ID: ${doc.id}`);
      console.log(`   Transaction ID: ${data.transactionId}`);
      console.log(`   Plan Name: ${data.planName}`);
      console.log(`   Status: ${data.status}`);
      console.log(`   User: ${data.userEmail}`);
      console.log(`   Amount: ${data.amount}`);
      console.log('---');
    });
    
    // Check which payments exist in userPlans
    const userPlanPaymentIds = userPlansSnapshot.docs.map(doc => doc.data().paymentId);
    console.log('🔗 Payment IDs in userPlans:', userPlanPaymentIds);
    
    paymentsSnapshot.forEach((doc) => {
      const payment = doc.data();
      const exists = userPlanPaymentIds.includes(payment.transactionId);
      console.log(`Payment ${payment.transactionId} exists in userPlans: ${exists}`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
};

// Run the debug
debugUserPlans();
