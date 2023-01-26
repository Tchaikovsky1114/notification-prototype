const functions = require("firebase-functions");
const admin = require('firebase-admin')
const regionalFunctions = functions.region('asia-northeast3');
const serviceAccount = require('./notification-aa618-firebase-adminsdk-h2zfg-4979d61aa5.json');
const createUser = require("./createUser");
const verifyingEmail = require("./verifyingEmail");
const { Expo } = require("expo-server-sdk");
const verifyingToken = require("./verifyingToken");
const createNotice = require("./createNotice");
const getNotices = require("./getNotices");
const readNotice = require("./readNotice");
const controlLikes = require("./controlLikes");
const createReply = require("./createReply");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // databaseURL: "https://notification-aa618-default-rtdb.firebaseio.com"
})

const db = admin.firestore();

exports.registerUser = regionalFunctions.https.onRequest(createUser);
exports.verifyingEmail = regionalFunctions.https.onRequest(verifyingEmail);
exports.verifyingToken = regionalFunctions.https.onRequest(verifyingToken);
exports.createNotice = regionalFunctions.https.onRequest(createNotice);
exports.getNotices = regionalFunctions.https.onRequest(getNotices);
exports.readNotice = regionalFunctions.https.onRequest(readNotice);
exports.controlLikes = regionalFunctions.https.onRequest(controlLikes);
exports.createReply = regionalFunctions.https.onRequest(createReply);

exports.noticeUserNotification = regionalFunctions.firestore
.document('Notice/{noticeId}')
.onCreate(async (snap, context) => {
  let expo = new Expo();
  const notice = snap.data();
  let messages = [];
  let tickets = [];

  const users = await admin.firestore().collection('User').get();
  users.forEach((doc) => {
    const token = doc.data().pushToken;
    if(token) {
      messages.push({
        to: token,
        sound: 'default',
        priority: 'high',
        title: `공지사항이 등록되었습니다.`,
        body: `[${notice.title}]를 확인해주세요`,
        channelId:'default'
      })
    }
  })
  let chunks = expo.chunkPushNotifications(messages);
  for(let chunk of chunks) {
    try {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        tickets.push(...ticketChunk);
    } catch (error) {
      return null;
    }
  }

})
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
        body: `${user.name}님의 이메일은 ${user.email}입니다.`,
        channelId:'default'
      })
    }
  })
  let chunks = expo.chunkPushNotifications(messages)
  for(let chunk of chunks) {
    try {
      let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      tickets.push(...ticketChunk);
    } catch (error) {
      return null;
    }
  }
})

// exports.subscriptionNotice = admin.firestore().collection('Notice').onSnapshot(( snapshot ) => {
//   console.log(`Received querySnapshot of size ${snapshot.docs()}`)
// },(error) => console.log(error))