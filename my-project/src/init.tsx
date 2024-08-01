import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBjyfDCck9h2yieCHiHt18LG8NAzivGk64",
    authDomain: "netflix-clone-22018.firebaseapp.com",
    projectId: "netflix-clone-22018",
    storageBucket: "netflix-clone-22018.appspot.com",
    messagingSenderId: "899935918771",
    appId: "1:899935918771:web:9f0db1d48fe7cdc1dfaec6",
    measurementId: "G-71J4GJ2W1W"
  };
   

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  export const auth = getAuth();