
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from './screens/SignIn';
import { useEffect, useLayoutEffect, useRef,useState } from 'react';
import { userInfoState } from './recoil/userInfo';
import { useRecoilState } from 'recoil';
import HomeScreen from './screens/HomeScreen';
import { pushTokenState } from './recoil/pushtoken';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

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
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync({experienceId: "@swadpia/notification-prototype"})).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
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
let date = new Date();

const Main = () => {
  const [expoPushToken, setExpoPushToken] = useRecoilState(pushTokenState);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [notification, setNotification] = useState();
  const notificationListener = useRef();
  const responseListener = useRef();

  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const navigationRef = useRef(null);

  /**테스트용 localStorage Clear 함수 */
  // const test = async () => {
  //   await AsyncStorage.clear();
  // }
  // useLayoutEffect(() => {
  //   test();
  // },[])


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
      
        <Stack.Screen name="SignIn" component={SignIn}  />
        <Stack.Screen 
          name="Home"
          component={HomeScreen}
          options={{
            headerBackVisible: false,
            headerTitleAlign:'center',
            headerTitle: '공지사항',
            headerShadowVisible:false,
            
          }}
        />  
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Main;
