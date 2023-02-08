const admin = require('firebase-admin');


module.exports = async function(req,res) {
  const { entrance,date,email } = req.body;

  const attendanceRef = admin.firestore().collection('Attendance').doc(`${email}`);
  

  const obj = {
      date: date,
      "entrance": entrance,
      createdAt:admin.firestore.Timestamp.now()
  }
  

  await attendanceRef.set({
    attendance: admin.firestore.FieldValue.arrayUnion(obj),
  },{ merge:true })
  
  const attendance = await attendanceRef.get();
  const data = attendance.data()
  return await res.json({message: '출근시간이 저장되었습니다.',attendance: data});


}
