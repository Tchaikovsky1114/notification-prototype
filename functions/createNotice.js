const { firestore } = require('firebase-admin');
const admin = require('firebase-admin');


module.exports = async function(req, res) {
  const {position, title, content,writer,email,department,totalImages } = req.body;

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
    totalImages,
    createdAt:admin.firestore.FieldValue.serverTimestamp(),
    read: 0,
    like: [],
    reply:[]
    
  }).then((docRef) => {
    docRef.update({id:docRef.id});
  })
  await res.send({ message:'작성이 완료되었습니다.',status: 200 })

}