// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  // apiKey: "AIzaSyCWQJmpuTXb9OTY7iDkPamgNOOO4op7qXM",
  // authDomain: "airline-5aad2.firebaseapp.com",
  // projectId: "airline-5aad2",
  // storageBucket:"airline-5aad2.appspot.com",
  // messagingSenderId: "187452609596",
  // appId:"1:187452609596:web:492e1fab0ebb83c6e5df39"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Firebaseの認証機能を使う場合に必要な記述
const auth = getAuth(app);

// 上記2つの変数をどこででも使えるようにexportする
export { auth };
