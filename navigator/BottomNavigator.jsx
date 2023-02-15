import { View, Text } from 'react-native'
import React from 'react'


import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';

import AnnualLeaveScreen from '../screens/AnnualLeaveScreen'; 
import ChatScreen from '../screens/ChatScreen';
import AttendanceScreen from '../screens/AttendanceScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NoticeScreen from '../screens/NoticeScreen';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../recoil/userInfo';
import NotoText from '../components/common/NotoText';

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  const userInfo = useRecoilValue(userInfoState);
  return (
    <Tab.Navigator
      initialRouteName='Main'
      screenOptions={ ({route}) => ({
        tabBarStyle: [{
          alignItems: 'center',
          justifyContent: 'center',
          height: 60,
          display:'flex'
        },null
      ],
        tabBarLabelStyle:{
          fontSize:14,
        },
        tabBarActiveTintColor: '#2d63e2',
        tabBarInactiveTintColor:'#120a57',
        tabBarItemStyle: {
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 5,
          paddingBottom: 15,
          height: 70,
        },
        // tabBarIconStyle: {
        //   alignContent: 'center',
        //   justifyContent: 'center',
        // },
        tabBarIcon: ({focused}) => {
          if(route.name === 'NotLogged'){
            return <AntDesign name="lock" size={32} color="#2d63e2" />
          }
          if(route.name === 'Main') {
            return focused
            ? <AntDesign name="home" size={24} color="#2d63e2" />
            : <AntDesign name="home" size={24} color="black" />
          }

          if(route.name === 'Notice') {
            return focused
            ? <AntDesign name="notification" size={24} color="#2d63e2" />
            : <AntDesign name="notification" size={24} color="#120a57" />
          }
          
          if(route.name === 'AnnualLeave') {
            return focused
            ? <FontAwesome5 name="umbrella-beach" size={24} color="#2d63e2" />
            : <FontAwesome5 name="umbrella-beach" size={24} color="#120a57" />
          }

          if(route.name === 'Chat') {
            return focused
            ? <Entypo name="chat" size={24} color="#2d63e2" />
            : <Entypo name="chat" size={24} color="black" />
          }

          if(route.name === 'Attendance') {
            return focused
            ? <MaterialCommunityIcons name="chair-school" size={24} color="#2d63e2" />
            : <MaterialCommunityIcons name="chair-school" size={24} color="#120a57" />
          }
        }
      })
      }
    >
      
      {
        userInfo ?
        <>
        <Tab.Screen
      name="Main"
      component={HomeScreen}
      options={{
        // headerShown:false
        title:'홈',
        headerTitle: () => <NotoText style={{fontSize:22}}>성원Works</NotoText> ,
        headerTitleAlign:'center',
        headerTitleAllowFontScaling:true,
        headerTitleStyle:{
          fontSize:24
        },
        headerTitleContainerStyle:{
        }
      }}
      />
      <Tab.Screen
      name="Notice"
      component={NoticeScreen}
      options={{
        // headerShown:false,
        title:'공지사항',
        headerTitleAlign:'center',
        headerTitleAllowFontScaling:true,
        headerTitleStyle:{
          fontSize:24
        },
        headerTitleContainerStyle:{
        }
      }}
      />
      <Tab.Screen
      name="AnnualLeave"
      component={AnnualLeaveScreen} 
      options={{
        // headerShown:false,
        title:'연차계획',
        headerTitleAlign:'center',
      }}
      />
      <Tab.Screen
      name="Chat"
      component={ChatScreen} 
      options={{
        // headerShown:false,
        title:'대화하기',
        headerTitleAlign:'center',
      }}
      />
      <Tab.Screen
      name="Attendance"
      component={AttendanceScreen} 
      options={{
        // headerShown:false,
        title:'출/퇴근 관리',
        headerTitleAlign:'center',
      }}
      />
      </>
      :
      <Tab.Screen
      name="NotLogged"
      component={HomeScreen}
      options={{
        headerShown:false,
        title:'',
        tabBarStyle: {
          justifyContent:'center',
          alignItems:'center'
        }
      }}
      />
      }

    </Tab.Navigator>
  )
}

export default BottomNavigator