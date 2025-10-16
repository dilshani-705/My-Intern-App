//firebase.ts
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIOLyAedINFiX8SVF94Sag8E2ekPnI4E4",
  authDomain: "my-intern-app-19258.firebaseapp.com",
  projectId: "my-intern-app-19258",
  storageBucket: "my-intern-app-19258.firebasestorage.app",
  messagingSenderId: "739870230977",
  appId: "1:739870230977:web:3c350f14102a01b3128740",
  measurementId: "G-JJM6JN31GP"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig)
export const db = getFirestore(firebaseApp)
export const auth = getAuth(firebaseApp)
