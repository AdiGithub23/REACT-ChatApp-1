import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "reactchatapp-f9640.firebaseapp.com",
  projectId: "reactchatapp-f9640",
  storageBucket: "reactchatapp-f9640.appspot.com",
  messagingSenderId: "1083979136202",
  appId: "1:1083979136202:web:173c99553db6cee64dc833"
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()