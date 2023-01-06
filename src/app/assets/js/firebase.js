// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvFfacUfF34vRkddcwrMIOcaLSdTSSYDM",
  authDomain: "raindrop-5f4a6.firebaseapp.com",
  projectId: "raindrop-5f4a6",
  storageBucket: "raindrop-5f4a6.appspot.com",
  messagingSenderId: "1065759523751",
  appId: "1:1065759523751:web:aea0bf8038b22ea52aec82",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
