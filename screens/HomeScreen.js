import { FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { userInfoState } from '../recoil/userInfo'

import useUserInfo from '../hooks/useUserInfo'
import RichTextEditor from '../components/RichTextEditor'

import { writeNoticeModalState } from '../recoil/writeNoticeModal'
import { firestore } from '../firebaseConfig'
import { collection, doc, onSnapshot, orderBy, query } from '@firebase/firestore'
import { Entypo } from '@expo/vector-icons';
import NoticeCard from '../components/NoticeCard'
import { ScrollView } from 'react-native'

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

    <ScrollView style={styles.container}>
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
      
    </ScrollView>
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={toggleWritePageHandler}
      style={{width:56,borderRadius:52,borderWidth:1,borderColor:'#120a57',justifyContent:'center',alignItems:'center',height:56,position:'absolute',bottom:10,right:10}}
      >
        <Entypo name="pencil" size={24} color="black" />
      </TouchableOpacity>
    </>
  )
}



export default HomeScreen

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#fff',
    minHeight:'100%'
  }
})