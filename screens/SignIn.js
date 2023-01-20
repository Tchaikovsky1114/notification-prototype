import { ActivityIndicator, Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { GoogleAuthProvider } from 'firebase/auth';
import getEnvVars from '../environment';
import { storeData } from '../util/storeLocalData';
import { useNavigation } from '@react-navigation/native';
import useUserInfo from '../hooks/useUserInfo';
import { useRecoilState } from 'recoil';
import { userInfoState } from '../recoil/userInfo';
import ExtraData from '../components/ExtraData';

const { FIREBASE_ANDROID_CLIENT_ID, FIREBASE_WEB_CLIENT_ID } = getEnvVars();
const provider = new GoogleAuthProvider();

WebBrowser.maybeCompleteAuthSession();

let date = new Date();

const SignIn = () => {
  const navigation = useNavigation();
  const { fetchUserInfo, fetchVerifyingEmail } = useUserInfo();
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [isLoading, setIsLoading] = useState(false);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: FIREBASE_ANDROID_CLIENT_ID,
    redirectUri: 'com.swadpia.notificationprototype:/oauth2redirect/google',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const {
        authentication: { accessToken, expiresIn },
      } = response;

      fetchUserInfo(accessToken)
        .then( (user) => {
          setIsLoading(true);
           fetchVerifyingEmail(user)
            .then((result) => {
            console.log('result', result);
            if(result.status === 200) {
              setIsLoading(false)
              setUserInfo(() => ({
                email: result.email,
                name: result.name
              })
              );
            }
            if(result.status === 201) {
              setIsLoading(false)
              setUserInfo(() => ({
                id: result.id,
                email: result.email,
                name: result.name,
                department: result.department,
                position: result.position,
                pushToken: result.pushToken
              }));
              navigation.navigate('Home');
            }
          })
        })
        .then(() => {
          storeData('works_access_token', accessToken);
          storeData('works_token_expires', expiresIn * 3000 + date.getTime());
        })
        .catch((err) => console.error(err));
    }
  }, [response]);
  


  return (
    <View style={styles.container}>
      {!userInfo ? (
        <>
        <Modal visible={isLoading} transparent={true} animationType="fade" >
            <View style={{flex:1,backgroundColor:'rgba(0,0,0,0.2)',flex:1,justifyContent:'center',alignItems:'center'}}>
              <ActivityIndicator animating={true} size="large" />
            </View>  
          </Modal>
        <View
          style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
        >
          <Pressable
            onPress={() => promptAsync()}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: 240,
              height: 50,
              borderWidth: 1,
              borderColor: '#3F7EE8',
              paddingHorizontal: 8,
              borderRadius: 8,
            }}
          >
            <Image
              style={{ width: 34, height: 34 }}
              source={{
                uri: 'data:image/png;base64,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',
              }}
            />
            <Text style={{ fontSize: 18, color: '#319F4F' }}>
              Sign-up with Google
            </Text>
          </Pressable>
        </View>
        </>
      ) : (
        <ExtraData />
      )}
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
