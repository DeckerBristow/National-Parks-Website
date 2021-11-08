// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTWEP7-1MIjfwWnNxZ8KAqKoY4-o2hmMg",
  authDomain: "national-park-app-c77a7.firebaseapp.com",
  projectId: "national-park-app-c77a7",
  storageBucket: "national-park-app-c77a7.appspot.com",
  messagingSenderId: "209699690315",
  appId: "1:209699690315:web:c9bbf37ffdcb85f8937ace"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

let firestore = getFirestore(app);

export default firestore;