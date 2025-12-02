import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCmtPqIw0c543sh5elCQrr5reGVwl9jyOg",
  authDomain: "dogs-api-react.firebaseapp.com",
  projectId: "dogs-api-react",
  storageBucket: "dogs-api-react.firebasestorage.app",
  messagingSenderId: "1094846939262",
  appId: "1:1094846939262:web:161bb32e9770a43e3d182f",
  measurementId: "G-Y4PQ89RSNB"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

export default app;