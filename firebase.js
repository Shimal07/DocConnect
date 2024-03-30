import { initializeApp } from "firebase/app";
import { initializeAuth, getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBRyNVu2pYWovFXBtnPAL6ic1LjVc6-mjs",
    authDomain: "docconnect-e2e11.firebaseapp.com",
    projectId: "docconnect-e2e11",
    storageBucket: "docconnect-e2e11.appspot.com",
    messagingSenderId: "832275680033",
    appId: "1:832275680033:web:17ec043c5857e217280c60"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app);

export { auth };
