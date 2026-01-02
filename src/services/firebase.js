// Firebase Configuration for Rosary Plant House
// ================================================
// INSTRUCTIONS: Replace the placeholder values below with your Firebase project credentials
// You can find these in the Firebase Console -> Project Settings -> General -> Your apps -> SDK setup

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Replace with your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAgMtf1dJ8hiy_kZr8LCUHfftHaxLk541Q",
    authDomain: "rosary-react.firebaseapp.com",
    projectId: "rosary-react",
    storageBucket: "rosary-react.firebasestorage.app",
    messagingSenderId: "448567770336",
    appId: "1:448567770336:web:0e96551c7a8bcb881c2485",
    measurementId: "G-1RH54EXYTH"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

// Admin email - replace with your email
export const ADMIN_EMAIL = 'sshibinthomass@gmail.com';

// WhatsApp business number - replace with actual number (with country code, no + or spaces)
export const WHATSAPP_NUMBER = '919876543210'; // Example: India country code + number

export default app;
