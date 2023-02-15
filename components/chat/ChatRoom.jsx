import React, { useEffect } from 'react'
import { GiftedChat, Send } from 'react-native-gifted-chat'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useState } from 'react'
import { useLayoutEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { userInfoState } from '../../recoil/userInfo'
import useChat from '../../hooks/useChat'
import { doc, onSnapshot} from 'firebase/firestore'
import { firestore } from '../../firebaseConfig'
import { Feather } from '@expo/vector-icons';


const ChatRoom = () => {
  const {params:{userInfo}} = useRoute();
  const navigation = useNavigation()
  const myInfo = useRecoilValue(userInfoState);
  const [messages, setMessages] = useState();
  
  const { fetchChat, createChatRoom } = useChat();
  // 컬렉션 Chat에 내 이메일, 상대방 email로 된 Doc 생성
  // 내 Field에는 상대방 email 상대방 Field에는 내 email 생성
  // 메세지를 보낼때마다 두 값 모두 update

  const onSend = (messages = []) => {
    const { _id, createdAt, text, user } = messages[0];    
    fetchChat(userInfo.email , myInfo.email,{ _id, createdAt, text, user })
  }

  useEffect(() => {
    createChatRoom(myInfo.email, userInfo.email);
  }, [])
    
  useEffect(() => {
    const bug = userInfo.email.split('.')[0]
    console.log(bug);
    const chatRef = doc(firestore,`Chat/${myInfo.email}`);
    const unsubscribe = onSnapshot(chatRef, (snapshot) => {
      if(!snapshot.data()[bug]) return;
        setMessages(snapshot.data()[bug]['com'].reverse())
    })
    return () => unsubscribe();
  },[])
  
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown:true,
      title: `${userInfo.name}님과 대화중입니다.`,
      headerTitleStyle:{
        color:'#a8a8a8',
        fontSize:14
      },
      headerShadowVisible:false,
      headerTitleAlign:'center',
      headerBackVisible:false,
    })
    
  }, [])

  return (
    <GiftedChat
      showAvatarForEveryMessage={true}
      messages={messages}
      renderUsernameOnMessage={true}  
      onSend={messages => onSend(messages)}
      user={{
        _id:myInfo.email,
        name: myInfo.name,
      }}
    placeholder="보낼 메시지를 작성해주세요."
    messagesContainerStyle={{backgroundColor:'#fff'}}
    onPress={() => console.log('hello')}
    onPressAvatar={() => console.log('hello')}
    // onQuickReply={quickReply =>}
    renderSend={(props) => (
      <Send
        {...props}
        containerStyle={{justifyContent:'center', alignItems:'center',paddingHorizontal:12,marginRight:8}}

        >
        <Feather name="send" size={24} color="#2d63e2" />
      </Send>
    )}
    />
  )
}

export default ChatRoom
