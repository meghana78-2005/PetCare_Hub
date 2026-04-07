// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRqa3JK-O8qsvFnzx8GiEouvKo9j6CowI",
  authDomain: "authexample-e73a6.firebaseapp.com",
  projectId: "authexample-e73a6",
  storageBucket: "authexample-e73a6.firebasestorage.app",
  messagingSenderId: "477808320977",
  appId: "1:477808320977:web:3f4dc44ec41042632100f0",
  measurementId: "G-YV9FVVDZ63"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);