import React from "react";
import { auth, provider, signInWithPopup } from "../firebase";
import { Button } from "@mui/material";
import { Google as GoogleIcon } from "@mui/icons-material";

const SignIn = () => {
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to sign in. Check the console for the error message.");
      });
  };

  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<GoogleIcon />}
      style={{ backgroundColor: "#4285F4", color: "#fff" }}
      onClick={signInWithGoogle}
    >
      Sign in with Google
    </Button>
  );
};

export default SignIn;
