import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyA3gqM805AGplnqiI1BVS4HHUI-QtQdaN0",
  authDomain: "comic-sans-4e442.firebaseapp.com",
  projectId: "comic-sans-4e442",
  storageBucket: "comic-sans-4e442.appspot.com",
  messagingSenderId: "558226063859",
  appId: "1:558226063859:web:f3dc498f3408691b605286",
  measurementId: "G-YHBBEMLH1E"
}

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;