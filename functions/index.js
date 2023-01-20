const functions = require("firebase-functions");
const admin = require('firebase-admin')
const regionalFunctions = functions.region('asia-northeast3');
const serviceAccount = require('./notification-aa618-firebase-adminsdk-h2zfg-4979d61aa5.json');
const createUser = require("./createUser");
const verifyingEmail = require("./verifyingEmail");
const { Expo } = require("expo-server-sdk");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // databaseURL: "https://notification-aa618-default-rtdb.firebaseio.com"
})

const db = admin.firestore();

exports.registerUser = regionalFunctions.https.onRequest(createUser);
exports.verifyingEmail = regionalFunctions.https.onRequest(verifyingEmail);
exports.welcomeUserNotification = regionalFunctions.firestore.document('Users/{userEmail}')
.onCreate((snap, context) => {
  const user = snap.data();
  const pushToken = user.pushToken;
  let expo = new Expo();

  let messages = [{
    to: pushToken
  }]
})

