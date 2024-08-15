// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAU_0RNd0RaOlWrg1t-84BP2QjajN3JVM0",
  authDomain: "flashcardsaas-42cb8.firebaseapp.com",
  projectId: "flashcardsaas-42cb8",
  storageBucket: "flashcardsaas-42cb8.appspot.com",
  messagingSenderId: "526443610950",
  appId: "1:526443610950:web:6d2729d538b10c7f025b47",
  measurementId: "G-YMT4FZG9HB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };
