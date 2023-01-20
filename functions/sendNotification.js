const admin = require('firebase-admin');
const { Expo } = require('expo-server-sdk');

const expo = new Expo();

export const sendPushNotifications = (pushTokens,message,title) => {
    const expoPushMessages = pushTokens.map((pushToken) => ({
        body: message,
        data: '',
        title: title,
        to: pushToken,
      }));


    return expo.sendPushNotificationsAsync(expoPushMessages);
   };
