import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDn-fBUWFaXmpn0-p7zhaAcH-IqalHAlmc",
  authDomain: "it-class-19dcf.firebaseapp.com",
  projectId: "it-class-19dcf",
  storageBucket: "it-class-19dcf.appspot.com",
  messagingSenderId: "1029514650420",
  appId: "1:1029514650420:web:a36d8302e23a1465203b61",
  measurementId: "G-6JEJK0T2NC"
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
