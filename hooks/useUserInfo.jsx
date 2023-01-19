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
  

  return { fetchUserInfo };
}

export default useUserInfo

