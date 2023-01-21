const admin = require('firebase-admin');

module.exports = async function(req, res) {
  const { position, department, name, email } = req.body;

  const emailValid = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  try {
  const userRef = admin.firestore().collection('User').doc(`${email}`);

  const snapshot = await  admin.firestore().collection('User').where('email', '==',true).get();

  snapshot.forEach((doc) => {
    if(doc.data().email === email){
      return res.send({ error: '중복된 이메일이 존재합니다.' });
    }
  })

  if(!req.body) {
    return res.status(422).send({ error: '유저 정보를 정확히 입력해주세요.' })
  }
  if(!position) {
    return res.status(422).send({ error: '직책을 정확히 입력해주세요.' })
  }
  if(!department) {
    return res.status(422).send({ error: '부서를 정확히 입력해주세요.' })
  }
  if(!name) {
    return res.status(422).send({ error:  '성함을 정확히 입력해주세요.' })
  }
  if(!emailValid.test(email)) {
    return res.status(422).send({ error: '이메일을 정확히 입력해주세요.' })
  }
  // .ref('Users/' + email).set(req.body.userInfo)

    await userRef.set(req.body);
    await res.json(req.body)  
  } catch (error) {
    res.status(500).send({ error: err })
  }
}
