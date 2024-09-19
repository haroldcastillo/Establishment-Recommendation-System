// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Define firebase environment variables
const {
    FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID,
} = process.env;

// Define firebase config
const firebaseConfig = {
    apiKey: "AIzaSyCrf1u8nx8t2BCXR1grXi3vTkwF8qFlZ_U",
    authDomain: "esrs-ffeea.firebaseapp.com",
    projectId: "esrs-ffeea",
    storageBucket: "esrs-ffeea.appspot.com",
    messagingSenderId: "396131701822",
    appId: "1:396131701822:web:88fd02c56bf9e1c0efed6f",
    measurementId: "G-09514ECG33",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);
