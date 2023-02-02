const admin = require('firebase-admin');

module.exports = async function(req, res) { 
  const { email } = req.body;
  const annualLeaveDocRef = admin.firestore().collection('Annual').doc(`${email}`);

  // 사용한 연차: usedLeave 
  // 남은 연차: remainingLeave
  // 연차,월차는 고정값이니 수정 X (스케쥴링에 의해 수정됨.)
  // usedLeave는 
  // 남은 연차는 remainingLeave - usedLeave 해서 다시 갱신

  await annualLeaveDocRef.set({},{ merge: true })
}