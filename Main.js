import { NavigationContainer } from '@react-navigation/native';
import { Alert } from 'react-native';
import { useEffect, useRef,useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pushTokenState } from './recoil/pushtoken';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import DrawerNavigator from './navigator/DrawerNavigator';
import { userInfoState } from './recoil/userInfo';

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
   
      <DrawerNavigator />
    </NavigationContainer>
  );
};

export default Main;
