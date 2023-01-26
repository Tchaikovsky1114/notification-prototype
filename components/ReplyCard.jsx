import {Modal,Pressable,Text,TouchableOpacity,TouchableWithoutFeedback,useWindowDimensions,View} from 'react-native';
import React from 'react';
import useSeparateTime from '../hooks/useSeparateTime';
import * as Contacts from 'expo-contacts';
import { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
const ReplyCard = ({createdAt,department,email,id,name,position,reply}) => {
  const { createdTime } = useSeparateTime(createdAt);
  const { width } = useWindowDimensions();
  const [isContactModalShow,setIsContactModalShow] = useState(false);
  
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
      <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'rgba(0,0,0,0.2)'}}>
      
      <View style={{backgroundColor:'#fff',padding:24,borderRadius:4,justifyContent:'center',alignItems:'center'}}>
        <View style={{ paddingBottom:2,borderBottomWidth:1,marginBottom:16}}>
        <Text style={{fontSize:24}}>{name} {position}</Text>
        </View>
        
        <Text style={{fontSize:18}}>{email}</Text>
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:16}}>
          
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

      </View>
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
