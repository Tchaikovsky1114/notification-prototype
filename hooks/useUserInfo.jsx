import { useRecoilValue } from "recoil";
import { pushTokenState } from "../recoil/pushtoken";
import { userInfoState } from "../recoil/userInfo";

const useUserInfo = () => {
  const userInfomation = useRecoilValue(userInfoState);
  const pushToken = useRecoilValue(pushTokenState);

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
    console.log(data);
    return data;
  } catch (error) {
    console.error(error.error);
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

const fetchVerifyingToken = async() => {
  try {
    const response = await fetch('https://asia-northeast3-notification-aa618.cloudfunctions.net/verifyingToken',{
      method:'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email:userInfomation.email,token:pushToken})
    });
    const data = await response.json();
    console.log('==VerifyingtokenResult==',data.message);
    return data;
  } catch (error) {
    console.error(error);
  }
}
  

  return { fetchUserInfo, fetchVerifyingEmail, fetchRegisterExtraUserData, fetchVerifyingToken };
}

export default useUserInfo

