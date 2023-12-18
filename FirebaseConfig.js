import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA4Wc_ngZGhutsldKCjZxVjammrzieNFWU",
    authDomain: "lernatelier2.firebaseapp.com",
    projectId: "lernatelier2",
    storageBucket: "lernatelier2.appspot.com",
    messagingSenderId: "597340532401",
    appId: "1:597340532401:web:b162e7d277e2700b00bc90",
    measurementId: "G-Z3GG2HH9VK"
  };

// Initialize Firebase
const FIREBASE_APP = initializeApp(firebaseConfig);

export { FIREBASE_APP };
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);