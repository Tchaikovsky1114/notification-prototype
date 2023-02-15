import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRecoilValue } from 'recoil'
import { userInfoState } from '../recoil/userInfo'
import NotoText from '../components/common/NotoText'
import { Image } from 'react-native'
import moment from 'moment'

import { useNavigation } from '@react-navigation/native'
import SignIn from './SignIn'

const HomeScreen = () => {
  const userInfo = useRecoilValue(userInfoState);

  return (
    <View style={styles.container}>
      {userInfo
      ?<View style={{flexDirection:'row',justifyContent:'space-around', alignItems:'center',marginTop:24,borderWidth:1, borderColor:'#2d63e2',marginHorizontal:24,borderRadius:8,backgroundColor:'#2d63e2e0',paddingHorizontal:8,paddingVertical:40}}>
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
            <Image style={{width:48,height:48,borderRadius:48}} source={{uri: 'https://gravatar.com/avatar/94d45dbdba988afacf30d916e7aaad69?s=200&d=mp&r=x'}} />
          <View style={{marginHorizontal:24}}>
            <NotoText style={{color:'#ccc',lineHeight:30,fontSize:20}}>(주) 성원애드피아</NotoText>
            <NotoText style={{color:'#fff',lineHeight:30,fontSize:20}}>{userInfo.name} {userInfo.position}</NotoText>
          </View>
          
        </View>
        <View>
        <NotoText style={{color:'#fff',lineHeight:24,fontSize:18}}>{moment().format('yyyy년')}</NotoText>
        <NotoText style={{color:'#fff',lineHeight:24,fontSize:18}}>{moment().format('M월 DD일')}</NotoText>
        </View>
      </View>
      : <SignIn />
      }
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#fff'
  }
})