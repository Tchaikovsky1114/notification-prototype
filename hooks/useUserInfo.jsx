const useUserInfo = () => {

const fetchUserInfo = async (token) => {
  try {
    const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo',{
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    })
    const user = await response.json();
    return user;  
  } catch (error) {
    console.error(error);
  }
}
const fetchRegisterExtraUserData = async (userInfo) => {
  try {
    const response = await fetch('https://asia-northeast3-notification-aa618.cloudfunctions.net/registerUser',{
      method:'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInfo),
    })
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
const fetchVerifyingEmail = async (user) => {
  try{
    const response = await fetch('https://asia-northeast3-notification-aa618.cloudfunctions.net/verifyingEmail',{
      method:'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user),
    })
    const data = await response.json();
    console.log('verifying',data);
    return data;
  }catch(error){
    console.error(error);
  }
}
  

  return { fetchUserInfo, fetchVerifyingEmail,fetchRegisterExtraUserData };
}

export default useUserInfo

