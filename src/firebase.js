// import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
// import "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyB1GqsNN5LB1AxtOJfHoABAyqtBidP9ABM",
  authDomain: "fireform-61c3d.firebaseapp.com",
  projectId: "fireform-61c3d",
  storageBucket: "fireform-61c3d.appspot.com",
  messagingSenderId: "57650967733",
  appId: "1:57650967733:web:e1c4da07de2f3c537c3afc"
};

// const app = firebase.initializeApp(firebaseConfig);
// const db = app.firestore();

// export {app, db}

export const db = initializeApp(firebaseConfig);




