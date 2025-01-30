// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "itpm-project-31d78.firebaseapp.com",
  projectId: "itpm-project-31d78",
  storageBucket: "itpm-project-31d78.appspot.com",
  messagingSenderId: "547870392980",
  appId: "1:547870392980:web:da4289752794572e006a81"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
