import {Modal,Pressable,Text,TouchableOpacity,TouchableWithoutFeedback,View} from 'react-native';
import React from 'react';
import useSeparateTime from '../hooks/useSeparateTime';
import * as Contacts from 'expo-contacts';
import { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import Toast from 'react-native-root-toast';





const ReplyCard = ({createdAt,department,email,id,name,position,reply}) => {
  const { createdTime } = useSeparateTime(createdAt);
  const [isContactModalShow,setIsContactModalShow] = useState(false);
  
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
      const contact = await Contacts.addContactAsync(newContact);

      showToast();
      setIsContactModalShow(false);
    }
  }
  const showToast = () => {
    let toast = Toast.show(`${name}님이 연락처에 등록되었습니다.`, {
      duration: Toast.durations.SHORT,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      shadowColor:'#000',
      delay: 0,
  });
    setTimeout(() => {
      Toast.hide(toast);
    },1500)
  }
    
  
  const popUpContactModalHandler = () => {
    setIsContactModalShow(true);
  }
  const callPhoneHandler = () => {
    Linking.openURL(`tel://01022743334`);
  }
  const sendSmsHandler = () => {
    Linking.openURL(`sms://01022743334`);
  } 

  return (
    <>
    <Modal
    visible={isContactModalShow}
    transparent
    onRequestClose={() => setIsContactModalShow((prev) => !prev)}
    >
      <Pressable
      onPress={() => setIsContactModalShow(false)}
      style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'rgba(0,0,0,0.2)'}}>
      
      <TouchableWithoutFeedback>
      <View style={{backgroundColor:'#fff',padding:24,borderRadius:4,justifyContent:'center',alignItems:'center'}}>
        <View style={{ paddingBottom:2,borderBottomWidth:1,marginBottom:16}}>
        <Text style={{fontSize:24}}>{name} {position}</Text>
        </View>
        
        <Text style={{fontSize:18}}>{email}</Text>
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
            <Feather name="phone-call" size={24} color="#2d63e2" />
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

    
    <View style={{borderWidth: 1, borderColor: '#dde', borderRadius: 4}}>
      <View style={{flexDirection: 'row'}}>
        <View style={{ backgroundColor: '#f6f9ff',width:'70%',padding:16, position:'relative'}}>
          <Text>{reply}</Text>
          <View style={{position:'absolute', bottom:4,right:4}}>
          <Text style={{fontSize:10,color:'#ccc'}}>{createdTime.year}-{createdTime.month}-{createdTime.day} {createdTime.hours}:{createdTime.minutes}</Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={popUpContactModalHandler}
          activeOpacity={0.3}
          style={{
            borderLeftWidth: 1,
            borderLeftColor: '#ddd',
            padding:16,
            justifyContent:'center',
            alignItems:'center'
          }}
        >
          <Text>
            {name} {position}
          </Text>
          <Text style={{alignSelf:'flex-end', textAlign: 'right', color: '#2d63e2' }}>
            {department}부서
          </Text>
        </TouchableOpacity>
      </View>

    </View>
    </>
  );
};

export default ReplyCard;
