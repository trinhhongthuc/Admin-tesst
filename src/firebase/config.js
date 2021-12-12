// import firebase from "@firebase/app";
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCVh1qCKdWxwbCX8J_bBpliEIhxdhx4NOM",
  authDomain: "tmdt-app.firebaseapp.com",
  projectId: "tmdt-app",
  storageBucket: "tmdt-app.appspot.com",
  messagingSenderId: "1069647556411",
  appId: "1:1069647556411:web:241352457f8b4e46e4911e",
  measurementId: "G-HEL6GGVTMF",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

if (window.location.hostname === "localhost") {
  // auth.useEmulator("http://localhost:9099");
  // db.useEmulator("localhost", "8080");
}

export { db, auth };
export default firebase;
