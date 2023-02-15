import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native'
// import * as MailComposer from 'expo-mail-composer';
import { AntDesign } from '@expo/vector-icons';
import moment from 'moment';
import { CheckBox } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';
import { Touchable } from 'react-native';

const DUMMY_EMAIL_DATA = [
  {
    sender: 'D&B Notifications',
    sendDate: moment(new Date()).fromNow(),
    title: 'Invitation to SSO from Dun & BradStreet',
    content: 'asdasdas',
  },
  {
    sender: '유병수',
    sendDate: moment(new Date()).fromNow(),
    title:'RE: 안녕하세요? 사용중인 결제 모듈에 대해 말씀드립니다',
    content: '.ㅂ.ㅂ.ㅈㅇㅂ...ㅂㅈㅇ.ㅂㅈ.ㄱ.ㅂㅈㅇ.ㅁ.ㄴ.ㅂㅈㅇ.',
  },
  {
    sender: 'APple Developer',
    sendDate: moment(new Date()).fromNow(),
    title:'Apple Duns Update',
    content: 'adakdldklqwdklqd',
  },
  {
    sender: '김명성',
    sendDate: moment(new Date()).fromNow(),
    title:'apk 파일',
    content: 'ㅂㅈㅇㅂㅈㅇㅂㅇ',
  }
]

const Mail = () => {
  const [status, setStatus] = useState();
  
  // const sendEmailHandler = async (file) => {
  //   let options = {};
  //   if(file.length < 0) {
  //     options = {
  //       subject: 'Sending email without attachment',
  //       recipients: ["forwarm5891@gmail.com"],
  //       body: "hello world"
  //     }
  //   }else {
  //     options = {
  //       subject: "Sending email with attatchment",
  //       recipients: ["forwarm5891@gmail.com"],
  //       body: "Heello woooorrllllllld",
  //       attachments: file
  //     }
  //     const result = await MailComposer.composeAsync(options);
  //    console.log(result); 
  //   }
  // }
  return (
    <ScrollView style={styles.container}>
      {/* <TouchableOpacity
      onPress={() => sendEmailHandler()}
      > */}
      {/* <Text>이메일 보내기</Text>
      </TouchableOpacity> */}
      {DUMMY_EMAIL_DATA.map((item) => (
        <View style={{flex:1,justifyContent:'space-between',alignItems:'center',paddingVertical:16,paddingHorizontal:8,borderWidth:1,borderColor:'#a7a7a7',marginVertical:4,marginHorizontal:24}}>
          <View style={{flex:1, flexDirection:'row'}}>
          <CheckBox />
          <TouchableOpacity style={{flex:8}}>
          <Text>{item.sender}</Text>
          <View style={{width:16,height:16}}/>
          <Text>{item.title}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flex:3,justifyContent:'center',alignItems:'flex-end'}}>
            <Text>{item.sendDate}</Text>
            <AntDesign name="flag" size={24} color="black" />
          </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  )
}

export default Mail

const styles = StyleSheet.create({
  container:{
    paddingTop:16,
    backgroundColor:'#fff'
  }
})