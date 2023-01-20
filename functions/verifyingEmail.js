const admin = require('firebase-admin');

module.exports = async function (req, res) {
  const { email } = req.body;
  const userRef = admin.firestore().collection('User').doc(`${email}`);

  const existUser = await userRef.get();

  if (!existUser.exists) {
    await res.json({
        email: req.body.email,
        name: req.body.name,
        status:200,
        message: '첫 로그인 유저입니다. 추가정보작성 페이지로 이동합니다.'
    });
    
  }else{
    await res.json({
      ...existUser.data(),
      status: 201,
      message: '가입된 이력이 존재합니다. 로그인 페이지로 이동합니다.',
      
    });
  }
   
};
