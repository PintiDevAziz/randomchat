import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDHVRLuZao82NZAp_9sE_XsmB7a7tlXdDk",
  authDomain: "chatapp-88c5f.firebaseapp.com",
  projectId: "chatapp-88c5f",
  storageBucket: "chatapp-88c5f.appspot.com",
  messagingSenderId: "673998850556",
  appId: "1:673998850556:web:dc5535b3c1a32ee1f08a79",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { app, auth, db };
