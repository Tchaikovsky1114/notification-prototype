const admin = require('firebase-admin');



module.exports = async function (req,res) { 
  const noticesArray = [];
  const noticeRef = admin.firestore().collection('Notice').orderBy('createdAt', 'desc');
  const notices =  await noticeRef.get();
  
  
  notices.forEach((doc) => {
    noticesArray.push(doc.data());
  })
  
  return await res.json(noticesArray); 

}