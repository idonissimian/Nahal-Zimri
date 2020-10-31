import  firebase from "firebase";
import "firebase/firestore"
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBfdCnu5gHDQLjJGO9zB_nTrB-YJrUk1Nk",
    authDomain: "nahal-zimri.firebaseapp.com",
    databaseURL: "https://nahal-zimri.firebaseio.com",
    projectId: "nahal-zimri",
    storageBucket: "nahal-zimri.appspot.com",
    messagingSenderId: "123623273331",
    appId: "1:123623273331:web:7126d69a1dcfc462da8b06"
  };
  
  firebase.initializeApp(firebaseConfig);

export default firebase;
export const f = firebase;
export const db = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();