import firebase from 'firebase';
import firestore from '../components/firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
 const firebaseConfig = {
  apiKey: "AIzaSyBimenTc4N-jXG9dqGy8jl92FGviWWzjwI",
  authDomain: "proyect-89351.firebaseapp.com",
  projectId: "proyect-89351",
  storageBucket: "proyect-89351.appspot.com",
  messagingSenderId: "913639406307",
  appId: "1:913639406307:web:1939069fad61e8d4fde3d6",
  measurementId: "G-DN8X5MF0YC"
};
firebase.initializeApp(firebaseConfig);

firebase.firestore();

export default firebase;