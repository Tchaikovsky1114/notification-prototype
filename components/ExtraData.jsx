import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import RegisterInput from './RegisterInput';
import { useRecoilState } from 'recoil';
import { userInfoState } from '../recoil/userInfo';
import { ScrollView } from 'react-native-gesture-handler';
import useUserInfo from '../hooks/useUserInfo';
import { pushTokenState } from '../recoil/pushtoken';


const ExtraData = () => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const { fetchRegisterExtraUserData } = useUserInfo();
  const [pushToken,setPushToken] = useRecoilState(pushTokenState);
  const [inputValue, setInputValue] = useState({
    department: '',
    position: '',
    name: '',
    email: '',
    id: 0
  });
  
  const inputChangeHandler = (e, name) => {
    const {
      nativeEvent: { text },
    } = e;
    setInputValue((prev) => ({
      ...prev,
      [name]: text,
    }));
  };
  
  const registerUserHandler = async () => {
    for(let value in inputValue) {
      if(!value) return;
    }
    try {
      await fetchRegisterExtraUserData({...inputValue,pushToken});
      navigation.navigate('Home')
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (!userInfo) return;
    setInputValue((prev) => ({
      ...prev,
      name: userInfo.name,
      email: userInfo.email,
      id: userInfo.sub,
    }));
  }, [userInfo]);

  


  useEffect(() => {
    
  } ,[])
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {userInfo ? (
        <KeyboardAvoidingView style={{ flex: 1, padding: 24, position: 'relative' }}>
          <View>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
              추가정보 입력
            </Text>
          </View>
          {/* 인풋 그룹을 따로 떼어내어 위에 state,function을 가지고 로직 분리 */}
          <View style={{ marginVertical: 24 }}>
            <RegisterInput
              onChange={inputChangeHandler}
              value={inputValue.department}
              name="department"
              placeholder="부서명"
              title="부서"
            />
            <RegisterInput
              onChange={inputChangeHandler}
              value={inputValue.position}
              name="position"
              placeholder="직책명"
              title="직책"
            />
            <RegisterInput
              onChange={inputChangeHandler}
              value={inputValue.name}
              name="name"
              placeholder="성함"
              title="성함"
            />
            <RegisterInput
              onChange={inputChangeHandler}
              value={inputValue.email}
              name="email"
              placeholder="이메일"
              title="e-Mail"
            />
          </View>
          <TouchableOpacity
            onPress={registerUserHandler}
            activeOpacity={0.78}
            style={{
              width,
              position: 'absolute',
              bottom: 0,
              left:0,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#2d63e2',
              height: 52,
            }}
          >
        <Text style={{ fontSize: 22, color: '#fff' }}>가입 완료하기</Text>
      </TouchableOpacity>
        </KeyboardAvoidingView>
      ) : (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator size="large" />
        </View>
      )}

      {/* <Pressable
        style={{ width: 100, height: 100 }}
        onPress={() => navigation.navigate('SignIn')}
      >
        <Text style={{ fontSize: 24 }}>go signin</Text>
      </Pressable> */}
      
    </ScrollView>
  );
};

export default ExtraData;

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    backgroundColor: '#fff',
  },
});
