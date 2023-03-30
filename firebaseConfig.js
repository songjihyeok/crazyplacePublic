import { initializeApp } from "firebase/app";
import "firebase/firestore";
import { getFirestore } from "firebase/firestore/lite";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD5q-w_DLDBRhL5Nn6PX8XaZLsKHwdiwZg",
  authDomain: "nasogong.firebaseapp.com",
  projectId: "nasogong",
  storageBucket: "nasogong.appspot.com",
  messagingSenderId: "336098615333",
  appId: "1:336098615333:web:447db9bc53a108ea321fcc",
  measurementId: "G-Q7FHMXF64S",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export {
  app,
  db,
  storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
};
