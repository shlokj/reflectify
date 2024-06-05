import React from 'react';
import { Container } from '@mui/material';
import Header from '../components/Header';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import RapidFireButtonComponents from '../components/RapidFireButtonComponents';
import RapidFireQuestionComponent from '../components/RapidFireQuestionComponent';

export default function RapidFireGame() {
  return (
    <Container>
      <Header isLoggedIn={true} userName='<username>' />
      <Box>
        <Grid container marginTop={10}>
          <Grid item xs={8}>
            <RapidFireQuestionComponent />
          </Grid>
          <Grid item xs={4}>
            <RapidFireButtonComponents />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
