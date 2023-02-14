const admin = require('firebase-admin');

module.exports = async function(req, res) {
  const userRef = await admin.firestore().collection('User').get();
  const userData = [];

  userRef.forEach(doc => {
    userData.push(doc.data());
  });
  
  return await res.json({ data:userData });
}