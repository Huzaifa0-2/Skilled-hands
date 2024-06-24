import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "skilled-hands-b66ed.firebaseapp.com",
  projectId: "skilled-hands-b66ed",
  storageBucket: "skilled-hands-b66ed.appspot.com",
  messagingSenderId: "769469495259",
  appId: "1:769469495259:web:2a50729384734a699699fe",
  measurementId: "G-CGE8LEWTQX",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
