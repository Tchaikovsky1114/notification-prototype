import {
  Pressable,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
  Dimensions,
  TextInput,
  TouchableWithoutFeedback,
  FlatList,
  ActivityIndicator
} from 'react-native';
import React, { useState } from 'react';
import RenderHTML from 'react-native-render-html';
import useSeparateTime from '../hooks/useSeparateTime';
import useNotice from '../hooks/useNotice';
import { AntDesign } from '@expo/vector-icons';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../recoil/userInfo';

import ReplyCard from './ReplyCard';


const { width: deviceWidth } = Dimensions.get('window');

const tagStyles = {
  body: {
    backgroundColor: '#f6f9ff',
    color: '#061457',
    width: deviceWidth > 330 ? 360 : 300,
    padding: 32,
    marginTop: 16,
    marginBottom:16,
    fontSize: 20,
  },
  img: {
    width: deviceWidth > 330 ? 250 : 330,
  },
  b: {
    fontWeight: 'bold',
    fontSize: 22,
  },
};



const NoticeCard = ({title,id,content,department,email,position,like,reply,read,createdAt,writer}) => {
  
   
  const { width } = useWindowDimensions();
  const [isContentShow, setIsContentShow] = useState(false);
  const { createdTime } = useSeparateTime(createdAt);
  const { readNotice,controlLikes,createReply } = useNotice()
  const userInfo = useRecoilValue(userInfoState);
  const [isMyLike,setIsMyLike] = useState(like.findIndex((item) => item === userInfo.email) >= 0);
  const [replyValue,setReplyValue] = useState();
  const [isLoading,setIsLoading] = useState(false);
  const toggleContentHandler = () => {
    setIsContentShow((prev) => !prev);
    readNotice(id);
  };
  
  const toggleLikeHandler = () => {
    controlLikes(id,email);
    setIsMyLike((prev) => !prev);
  }
  const changeReplyValueHandler = (text) => {
    setReplyValue(text);
  }
  const submitReplyHandler = () => {
    setIsLoading(true);
    const replyObj = {
      id,
      name:userInfo.name,
      email:userInfo.email,
      reply:replyValue,
      department:userInfo.department,
      position:userInfo.position
    }
    createReply(replyObj).then(() => {
      setIsLoading(false);
      setReplyValue('');
    });
  }
  
  return (
    <View
      style={{ alignItems: 'center', width: '100%', backgroundColor: '#fff',paddingHorizontal:24}}
      key={id}
    >
      <TouchableOpacity
        onPress={toggleContentHandler}
        style={{
          borderBottomWidth: 1,
          borderBottomColor: '#2d63e2',
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 4,
          backgroundColor: '#fff',
          width: width - 48,
        }}
      >
        <View style={{paddingVertical:2,borderBottomWidth:1, borderBottomColor:'#ccc'}}>
          <Text style={{ fontSize: 18 }}>{title}</Text>
        </View>
        <View style={{marginVertical:4,justifyContent:'flex-end',alignItems:'flex-end',width:'100%'}}>
          <Text style={{ fontSize: 14 }}>작성일자: {createdTime.year}년 {createdTime.month}월 {createdTime.day}일 {createdTime.hours}시 {createdTime.minutes}분 {createdTime.seconds}초</Text>
          <Text style={{ fontSize: 14 }}>작성자: {writer}{' '}{position}</Text>
          <Text style={{ fontSize: 14 }}>조회수 {read}</Text>
        </View>
      </TouchableOpacity>
      {/* title을 클릭하면 해당 글 내용이 아래로 펼쳐지게끔 만들기 */}
      {isContentShow && (
        <>
        <RenderHTML
          source={{ html: content }}
          contentWidth={width}
          tagsStyles={tagStyles}
        />
        <View style={{flexDirection:'row', justifyContent:'flex-end', alignItems:'flex-end',width:'100%',marginBottom:8}}>
        <Pressable
        onPress={toggleLikeHandler}
        style={{marginRight:8}}
        >
        { isMyLike
        ? <AntDesign name="heart" size={20} color="red" />
        : <AntDesign name="hearto" size={20} color="red" />
        }
        </Pressable>
        <Text>{like.length}</Text>
        </View>
        <View style={{marginVertical:16,width:'100%',alignItems:'flex-start'}}>
          <Text>댓글({reply.length})</Text>
        </View>
        <FlatList
            keyExtractor={(item) => item.id}
            data={reply}
            extraData={reply}
            renderItem={({item}) =>
            <ReplyCard
              id={item.id}
              createdAt={item.createdAt}
              department={item.department}
              email={item.email}
              name={item.name}
              position={item.position}
              reply={item.reply}
              />}
            
            ItemSeparatorComponent={<View style={{height:16}} />}
            scrollEnabled={true}
            showsVerticalScrollIndicator={true}
            // ListFooterComponent={<View style={{height:20}} />}
            />

        <View style={{borderWidth:1, borderColor:'#dde',padding:8,borderRadius:4,marginTop:16,backgroundColor:'#f6f9ff'}}>
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
        <TextInput
          value={replyValue}
          onChangeText={(text) => changeReplyValueHandler(text)}
          numberOfLines={4}
          multiline={true}
          style={{
            backgroundColor:'#fff',
            padding:16,borderWidth:1,borderRadius:4, borderColor:'#2d63e2',width:'80%'}} placeholder=" 댓글을 적어주세요" />
        <View style={{justifyContent:'center',height:96}}>
          <TouchableOpacity
          activeOpacity={0.5}
          onPress={submitReplyHandler}
          disabled={isLoading}
          style={{borderWidth:1, borderColor:'#2d63e2',borderRadius:4,padding:8,backgroundColor:'#fff'}}>
          {isLoading ?  <ActivityIndicator /> : <Text>작성하기</Text>}
          </TouchableOpacity>
          {/* <Pressable
          onPress={() => {}}
          style={{borderWidth:1, borderColor:'red',borderRadius:4,padding:8,backgroundColor:'#fff'}}>
          <Text>취소하기</Text>
          </Pressable> */}
        </View>
        </View>
        </View>
        </>
      )}
    </View>
  );
};

export default NoticeCard;

