import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import NotoText from './common/NotoText'
import { useNavigation } from '@react-navigation/native'

const RenderUserItem = ({item}) => {
  const navigation = useNavigation();

  const navigateChatRoomHandler = () => {
    navigation.navigate('ChatRoom',{userInfo:item})
  }
  
  return (
    <TouchableOpacity
    onPress={navigateChatRoomHandler}
    activeOpacity={0.5}
    style={{flex:1,padding:8,borderWidth:1,marginTop:16,borderWidth:1, borderColor:'#fff',marginTop:40}}
    >
    <View style={{borderBottomWidth:1, borderBottomColor:'#0cdae0'}}>
    <NotoText style={{color:'#0cdae0'}}>{item.department}</NotoText>
    </View>
    <View style={{marginTop:8}}>
      <NotoText style={{fontSize:20,color:'#fff'}}>{item.name}</NotoText>
      <NotoText style={{color:'#fff'}}>{item.email}</NotoText>
    </View>
  </TouchableOpacity>
  )
}

export default RenderUserItem

