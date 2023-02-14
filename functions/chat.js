const admin = require('firebase-admin');

module.exports = async function (req, res) {
  const { receiver, sender, message } = req.body;
  const FieldValue = admin.firestore.FieldValue;
  const senderRef = admin.firestore().collection('Chat').doc(`${sender}`);
  const receiverRef = admin.firestore().collection('Chat').doc(`${receiver}`);

  try {
    await senderRef.update(`${receiver}`, FieldValue.arrayUnion(message) )
    await receiverRef.update(`${sender}`, FieldValue.arrayUnion(message) )
    return res.send( { message: 'send message is success' } );

  } catch (error) {
    return res.send( { message: 'send message Error occured' } ); 
  }
}
