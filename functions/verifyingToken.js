const admin = require('firebase-admin');

module.exports = async function (req, res) {
  const { email, token } = req.body;
  const userRef = admin.firestore().collection('User').doc(`${email}`);
  const userDoc = await admin.firestore().collection('User').doc(`${email}`).get();
  
  if(userDoc.exists) {
    const userToken = await userDoc.data().pushToken;
    if (token === userToken) {
      return res.send({ message: '변경사항이 없습니다.' });
    } else {
      await userRef.update({ pushToken: token });
      return res.status(200).send({ message: '토큰이 변경되었습니다.' });
    }
  }
  return null;
};
