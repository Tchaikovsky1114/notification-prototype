const functions = require("firebase-functions");
const admin = require('firebase-admin')
const regionalFunctions = functions.region('asia-northeast3');
const serviceAccount = require('./notification-aa618-firebase-adminsdk-h2zfg-4979d61aa5.json');
const createUser = require("./createUser");
const verifyingEmail = require("./verifyingEmail");
const { Expo } = require("expo-server-sdk");
const verifyingToken = require("./verifyingToken");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // databaseURL: "https://notification-aa618-default-rtdb.firebaseio.com"
})

const db = admin.firestore();

exports.registerUser = regionalFunctions.https.onRequest(createUser);
exports.verifyingEmail = regionalFunctions.https.onRequest(verifyingEmail);
exports.verifyingToken = regionalFunctions.https.onRequest(verifyingToken);


exports.welcomeUserNotification = regionalFunctions.firestore
.document('User/{userId}')
.onCreate(async (snap, context) => {
  let expo = new Expo();
  const userId = context.params.userId;
  const user = snap.data();  
  
  let messages = [];
  let tickets = [];
  const users = await admin.firestore().collection('User').get();
  users.forEach((doc) => {
    const token = doc.data().pushToken;
    if(token) {
      messages.push({
        to: token,
        sound: 'default',
        priority:'high',
        title:`${user.name}님이 새로 가입하셨어요`,
        body: `${user.name}님의 이메일은 ${user.email}입니다.`
      })
    }
  })
  let chunks = expo.chunkPushNotifications(messages)
  for(let chunk of chunks) {
    try {
      let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      tickets.push(...ticketChunk);
    } catch (error) {
      console.error(error);
    }
  }
})

