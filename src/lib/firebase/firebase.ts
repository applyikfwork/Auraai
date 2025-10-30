// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEES9gdt7s-6Nm5R7jDWZEM9WUXRh0DNg",
  authDomain: "auraaiavatar.firebaseapp.com",
  projectId: "auraaiavatar",
  storageBucket: "auraaiavatar.appspot.com",
  messagingSenderId: "462010756333",
  appId: "1:462010756333:web:498f3fe0a533a445c430e4",
  measurementId: "G-Y1J1L57HLX"
};

// Initialize Firebase
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
