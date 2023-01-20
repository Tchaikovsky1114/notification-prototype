const functions = require("firebase-functions");
const admin = require('firebase-admin')
const regionalFunctions = functions.region('asia-northeast3');
const serviceAccount = require('./notification-aa618-firebase-adminsdk-h2zfg-4979d61aa5.json');
const createUser = require("./createUser");
const verifyingEmail = require("./verifyingEmail");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // databaseURL: "https://notification-aa618-default-rtdb.firebaseio.com"
})
// const db = functions.firestore;

exports.registerUser = regionalFunctions.https.onRequest(createUser);
exports.verifyingEmail = regionalFunctions.https.onRequest(verifyingEmail);
// exports.welcomeUserNotification = db.document('/Users/{userEmail}').onCreate(
  
// )

