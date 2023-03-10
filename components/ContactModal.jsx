import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import NotoText from './common/NotoText';
import { AntDesign, Feather, FontAwesome5 } from '@expo/vector-icons';
import Toast from 'react-native-root-toast';
import * as Contacts from 'expo-contacts';
import * as Linking from 'expo-linking';

const ContactModal = ({isContactModalShow,setIsContactModalShow,name,position,email}) => {
  
  const showToast = () => {
    let toast = Toast.show(`${name}님이 연락처에 등록되었습니다.`, {
      duration: Toast.durations.SHORT,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      shadowcolor:'#fff',
      delay: 0,
  });
    setTimeout(() => {
      Toast.hide(toast);
    },1500)
  }

  const addContactHandler = async() => {
    const { status } = await Contacts.requestPermissionsAsync();
  
    if(status == 'granted') {
      let newContact = {
        firstName: name.substr(1),
        lastName: name.substr(0,1),
        phoneNumbers: [{
          label: 'mobile',
          number: '010-1234-5678',
        }],
      };
      await Contacts.addContactAsync(newContact);
      showToast();
      setIsContactModalShow(false);
    }
  }
  

  const callPhoneHandler = () => {
    Linking.openURL(`tel://01022743334`);
  }
  const sendSmsHandler = () => {
    Linking.openURL(`sms://01022743334`);
  } 
  
  return (
    <Modal
    visible={isContactModalShow}
    transparent
    onRequestClose={() => setIsContactModalShow((prev) => !prev)}
    >
      <Pressable
      onPress={() => setIsContactModalShow(false)}
      style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'rgba(0,0,0,0.2)'}}>
      
      <TouchableWithoutFeedback>
      <View style={{backgroundColor:'#000',padding:24,borderRadius:4,justifyContent:'center',alignItems:'center'}}>
        <View style={{ paddingBottom:2,borderBottomWidth:1,marginBottom:16}}>
        <NotoText style={{fontSize:24,color:'#fff'}}>{name} {position}</NotoText>
        </View>
        
        <NotoText style={{fontSize:18,color:'#fff'}}>{email}</NotoText>
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:16}}>
        <TouchableOpacity style={{marginRight:48}}
          onPress={addContactHandler}
          activeOpacity={0.3}
          >
            <AntDesign name="contacts" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={{marginRight:48}}
          onPress={callPhoneHandler}
          activeOpacity={0.3}
          >
            <Feather name="phone-call" size={24} color="#0cdae0" />
          </TouchableOpacity>
          <TouchableOpacity
          onPress={sendSmsHandler}
          activeOpacity={0.3}
          >
            <FontAwesome5 name="sms" size={24} color="#b7c30b" />
          </TouchableOpacity>
        </View>
      </View>
      </TouchableWithoutFeedback>
      </Pressable>
    </Modal>
  )
}

export default ContactModal

const styles = StyleSheet.create({})