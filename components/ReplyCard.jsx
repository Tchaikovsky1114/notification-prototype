import {TouchableOpacity,View} from 'react-native';
import React from 'react';
import useSeparateTime from '../hooks/useSeparateTime';

import { useState } from 'react';


import NotoText from './common/NotoText';
import ContactModal from './ContactModal';

const ReplyCard = ({createdAt,department,email,id,name,position,reply}) => {
  const { createdTime } = useSeparateTime(createdAt);
  const [isContactModalShow,setIsContactModalShow] = useState(false);

    
  
  const popUpContactModalHandler = () => {
    setIsContactModalShow(true);
  }

  return (
    <>
    <ContactModal
      email={email}
      name={name}
      position={position}
      setIsContactModalShow={setIsContactModalShow}
      isContactModalShow={isContactModalShow}
    />
    <View style={{borderWidth: 1, borderColor: '#dde', borderRadius: 4,marginBottom:16}}>
      <View style={{flexDirection: 'row'}}>
        <View style={{ backgroundColor: '#f6f9ff',width:'70%',padding:16, position:'relative'}}>
          <NotoText>{reply}</NotoText>
          <View style={{position:'absolute', bottom:4,right:4}}>
          <NotoText style={{fontSize:10,color:'#ccc'}}>{createdTime.year}-{createdTime.month}-{createdTime.day} {createdTime.hours}:{createdTime.minutes}</NotoText>
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
          <NotoText>
            {name} {position}
          </NotoText>
          <NotoText style={{alignSelf:'flex-end', textAlign: 'right', color: '#2d63e2' }}>
            {department}부서
          </NotoText>
        </TouchableOpacity>
      </View>

    </View>
    </>
  );
};

export default ReplyCard;
