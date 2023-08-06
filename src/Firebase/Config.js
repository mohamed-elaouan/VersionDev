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
  apiKey: "AIzaSyBF0vFeImhlkHUy-odcgzZ3xZEK7DQHs1s",
  authDomain: "elaouan-book-store.firebaseapp.com",
  projectId: "elaouan-book-store",
  storageBucket: "elaouan-book-store.appspot.com",
  messagingSenderId: "264554915687",
  appId: "1:264554915687:web:cddaf10c6c2facd34e31c2",
  measurementId: "G-61V683Y8EL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);