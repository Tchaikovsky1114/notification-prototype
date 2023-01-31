const admin = require('firebase-admin');

module.exports = async function(req,res) {
  const { email } = req.query;
  
  if(!email) throw new Error('사용자에 해당하는 연차 이력이 존재하지 않습니다.');
  try {
    const userAnnual =  await admin.firestore().collection('Annual').doc(`${email}`).get();
    return res.send(userAnnual.data());
  } catch (error) {
    throw new Error({error: error.message});
  }
  
}