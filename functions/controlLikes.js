const admin = require('firebase-admin');

module.exports = async function(req,res) {
  const { id, email } = req.body;
  
  const docRef = admin.firestore().collection('Notice').doc(`${id}`);
  const docData = await docRef.get();
  const docLike = docData.data().like;
  const isInclude = docLike.findIndex((item) => item === email);

  if(isInclude >= 0){
    await docRef.update({
      like: admin.firestore.FieldValue.arrayRemove(email)
    })
    return res.send({message: '좋아요를 누른 명단에서 제거되었습니다.'})
  }else{
    await docRef.update({
      like: admin.firestore.FieldValue.arrayUnion(email)
    })
    return res.send({message: '좋아요를 누른 명단에 추가되었습니다.'})
  }
}