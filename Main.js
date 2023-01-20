import { Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignIn from './screens/SignIn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useUserInfo from './hooks/useUserInfo';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { navigate } from './rootNavigation';
import { userInfoState } from './recoil/userInfo';
import { useRecoilState } from 'recoil';
import HomeScreen from './screens/HomeScreen';


const Stack = createNativeStackNavigator();
let date = new Date();

const Main = () => {
  const [userInfo,setUserInfo] = useRecoilState(userInfoState);
  const { fetchUserInfo } = useUserInfo();
  const navigationRef = useRef(null);
  

  /**테스트용 localStorage Clear 함수 */
  // const test = async () => {
  //   await AsyncStorage.clear();
  // }
  // useLayoutEffect(() => {
  //   test();
  // },[])


  useLayoutEffect(() => {
    const getStoredToken = async () => {
      const token = await AsyncStorage.getItem('works_access_token');
      const expiresIn = await AsyncStorage.getItem('works_token_expires');
      if(!token) return;
      if(expiresIn < date.getTime()){
        
        await AsyncStorage.clear().then(() => {
          Alert.alert('토큰의 유효기간이 만료되었습니다','로그인 페이지로 이동합니다.');
          navigate('SignIn');
        })
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

  // 1. 회원가입을 했다면(firestore에 등록) SignIn으로 이동하지 않게끔 분기처리 해줘야 함.
  // 2.(userflow - 최초가입시) google auth 로그인 - 추가 정보 작성 - 파이어베이스 등록 - 홈화면
  // 3.(userflow - 이미가입시) google auth 로그인 - user collection에서 존재하는 이메일 확인 - 전역변수에 유저 정보 저장
  
  return (
    <NavigationContainer ref={navigationRef}>
       <Stack.Navigator>
        
        <Stack.Screen name="SignIn" component={SignIn} />
        
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator> 
    </NavigationContainer>
  )
}

export default Main

