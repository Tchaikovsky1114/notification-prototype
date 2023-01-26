const admin = require('firebase-admin');

module.exports = async function (req,res) {
  const { id } = req.body;

  if(!id) return res.send({ error : '게시물을 찾을 수 없습니다.'});

  const noticeRef = admin.firestore().collection('Notice').doc(`${id}`);
  const noticeData = await noticeRef.get();
  const noticeRead = noticeData.data().read;
  await noticeRef.update({read : noticeRead + 1});

  
  // const
  // admin.firestore().collection('Notice')
}