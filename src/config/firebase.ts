import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBFUp79e3BfNv9i5XgqAHAIW6cHxh4p1nE",
  authDomain: "ecomers-890eb.firebaseapp.com",
  projectId: "ecomers-890eb",
  storageBucket: "ecomers-890eb.firebasestorage.app",
  messagingSenderId: "853615825953",
  appId: "1:853615825953:web:36e1d69e1b2b8fe4843f60",
  measurementId: "G-8259N0GKDT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();



// Configure Google Auth provider
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;