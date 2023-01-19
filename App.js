
import { Pressable, StyleSheet, Text, View } from 'react-native';
// import * as WebBrowser from 'expo-web-browser';
import { Button } from 'react-native';
import { getAuth, GoogleAuthProvider, signInWithCredential } from 'firebase/auth'
// WebBrowser.maybeCompleteAuthSession();

import { useEffect, useState } from 'react';



export default function App() {

  // const [request, response, promptAsync] = Google.useAuthRequest({
  //   webClientId: '478430295721-oiuh4coudrj98km8ie77clj4pfrntets.apps.googleusercontent.com',
  //   androidClientId: '478430295721-oiuh4coudrj98km8ie77clj4pfrntets.apps.googleusercontent.com',
  //   iosClientId: '478430295721-i2snov6f7d7dtj0p43h55lidfs4n8kuj.apps.googleusercontent.com'
  // })



  // useEffect(() => {
  //   if(response.type === 'success') {
  //     const { authentication } = response;
  //   }
  // }, [response]);

  return (
    <View>
      <Text>wqkqlr;kq;lrkq;lwkqw</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
