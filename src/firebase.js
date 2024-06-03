import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAnTl3LAnngDpO_G_fXGm04fFfFi17307s",
  authDomain: "reflectify-188.firebaseapp.com",
  projectId: "reflectify-188",
  storageBucket: "reflectify-188.appspot.com",
  messagingSenderId: "248068447036",
  appId: "1:248068447036:web:5a8e51fabac4538ed25c39",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
