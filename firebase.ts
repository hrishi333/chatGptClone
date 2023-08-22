import {getApp, getApps,initializeApp} from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBatFjJZJmM2ip8T4zMFKUylXXCt0Wpqz4",
  authDomain: "chat-gpt-clone-4d0ef.firebaseapp.com",
  projectId: "chat-gpt-clone-4d0ef",
  storageBucket: "chat-gpt-clone-4d0ef.appspot.com",
  messagingSenderId: "798046817687",
  appId: "1:798046817687:web:2f43a279ba02a228ca48d2"
};

// Initialize Firebase
const app = getApps().length? getApp():initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};