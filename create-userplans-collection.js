// Script to create userPlans collection directly in Firebase
// Run this in browser console after logging in as admin

const createUserPlansCollection = async () => {
  try {
    console.log('🔄 Creating userPlans collection...');
    
    // Get the existing verified payment
    const paymentsQuery = firebase.firestore()
      .collection('payments')
      .where('status', '==', 'verified');
    
    const paymentsSnapshot = await paymentsQuery.get();
    
    if (paymentsSnapshot.empty) {
      console.log('❌ No verified payments found');
      return;
    }
    
    const payment = paymentsSnapshot.docs[0].data();
    console.log('📊 Found payment:', payment);
    
    // Create user plan document
    const now = new Date();
    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 1); // 1 year from now
    
    const userPlanData = {
      userId: payment.userEmail,
      planName: payment.planName,
      status: 'verified',
      startDate: payment.createdAt || now,
      expiryDate: expiryDate,
      paymentId: payment.transactionId || paymentsSnapshot.docs[0].id,
      amount: payment.amount,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    };
    
    // Add document to userPlans collection
    const docRef = await firebase.firestore().collection('userPlans').add(userPlanData);
    
    console.log('✅ User plan created successfully!');
    console.log('📄 Document ID:', docRef.id);
    console.log('📊 Data:', userPlanData);
    
    // Verify the collection was created
    const userPlansSnapshot = await firebase.firestore().collection('userPlans').get();
    console.log('📋 Total user plans:', userPlansSnapshot.size);
    
  } catch (error) {
    console.error('❌ Error creating userPlans collection:', error);
  }
};

// Run the script
createUserPlansCollection();
