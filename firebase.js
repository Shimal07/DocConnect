import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore,collection, addDoc,getDocs,getDoc, doc, deleteDoc,updateDoc,onSnapshot,where,query } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBRyNVu2pYWovFXBtnPAL6ic1LjVc6-mjs",
    authDomain: "docconnect-e2e11.firebaseapp.com",
    projectId: "docconnect-e2e11",
    storageBucket: "docconnect-e2e11.appspot.com",
    messagingSenderId: "832275680033",
    appId: "1:832275680033:web:17ec043c5857e217280c60"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export {app,auth,db,collection,addDoc,getDocs, doc, deleteDoc,updateDoc,onSnapshot,getDoc,where,query};

