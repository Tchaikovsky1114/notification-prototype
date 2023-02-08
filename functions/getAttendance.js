const admin = require('firebase-admin');

module.exports = async function(req,res) {
  const { email } = req.body;

  const attendanceRef = admin.firestore().collection('Attendance').doc(`${email}`);

  const attendanceData = await attendanceRef.get();

  const attendance = attendanceData.data().attendance;
  if(!attendance) {
    return await res.json({message: "해당하는 근태 기록이 존재하지 않습니다",attendance: []})
  }
    return await res.json({attendance:attendance});
}