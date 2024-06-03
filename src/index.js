import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { BrowserRouter } from "react-router-dom";

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

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();

export { auth, provider, signInWithPopup };
