import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyCN0l-BU2LhnHqwJOLHj9M0nwRBYbNVs3o",
  authDomain: "momento-51bf7.firebaseapp.com",
  projectId: "momento-51bf7",
  storageBucket: "momento-51bf7.appspot.com",
  messagingSenderId: "314197454622",
  appId: "1:314197454622:web:57e3299977643c4c1a630f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
