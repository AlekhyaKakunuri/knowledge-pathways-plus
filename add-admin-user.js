// Script to add first admin user to Firebase
// Run this in browser console after logging in

// Step 1: Get current user UID
const currentUser = firebase.auth().currentUser;
if (!currentUser) {
} else {
  // Step 2: Add to adminUsers collection
  firebase.firestore().collection('adminUsers').doc(currentUser.uid).set({
    email: currentUser.email,
    role: 'admin',
    addedAt: firebase.firestore.FieldValue.serverTimestamp()
  }).then(() => {

  }).catch((error) => {
    console.error('❌ Error adding admin user:', error);
  });
}
