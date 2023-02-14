import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Dimensions,
  useWindowDimensions,
} from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import * as Constants from 'expo-constants';
import useNotice from '../hooks/useNotice';
import { userInfoState } from '../recoil/userInfo';
import { useRecoilValue } from 'recoil';
import RenderHTML from 'react-native-render-html';
import ReplyCard from '../components/ReplyCard';
import NotoText from '../components/common/NotoText';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import {  doc, onSnapshot } from 'firebase/firestore';
import { firestore } from '../firebaseConfig';
import useSeparateTime from '../hooks/useSeparateTime';

const systemFonts = [
  ...Constants.default.systemFonts,
  'Noto400',
  'Noto500',
  'Noto700',
];

const { width: deviceWidth } = Dimensions.get('window');

const tagStyles = {
  body: {
    color: '#061457',
    width: deviceWidth > 330 ? 360 : 300,
    padding: 32,
    marginTop: 16,
    marginBottom: 16,
    fontSize: 14,
    fontFamily: 'Noto400',
  },
  img: {
    width: deviceWidth > 330 ? 250 : 330,
  },
  b: {
    fontWeight: 'bold',
    fontSize: 22,
  },
};
const NoticaDetail = () => {
  const {
    params: {
      id,
      like,
      reply,
      department,
      email,
      content,
      title,
      position,
      read,
      createdAt,
      writer,
    },
  } = useRoute();
  const { createdTime } = useSeparateTime(createdAt);
  const { controlLikes, createReply } = useNotice();
  const userInfo = useRecoilValue(userInfoState);
  const [isMyLike, setIsMyLike] = useState(
    like.findIndex((item) => item === userInfo.email) >= 0
  );
  const [replyValue, setReplyValue] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [likeCount, setLikeCount] = useState(like.length);
  const [feeds, setFeeds] = useState(reply);
  const { width } = useWindowDimensions();
  const navigation = useNavigation();

  const toggleLikeHandler = () => {

    setIsMyLike((prev) => !prev);
    controlLikes(id, userInfo.email);
  };
  const changeReplyValueHandler = (text) => {
    setReplyValue(text);
  };
  const submitReplyHandler = () => {
    setIsLoading(true);
    const replyObj = {
      id,
      name: userInfo.name,
      email: userInfo.email,
      reply: replyValue,
      department: userInfo.department,
      position: userInfo.position,
    };
    createReply(replyObj).then(() => {
      setIsLoading(false);
      setReplyValue('');
    });
  };
  
  useEffect(() => {
    navigation.setOptions({
      title,
    });
  }, []);

  useEffect(() => {
    if (!writer) return;
    setIsMyLike(like.findIndex((item) => item === userInfo.email) >= 0);
  }, [writer]);

  useEffect(() => {
    const unsub = onSnapshot(doc(firestore, 'Notice', id), (doc) => {
      setLikeCount(doc.data().like.length);
      setFeeds(doc.data().reply);
    });
    return () => unsub();
  }, []);

  return (
    <>
      {writer ? (
        <ScrollView style={styles.container} nestedScrollEnabled>
          <View
            style={{
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              borderBottomWidth: 2,
              borderBottomColor: '#ccc',
            }}
          >
            <View style={{ flex: 3, marginTop:16 }}>
              <NotoText style={{ fontSize: 20 }}>{title}</NotoText>
            </View>
            <View
              style={{
                flex: 2,
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <NotoText style={{ fontSize: 12, color: '#aaa' }}>
                  조회수: {read}
                </NotoText>
                <View style={{ width: 8 }} />
                <NotoText style={{ fontSize: 12, color: '#aaa' }}>
                  {createdTime.year}-
                  {createdTime.month >= 10
                    ? createdTime.month
                    : '0' + createdTime.month}
                  -
                  {createdTime.day >= 10
                    ? createdTime.day
                    : '0' + createdTime.day}{' '}
                  {createdTime.hours >= 10
                    ? createdTime.hours
                    : '0' + createdTime.hours}
                  :
                  {createdTime.minutes >= 10
                    ? createdTime.minutes
                    : '0' + createdTime.minutes}{' '}
                </NotoText>
              </View>
              <NotoText style={{ color: '#aaa' }}>
                {writer} {position}
              </NotoText>
            </View>
          </View>
          <RenderHTML
            source={{ html: content }}
            contentWidth={width}
            tagsStyles={tagStyles}
            systemFonts={systemFonts}
          />
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Pressable
              onPress={toggleLikeHandler}
              style={{
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: 56,
                height: 74,
                borderWidth: 1,
                borderColor: '#f41',
              }}
            >
              <NotoText style={{ fontSize: 12 }}>좋아요</NotoText>
              {isMyLike ? (
                <AntDesign name="heart" size={20} color="#f41" />
              ) : (
                <AntDesign name="hearto" size={20} color="#a7a7a7" />
              )}
              <NotoText style={{color: (likeCount === 0 || !isMyLike) ? '#a7a7a7' : '#f41'}}>{likeCount}</NotoText>
            </Pressable>
          </View>

          <View
            style={{
              marginVertical: 16,
              width: '100%',
              alignItems: 'flex-start',
            }}
          >
            <NotoText>댓글({feeds.length})</NotoText>
          </View>
          <ScrollView>
            {feeds.map((item) => (
              <ReplyCard
                key={item.id}
                id={item.id}
                createdAt={item.createdAt}
                department={item.department}
                email={item.email}
                name={item.name}
                position={item.position}
                reply={item.reply}
              />
            ))}
          </ScrollView>

          <View
            style={{
              borderWidth: 1,
              borderColor: '#dde',
              padding: 8,
              borderRadius: 4,
              marginTop: 16,
              marginBottom: 40,
              backgroundColor: '#f6f9ff',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <TextInput
                value={replyValue}
                onChangeText={(text) => changeReplyValueHandler(text)}
                numberOfLines={4}
                multiline={true}
                style={{
                  backgroundColor: '#fff',
                  padding: 16,
                  borderWidth: 1,
                  borderRadius: 4,
                  borderColor: '#2d63e2',
                  width: '80%',
                }}
                placeholder=" 댓글을 적어주세요"
              />
              <View style={{ justifyContent: 'center', padding: 8 }}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={submitReplyHandler}
                  disabled={isLoading}
                  style={{
                    borderWidth: 1,
                    borderColor: '#2d63e2',
                    borderRadius: 4,
                    paddingHorizontal: 8,
                    backgroundColor: '#fff',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {isLoading ? (
                    <ActivityIndicator />
                  ) : (
                    <NotoText style={{ fontSize: 10 }}>작성하기</NotoText>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      ) : (
        <Text>Nothing</Text>
      )}
    </>
  );
};

export default NoticaDetail;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 24,
  },
});
