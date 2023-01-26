const admin = require('firebase-admin');

module.exports = async function (req,res) {
  const { id } = req.body;

  const noticeRef = admin.firestore().collection('Notice').doc(`${id}`);


  await noticeRef.update({
    reply: admin.firestore.FieldValue.arrayUnion({
      ...req.body,
      id:Math.floor(Math.random() * Date.now()).toString(16),
      createdAt: admin.firestore.Timestamp.now(),

    })
  })
  return await res.send({ message: '댓글을 성공적으로 등록하였습니다.' });
}