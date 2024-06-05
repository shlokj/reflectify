import React from "react";
import { auth, provider, signInWithPopup } from "../firebase";
import { Button, Box } from "@mui/material";
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
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#4285F4",
        color: "#fff",
        borderRadius: "50px",
        padding: "20px 60px",
        fontSize: "24px",
        textTransform: "none",
        "&:hover": {
          backgroundColor: "#357ae8",
        },
      }}
      onClick={signInWithGoogle}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <GoogleIcon
          sx={{ fontSize: "48px", marginRight: "16px", marginLeft: "-24px" }}
        />
        Sign in with Google
      </Box>
    </Button>
  );
};

export default SignIn;
