import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { userInfoState } from '../recoil/userInfo'

import useUserInfo from '../hooks/useUserInfo'
import RichTextEditor from '../components/RichTextEditor'

import { writeNoticeModalState } from '../recoil/writeNoticeModal'
import { firestore } from '../firebaseConfig'
import { collection, orderBy, query } from '@firebase/firestore'
import useNotice from '../hooks/useNotice'
import NoticeCard from '../components/NoticeCard'

const HomeScreen = () => {
  const { fetchVerifyingToken } = useUserInfo();
  const { getNotices,notices } = useNotice();
  const [isVerified,setIsVerified] = useState(false);
  const userInfo = useRecoilValue(userInfoState);
  const [isShowWriteNoticeModal,setIsShowWriteMoticeModal] = useRecoilState(writeNoticeModalState);

  const toggleWritePageHandler = () => {
    setIsShowWriteMoticeModal((prev) => !prev);
  }
  
  useEffect(() => {
    if(isVerified) return;
      fetchVerifyingToken();
      setIsVerified(true)  
  }, [])

  useEffect(() => {
    getNotices();
  },[])
  console.log(notices);
  return (
    <>
    <RichTextEditor />
    <View style={styles.container}>
      <FlatList
      keyExtractor={(item) => item.content}
      data={notices}
      extraData={notices}
      renderItem={({item}) => <NoticeCard title={item.title} content={item.content} />}
      />
      <Pressable
      onPress={toggleWritePageHandler}
      style={{width:'100%',justifyContent:'center',alignItems:'center',height:56}}
      >
        <Text style={{fontSize:24}}>공지 작성하기</Text>
      </Pressable>
    </View>
    </>
  )
}



export default HomeScreen

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#fff',
    flex:1,
  }
})