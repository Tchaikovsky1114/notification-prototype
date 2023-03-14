import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Chat from '../components/chat/Chat';
import ChatRoom from '../components/chat/ChatRoom';

const Stack = createNativeStackNavigator();

const ChatScreen = () => {
  return (
    
    <Stack.Navigator screenOptions={{headerShown:false}}>
       <Stack.Screen name="ChatList" component={Chat} />
       <Stack.Screen name="ChatRoom" component={ChatRoom} />
     </Stack.Navigator>
  )
}

export default ChatScreen