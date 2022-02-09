import { initializeApp } from 'firebase/app';
import { getFirestore, collection } from 'firebase/firestore';
import firebaseConfig from './firebase_config.json';
import { getStorage } from 'firebase/storage';

// init firebase
const firebaseApp = initializeApp(firebaseConfig);

// init services
export const db = getFirestore();

// collection ref
export const ideaRef = collection(db, 'ideas');

export const storage = getStorage(firebaseApp);
