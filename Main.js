import { Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import SignIn from './screens/SignIn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useUserInfo from './hooks/useUserInfo';
import { useEffect, useRef } from 'react';
import { navigate } from './rootNavigation';
import { userInfoState } from './recoil/userInfo';
import { useRecoilState } from 'recoil';


const Stack = createNativeStackNavigator();
let date = new Date();

const Main = () => {
  const [userInfo,setUserInfo] = useRecoilState(userInfoState);
  const { fetchUserInfo } = useUserInfo();
  const navigationRef = useRef(null);



  useEffect(() => {
    const getStoredToken = async () => {
      const token = await AsyncStorage.getItem('works_access_token');
      const expiresIn = await AsyncStorage.getItem('works_token_expires');
      if(!token) return;
      if(expiresIn < date.getTime()){
        Alert.alert('토큰의 유효기간이 만료되었습니다','로그인페이지로 이동합니다.');
        await AsyncStorage.clear().then(() => {
          navigate('SignIn');
        });
      }else{
        fetchUserInfo(token)
        .then((user) => setUserInfo(user))
          .then(() => {
            navigate('Home');
          });
      }
    }
    getStoredToken();
  },[])

  return (
    <NavigationContainer ref={navigationRef}>
       <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SignIn" component={SignIn} />
      </Stack.Navigator> 
    </NavigationContainer>
  )
}

export default Main

