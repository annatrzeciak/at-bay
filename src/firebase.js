import { firebase } from '@firebase/app';
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: "at-bay.firebaseapp.com",
  projectId: "at-bay",
  storageBucket: "at-bay.appspot.com",
  messagingSenderId: "598103735422",
  appId: "1:598103735422:web:a8110137847f370aeb6c2f",
  measurementId: "G-T5BSYW1MN3"
};
firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore();
const auth = firebase.auth();

// collection references
const usersCollection = db.collection("users");
const productsCollection = db.collection("products");

// export utils/refs
export { db, auth, usersCollection, productsCollection };
