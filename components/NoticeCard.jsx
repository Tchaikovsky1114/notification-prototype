import { Image, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import React, { useEffect } from 'react';
import useSeparateTime from '../hooks/useSeparateTime';
import NotoText from './common/NotoText';
import { useNavigation } from '@react-navigation/native';
import useNotice from '../hooks/useNotice';


const NoticeCard = ({
  title,
  id,
  content,
  department,
  email,
  position,
  like,
  reply,
  read,
  createdAt,
  writer,
}) => {
  const navigation = useNavigation();

  const { width } = useWindowDimensions();

  const { createdTime } = useSeparateTime(createdAt);
  const { readNotice } = useNotice();
  const navigateDetailPageHandler = () => {
    readNotice(id);
    navigation.navigate('NoticeDetail', {
      id,
      like,
      reply,
      department,
      email,
      content,
      title,
      email,
      position,
      read,
      createdAt,
      writer,
    });
  };
  useEffect(() => {
    navigation.setOptions({
      
    })  
  }, [])
  return (
    <View
      style={{
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#fff',
        paddingHorizontal: 24
      }}
      key={id}
    >
      
      <TouchableOpacity
        onPress={navigateDetailPageHandler}
        style={{
          flexDirection:'row',
          borderBottomWidth: 1,
          borderBottomColor: '#2d63e2',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 8,
          paddingHorizontal:12,
          width,
          backgroundColor: '#fff',
        }}
      >
        
        <View style={{width:32,justifyContent:'flex-end',alignItems:'flex-end',borderRadius:32,overflow:'hidden'}}>
        <Image 
          style={{width:32,height:32,borderRadius:32,}}
          source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUd_xVsmeViKMvrtNOguehlTjA-vsqyn8fyQ&usqp=CAU' }}
          />
        </View> 

        <View style={{marginLeft:16,flex:1,justifyContent:'center',alignItems:'flex-start'}}>
          <NotoText style={{ fontSize: 18 }}>{title}</NotoText>
          <View
          style={{
            flexDirection:'row',
            justifyContent:'flex-start',
            alignItems: 'flex-start',
            width: '100%',
          }}
        >
          <NotoText style={{ fontSize: 12, color:'#a7a7a7' }}>
            {writer} {position}
          </NotoText>
          <View style={{width:8}} />
          <NotoText style={{ fontSize: 12, color:'#ccc' }}>
            {createdTime.month >= 10 ? createdTime.month : '0' + createdTime.month}-{createdTime.day >= 10 ? createdTime.day : '0' + createdTime.day} {createdTime.hours >= 10 ? createdTime.hours : '0' + createdTime.hours}:{createdTime.minutes >= 10 ? createdTime.minutes : '0' + createdTime.minutes}
          </NotoText>
          <View style={{width:8}} />
          <NotoText style={{ fontSize: 12, color:'#ccc' }}>조회수 {read}</NotoText>
        </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default NoticeCard;
