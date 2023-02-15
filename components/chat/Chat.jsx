import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLayoutEffect } from 'react'
import useUserInfo from '../../hooks/useUserInfo'
import { FlatList } from 'react-native'
import RenderUserItem from '../RenderUserItem'


const Chat = () => {
  
  const { getUsers,users } = useUserInfo();  
  useLayoutEffect(() => {
    getUsers();
  }, [])
  
  return (
    <FlatList
    style={styles.container}
    data={users}
    keyExtractor={item => item.email}
    renderItem={({item}) => <RenderUserItem item={item} />}
    ItemSeparatorComponent={() => <View style={{width:12,height:12}} />}
    />
  )
}

export default Chat

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#fff',
    flex:1,
    paddingHorizontal:16,
  }
})