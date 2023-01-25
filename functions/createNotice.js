const admin = require('firebase-admin');


module.exports = async function(req, res) {
  const { title, content,writer,email,department } = req.body;

  if(!title || !content) {
    return res.status(422).send({error: '제목 또는 내용을 입력해주세요.'});
  }

  const noticeRef = admin.firestore().collection('Notice');
  await noticeRef.add({
    writer,
    title,
    content,
    position,
    email,
    department,
    createdAt:admin.firestore.FieldValue.serverTimestamp(),
    read: 0,
    like: 0,
    reply:[]
  })
  await res.send({ message:'작성이 완료되었습니다.',status: 200 })

}