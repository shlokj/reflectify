import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import SignIn from '../components/SignInButton';
import Header from '../components/Header';

export default function LoginPage() {
  return (
    <Container>
      <Header isLoggedIn={false} />

      <Grid container>
        <Grid item xs={6} container alignItems='center' justifyContent='center'>
          <Typography
            variant='h4'
            component='h2'
            style={{ padding: '0 20px' }}
            fontSize={56}
          >
            Upload your memories and interact with them in detail you have never
            before.
          </Typography>
        </Grid>
        <Grid item xs={6} container alignItems='center' justifyContent='center'>
          <SignIn />
        </Grid>
      </Grid>
    </Container>
  );
}
