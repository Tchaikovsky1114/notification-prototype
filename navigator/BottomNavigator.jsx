import { View, Text, useWindowDimensions } from 'react-native'
import React from 'react'


import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../recoil/userInfo';


import HomeScreen from '../screens/HomeScreen';
import AnnualLeaveScreen from '../screens/AnnualLeaveScreen'; 
import ChatScreen from '../screens/ChatScreen';
import AttendanceScreen from '../screens/AttendanceScreen';
import NoticeScreen from '../screens/NoticeScreen';

import NotoText from '../components/common/NotoText';

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  const userInfo = useRecoilValue(userInfoState);
  const { width } = useWindowDimensions();
  
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
          fontSize:width > 330 ? 14 : 10,
          fontFamily:'Noto400',
          lineHeight:20,
        },
        tabBarActiveTintColor: '#0cdae0',
        tabBarInactiveTintColor:'#fff',
        headerShadowVisible:false,
        tabBarItemStyle: {
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 5,
          paddingBottom: 15,
          height: 70,
        },
        tabBarActiveBackgroundColor:'#000',
        tabBarInactiveBackgroundColor:'#000',
        
        // tabBarIconStyle: {
        //   alignContent: 'center',
        //   justifyContent: 'center',
        // },
        tabBarIcon: ({focused}) => {
          if(route.name === 'NotLogged'){
            return <AntDesign name="lock" size={32} color="#0cdae0" />
          }
          if(route.name === 'Main') {
            return focused
            ? <AntDesign name="home" size={width > 330 ? 24 : 18} color="#0cdae0" />
            : <AntDesign name="home" size={width > 330 ? 24 : 18} color="#fff" />
          }

          if(route.name === 'Notice') {
            return focused
            ? <AntDesign name="notification" size={width > 330 ? 24 : 18} color="#0cdae0" />
            : <AntDesign name="notification" size={width > 330 ? 24 : 18} color="#fff" />
          }
          
          if(route.name === 'AnnualLeave') {
            return focused
            ? <FontAwesome5 name="umbrella-beach" size={width > 330 ? 24 : 18} color="#0cdae0" />
            : <FontAwesome5 name="umbrella-beach" size={width > 330 ? 24 : 18} color="#fff" />
          }

          if(route.name === 'Chat') {
            return focused
            ? <Entypo name="chat" size={width > 330 ? 24 : 18} color="#0cdae0" />
            : <Entypo name="chat" size={width > 330 ? 24 : 18} color="#fff" />
          }

          if(route.name === 'Attendance') {
            return focused
            ? <MaterialCommunityIcons name="chair-school" size={width > 330 ? 24 : 18} color="#0cdae0" />
            : <MaterialCommunityIcons name="chair-school" size={width > 330 ? 24 : 18} color="#fff" />
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
        title:'???',
        headerTitle: () => <NotoText style={{fontSize:22}}>??????Works</NotoText> ,
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
        title:'????????????',
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
        title:'????????????',
        headerTitleAlign:'center',
      }}
      />
      <Tab.Screen
      name="Chat"
      component={ChatScreen} 
      options={{
        // headerShown:false,
        title:'????????????',
        headerTitleAlign:'center',
      }}
      />
      <Tab.Screen
      name="Attendance"
      component={AttendanceScreen} 
      options={{
        // headerShown:false,
        title:'???/?????? ??????',
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