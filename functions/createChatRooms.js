const admin = require('firebase-admin');


module.exports = async function (req, res) {
  const { sender, receiver } = req.body;
  
  const senderRef = admin.firestore().collection('Chat').doc(`${sender}`);
  const receiverRef = admin.firestore().collection('Chat').doc(`${receiver}`);

  const senderData = await senderRef.get();
  const receiverData = await receiverRef.get();
  
  if(!senderData.exists || (senderData.exists && !senderData.data()[`${receiver}`])){
    await senderRef.set({[`${receiver}`]: []}, { merge: true });
  }
  if(!receiverRef.exists || (receiverData.exists && !receiverData.data()[`${sender}`])){
    await receiverRef.set({[`${sender}`]: []}, { merge: true });
  }
  
}