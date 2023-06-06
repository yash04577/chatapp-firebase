import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import 'firebase/messaging';
import { getMessaging } from "firebase/messaging";




const firebaseConfig = {
  apiKey: "AIzaSyAre6-nL2Di67eAWEWJY_cfWt8_PkuBdlg",
  authDomain: "chat-app-f93c4.firebaseapp.com",
  projectId: "chat-app-f93c4" ,
  storageBucket: "chat-app-f93c4.appspot.com" ,
  messagingSenderId: "218706756214" ,
  appId: "1:218706756214:web:a31113f84fed321b3d5557" ,
  // apiKey: import.meta.env.VITE_API_KEY,
  // authDomain: import.meta.env.VITE_AUTH_ADMIN,
  // projectId: import.meta.env.VITE_PROJECT_ID ,
  // storageBucket: import.meta.env.VITE_STORAGE_BUCKET ,
  // messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID ,
  // appId: import.meta.env.VITE_APP_ID ,
};

  // console.log((import.meta.env.VITE_PROJECT_ID))

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
export const messaging = getMessaging(app);