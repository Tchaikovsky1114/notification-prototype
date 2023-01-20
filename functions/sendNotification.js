const admin = require('firebase-admin');
const { Expo } = require('expo-server-sdk');


export const sendPushNotifications = (pushTokens,message,title) => {
    const expoPushMessages = pushTokens.map((pushToken) => ({
        body: message,
        data: '',
        title: title,
        to: pushToken,
      }));

    const expo = new Expo();
    return expo.sendPushNotificationsAsync(expoPushMessages);
   };
