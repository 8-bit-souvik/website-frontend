import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBZTf58-SKMNWfmiFEET1IV0Rk_8UXyFhc",
  authDomain: "dezenix-webapp.firebaseapp.com",
  projectId: "dezenix-webapp",
  storageBucket: "dezenix-webapp.appspot.com",
  messagingSenderId: "1076562701618",
  appId: "1:1076562701618:web:1f7214e167410742ccbb2b",
};

// init firebase
initializeApp(firebaseConfig);

// init services
const db = getFirestore();

// collection ref
export const ideaRef = collection(db, "ideas");


