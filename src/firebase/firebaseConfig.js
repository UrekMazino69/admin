import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAPJumNVxQsx-1RyGFfxCuYIH5Do9w8FOY",
  authDomain: "admin-cda66.firebaseapp.com",
  projectId: "admin-cda66",
  storageBucket: "admin-cda66.appspot.com",
  messagingSenderId: "423566490596",
  appId: "1:423566490596:web:c626cc4062eb281cf5e5f1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {
  db,
  auth
};

export default app
