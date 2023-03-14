// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { initializeFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGQy2DRT7gHuWXj0rOrdjTc1Nap-svQwo",
  authDomain: "notification-aa618.firebaseapp.com",
  databaseURL: "https://notification-aa618-default-rtdb.firebaseio.com",
  projectId: "notification-aa618",
  storageBucket: "notification-aa618.appspot.com",
  messagingSenderId: "478430295721",
  appId: "1:478430295721:web:feb0f763004d3deccf9bb8",
  measurementId: "G-ZBCPXDYCSS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});;
export const storage = getStorage(app);

// auth.languageCode = 'kr';