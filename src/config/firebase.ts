// Import the functions you need from the SDKs you need
import { initializeApp,getApp,getApps } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCu8Co_vJjjyvWIyloFijHi-UPp8Oj2n-I",
  authDomain: "code-platform-f8e82.firebaseapp.com",
  projectId: "code-platform-f8e82",
  storageBucket: "code-platform-f8e82.appspot.com",
  messagingSenderId: "304226055128",
  appId: "1:304226055128:web:74868c065ffbff64cdb8ad"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore, app };
