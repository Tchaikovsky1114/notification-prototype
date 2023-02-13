
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from './screens/SignIn';
import { useEffect, useRef,useState } from 'react';
import { Entypo } from '@expo/vector-icons';
import { useRecoilState } from 'recoil';
import HomeScreen from './screens/HomeScreen';
import { pushTokenState } from './recoil/pushtoken';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AnnualLeaveScreen from './screens/AnnualLeaveScreen';

import AttendanceScreen from './screens/AttendanceScreen';
import AnnualDetailScreen from './screens/AnnualDetailScreen';
import NoticeDetail from './screens/NoticeDetail';
import { Alert } from 'react-native';
import ChatScreen from './screens/ChatScreen';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});
const registerForPushNotification = async (userId) => {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      Alert.alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync({experienceId: "@swadpia/notification-prototype"})).data;
    console.log(token);
  } else {
    Alert.alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
  return token;
};
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName='Notice'
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
      <Tab.Screen
      name="Notice"
      component={HomeScreen}
      options={{
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
      <Tab.Screen name="AnnualLeave" component={AnnualLeaveScreen} 
      options={{
        title:'연차계획',
        headerTitleAlign:'center',
      }}
      />
      <Tab.Screen name="Chat" component={ChatScreen} 
      options={{
        title:'대화하기',
        headerTitleAlign:'center',
      }}
      />
      <Tab.Screen name="Attendance" component={AttendanceScreen} 
      options={{
        title:'출/퇴근 관리',
        headerTitleAlign:'center',
      }}
      />

    </Tab.Navigator>
  )
}


const Main = () => {
  const [expoPushToken, setExpoPushToken] = useRecoilState(pushTokenState);
  const [notification, setNotification] = useState();
  const notificationListener = useRef();
  const responseListener = useRef();



  const navigationRef = useRef(null);

  useEffect(() => {
    registerForPushNotification().then((token) => {
      setExpoPushToken(token);
      if (token) {
       
      }
    });
    console.log('expoPushToken',expoPushToken);
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        // setNotification(notification)
        console.log(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        setNotification(response.notification);
      });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      notificationListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
      
        <Stack.Screen name="SignIn" component={SignIn} options={{headerShown:false}} />
        <Stack.Screen 
          name="Home"
          component={MainScreen}
          options={{headerShown:false}}
          // options={{
          //   headerBackVisible: false,
          //   headerTitleAlign:'center',
          //   headerTitle: '공지사항',
          //   headerShadowVisible:false,
            
          // }}
        />
        <Stack.Screen
          name="NoticeDetail"
          component={NoticeDetail}
          options={{}}
        />
        <Stack.Screen
          name="AnnualLeaveDetail"
          component={AnnualDetailScreen}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Main;
