import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCD6W-HA2F69hqmqQy4Gb-kjsxKQcRPnds",
  authDomain: "balajishoemart18.firebaseapp.com",
  databaseURL: "https://balajishoemart18-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "balajishoemart18",
  storageBucket: "balajishoemart18.firebasestorage.app",
  messagingSenderId: "58440276293",
  appId: "1:58440276293:web:6cc04050a56309b897462c",
  measurementId: "G-PSMZWPEMYH"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
