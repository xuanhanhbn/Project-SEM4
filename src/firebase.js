// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyB1WXdtkjW0YgOsEHJ2RM60X-br7toDxLU',
    authDomain: 'techwiz-2023.firebaseapp.com',
    projectId: 'techwiz-2023',
    storageBucket: 'techwiz-2023.appspot.com',
    messagingSenderId: '526676848361',
    appId: '1:526676848361:web:8c020fdaf5fc372aa88a78',
    measurementId: 'G-S9PGZWW39E',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
