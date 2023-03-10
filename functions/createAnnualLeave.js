const admin = require('firebase-admin');


module.exports = async function(req, res) {
  const { userEmail } = req.body
  const annualRef = admin.firestore().collection('Annual').doc(`${userEmail}`)

  await annualRef.set({
    ...req.body,
    id:annualRef.id,
  })

  const annual = await annualRef.get()
  return await res.json({ message: '연차가 성공적으로 등록되었습니다', data: annual.data() })
}
