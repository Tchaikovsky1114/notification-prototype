import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native'
// import * as MailComposer from 'expo-mail-composer';
import { TouchableOpacity } from 'react-native';



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
    </ScrollView>
  )
}

export default Mail

const styles = StyleSheet.create({
  container:{
    
    backgroundColor:'#fff'
  }
})