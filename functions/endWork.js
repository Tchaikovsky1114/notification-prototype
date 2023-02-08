const admin = require('firebase-admin');


module.exports = async function(req,res) {
  const { leave,date,email } = req.body;

  const batch = admin.firestore().batch();

  const attendanceRef = admin.firestore().collection('Attendance').doc(`${email}`);
  
  const attendanceData = await attendanceRef.get();

  const attendanceRecord = attendanceData.data().attendance;

  const removeTarget = attendanceRecord.find((item) => item.date === date);

  // await attendanceRef.update({
  //   attendance: admin.firestore.FieldValue.arrayRemove(removeTarget),
  // })
  batch.update(
    attendanceRef,{ attendance: admin.firestore.FieldValue.arrayRemove(removeTarget) }
  )

  const obj = {
    ...removeTarget,
    "leave": leave,
  }
  
  // await attendanceRef.set({
  //   attendance: admin.firestore.FieldValue.arrayUnion(obj),
  // },{ merge: true })
  batch.set(
    attendanceRef, { attendance: admin.firestore.FieldValue.arrayUnion(obj) },{ merge: true }
  )


  await batch.commit();

  const newAttendance = await attendanceRef.get();
  const newAttendanceRecord = newAttendance.data().attendance;
  return await res.json({message: '퇴근시간이 저장되었습니다.',attendance:newAttendanceRecord});
}
