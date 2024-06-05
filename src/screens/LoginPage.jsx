import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import SignIn from "../components/SignInButton";
import Header from "../components/Header";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export default function LoginPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/home");
      }
    });

    return () => unsubscribe();
  }, [navigate]);
  return (
    <Container>
      <Header isLoggedIn={false} />

      <Grid container>
        <Grid item xs={6} container alignItems="center" justifyContent="center">
          <Typography
            variant="h4"
            component="h2"
            style={{ padding: "0 20px" }}
            fontSize={56}
          >
            Upload your memories and interact with them in detail you have never
            before.
          </Typography>
        </Grid>
        <Grid item xs={6} container alignItems="center" justifyContent="center">
          <SignIn />
        </Grid>
      </Grid>
    </Container>
  );
}
