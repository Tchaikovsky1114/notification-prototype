const admin = require('firebase-admin');


module.exports = async function (req,res) { 
  const noticesArray = [];
  const noticeRef = admin.firestore().collection('Notice');
  const notices =  await noticeRef.get();    
  
  notices.forEach((doc) => {
    noticesArray.push(doc.data());
  })
  
  return res.send(noticesArray); 

}