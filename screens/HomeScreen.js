import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRecoilValue } from 'recoil'
import { userInfoState } from '../recoil/userInfo'
import NotoText from '../components/common/NotoText'
import { Image } from 'react-native'
import moment from 'moment'
import SignIn from './SignIn'
import { useWindowDimensions } from 'react-native'
import ExtraData from '../components/ExtraData'

const HomeScreen = () => {
  const userInfo = useRecoilValue(userInfoState);
  const {width, height} = useWindowDimensions();
  return (
    <View style={styles.container}>
      {!userInfo
      ? <SignIn />
      : (userInfo && userInfo.position)
      ? <View style={{flexDirection:'row',justifyContent:'space-around', alignItems:'center',marginTop:24,borderWidth:1, borderColor:'#2d63e2',marginHorizontal:width > 330 ? 24 : 16,borderRadius:8,backgroundColor:'#2d63e2e0',paddingHorizontal:8,paddingVertical:width > 330 ? 40 : 24}}>
      <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
          <Image style={{width:width > 330 ? 48 : 40,height: width > 330 ? 48 : 40, borderRadius:40}} source={{uri: 'https://gravatar.com/avatar/94d45dbdba988afacf30d916e7aaad69?s=200&d=mp&r=x'}} />
        <View style={{marginHorizontal:24}}>
          <NotoText style={{color:'#ccc',lineHeight:width > 330 ? 30 : 20,fontSize: width > 330 ? 20 : 14}}>(주) 성원애드피아</NotoText>
          <NotoText style={{color:'#fff',lineHeight:width > 330 ? 30: 20,fontSize: width > 330 ? 20 : 14}}>{userInfo.name} {userInfo.position}</NotoText>
        </View>
      </View>
      <View>
      <NotoText style={{color:'#fff',lineHeight: width > 330 ? 24 : 18,fontSize:width > 330 ? 18 : 12}}>{moment().format('yyyy년')}</NotoText>
      <NotoText style={{color:'#fff',lineHeight:width > 330 ? 24 : 18,fontSize:width > 330 ? 18 : 12}}>{moment().format('M월 DD일')}</NotoText>
      </View>
    </View>
    : <ExtraData />
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