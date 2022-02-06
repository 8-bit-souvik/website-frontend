import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import firebaseConfig from './firebase_config.json'

// init firebase
initializeApp(firebaseConfig);

// init services
export const db = getFirestore();

// collection ref
export const ideaRef = collection(db, 'ideas');
