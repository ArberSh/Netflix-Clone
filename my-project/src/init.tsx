import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBjyfDCck9h2yieCHiHt18LG8NAzivGk64",
    authDomain: "netflix-clone-22018.firebaseapp.com",
    projectId: "netflix-clone-22018",
    storageBucket: "netflix-clone-22018.appspot.com",
    messagingSenderId: "899935918771",
    appId: "1:899935918771:web:9f0db1d48fe7cdc1dfaec6",
    measurementId: "G-71J4GJ2W1W"
  };

  async function Test(){
    try {
      const docRef = await addDoc(collection(db, "users"), {
        first: "Alan",
        middle: "Mathison",
        last: "Turing",
        born: 1912
      });
    
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  Test()

  
  
  const app = initializeApp(firebaseConfig);
  export const auth = getAuth();
  export const db = getFirestore(app);