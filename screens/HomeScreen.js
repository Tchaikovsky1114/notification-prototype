import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { userInfoState } from '../recoil/userInfo'
import { pushTokenState } from '../recoil/pushtoken'
import useUserInfo from '../hooks/useUserInfo'
import RichTextEditor from '../components/RichTextEditor'

const HomeScreen = () => {
  const { fetchVerifyingToken } = useUserInfo();
  const [isVerified,setIsVerified] = useState(false);
  const userInfo = useRecoilValue(userInfoState);

  
  useEffect(() => {
    if(isVerified) return;
      fetchVerifyingToken();
      setIsVerified(true)  
  }, [])
  
  return (
    <View style={styles.container}>
      <RichTextEditor />
    </View>
  )
}



export default HomeScreen

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#fff',
    flex:1,
  }
})