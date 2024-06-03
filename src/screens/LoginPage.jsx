import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import SignIn from "../components/SignInButton";

const LoginPage = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
      height="90vh"
      width="100vw"
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="flex-start"
        width="100%"
        height="0"
        mt={4}
        ml={4}
      >
        <img
          src={`${process.env.PUBLIC_URL}/logo.png`}
          alt="React Logo"
          width={120}
          style={{ marginRight: "10px" }}
        />
        <Typography variant="h2" component="h1">
          REFLECTIFY
        </Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexGrow={1}
        width="100%"
      >
        <Grid container>
          <Grid
            item
            xs={6}
            container
            alignItems="center"
            justifyContent="center"
          >
            <Typography
              variant="h4"
              component="h2"
              style={{ padding: "0 20px" }}
              margin={14}
              fontSize={56}
            >
              Upload your memories and interact with them in detail you have
              never before.
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            container
            alignItems="center"
            justifyContent="center"
          >
            <SignIn />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default LoginPage;
