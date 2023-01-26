import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { userInfoState } from '../recoil/userInfo'

import useUserInfo from '../hooks/useUserInfo'
import RichTextEditor from '../components/RichTextEditor'

import { writeNoticeModalState } from '../recoil/writeNoticeModal'
import { firestore } from '../firebaseConfig'
import { collection, doc, onSnapshot, orderBy, query } from '@firebase/firestore'
import useNotice from '../hooks/useNotice'
import NoticeCard from '../components/NoticeCard'

const HomeScreen = () => {
  const { fetchVerifyingToken } = useUserInfo();
  // const { getNotices,notices } = useNotice();
  const [notices,setNotices] = useState([]);
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

  // useEffect(() => {
  //   getNotices();
  // },[]);

  useEffect(() => {
    const unsubscription = onSnapshot(collection(firestore,'Notice'), (snapshot) => {
      const ntc = [];
      snapshot.forEach((doc) => {
        ntc.push(doc.data());
      })
      setNotices(ntc);
    })
    return () => unsubscription();
  }, [])
  return (
    <>
    <RichTextEditor />
    <View style={styles.container}>
      <FlatList
      keyExtractor={(item) => item.id}
      data={notices}
      extraData={notices}
      renderItem={({item}) => <NoticeCard 
      department={item.department}
      email={item.email}
      title={item.title}
      content={item.content}
      position={item.position}
      like={item.like}
      reply={item.reply}
      read={item.read}
      createdAt={item.createdAt}
      writer={item.writer}
      id={item.id}
      />}
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