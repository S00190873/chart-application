// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCVAW8ux0q32ehUGQRBUQ8UupI19gNsdjE",
  authDomain: "project400-4e51b.firebaseapp.com",
  projectId: "project400-4e51b",
  storageBucket: "project400-4e51b.appspot.com",
  messagingSenderId: "656608562494",
  appId: "1:656608562494:web:2217e28774dab2a866b06f",
  measurementId: "G-TL1NFQJ7QH"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
