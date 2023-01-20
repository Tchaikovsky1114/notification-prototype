import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRecoilValue } from 'recoil'
import { userInfoState } from '../recoil/userInfo'

const HomeScreen = () => {
  const userInfo = useRecoilValue(userInfoState);

  console.log(userInfo);
  return (
    <View style={styles.container}>
      <Text>{userInfo.name}</Text>
      <Text>{userInfo.email}</Text>
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