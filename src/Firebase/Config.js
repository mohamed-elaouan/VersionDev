// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYgcuHgQGC9rXqOCw8K1eaHPBjDTACzmI",
  authDomain: "pourresoudreproblem.firebaseapp.com",
  projectId: "pourresoudreproblem",
  storageBucket: "pourresoudreproblem.appspot.com",
  messagingSenderId: "449928480420",
  appId: "1:449928480420:web:337420fb0f7e5ff0fe4831"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);