// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

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

// Initialize Firebase only in the client-side environment
let analytics;
if (typeof window !== "undefined") {
    import("firebase/analytics").then(({ getAnalytics }) => {
        analytics = getAnalytics(app);
    });
}

// Export only the necessary services
export const storage = getStorage(app);
export { analytics };
