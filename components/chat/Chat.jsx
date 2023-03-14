import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useLayoutEffect } from 'react'
import useUserInfo from '../../hooks/useUserInfo'
import { FlatList } from 'react-native'
import RenderUserItem from '../RenderUserItem'
import { useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { userInfoState } from '../../recoil/userInfo'


const Chat = () => {
  
  const { getUsers,users } = useUserInfo();
  const [listExceptMe,setListExceptMe] = useState([]);
  const myInfo = useRecoilValue(userInfoState);
  
  useLayoutEffect(() => {
    getUsers();
  }, [])

  useEffect(() => {
    const exceptMe = users.filter((user) => user.email !== myInfo.email)
    setListExceptMe(exceptMe);
  },[users])

  
  return (
    <FlatList
    style={styles.container}
    data={listExceptMe}
    keyExtractor={item => item.email}
    renderItem={({item}) => <RenderUserItem item={item} />}
    ItemSeparatorComponent={() => <View style={{width:12,height:12}} />}
    />
  )
}


export default Chat

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#000',
    flex:1,
    paddingHorizontal:16,
  }
})