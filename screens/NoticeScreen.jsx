import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Notice from '../components/notice/Notice';
import NoticaDetail from './NoticeDetail';

const Stack = createNativeStackNavigator();

const NoticeScreen = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Notice" component={Notice} />
      <Stack.Screen name="NoticeDetail" component={NoticaDetail} />
    </Stack.Navigator>
  )
}

export default NoticeScreen