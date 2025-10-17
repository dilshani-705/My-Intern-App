//firebase.ts
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSAR49Q5hJmGUYcRISjX5QSh2fNefJ6gg",
  authDomain: "food-factory-management.firebaseapp.com",
  projectId: "food-factory-management",
  storageBucket: "food-factory-management.firebasestorage.app",
  messagingSenderId: "214746585773",
  appId: "1:214746585773:web:15d7de32c6f1d547194424",
  measurementId: "G-9RK1V3VEPM"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig)
export const db = getFirestore(firebaseApp)
export const auth = getAuth(firebaseApp)
