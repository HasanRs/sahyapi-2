import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
  getDoc,
  addDoc,
  orderBy,
  query,
  where,
  limitToLast,
  limit,
} from "firebase/firestore";
import {
  uploadBytes,
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDJOIlbSR_YOiKSPOKSdaVsv8uiJGBBpo0",
  authDomain: "atamep-3e0d3.firebaseapp.com",
  databaseURL: "https://atamep-3e0d3-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "atamep-3e0d3",
  storageBucket: "atamep-3e0d3.appspot.com",
  messagingSenderId: "590527431283",
  appId: "1:590527431283:web:43218018a86500a8dd2006"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const firestore = getFirestore(app);

export {
  firestore,
  collection,
  getDocs,
  getDoc,
  addDoc,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  uploadBytes,
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  orderBy,
  query,
  where,
  deleteObject,
};
