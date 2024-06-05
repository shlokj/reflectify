import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import Header from '../components/Header';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import RapidFireButtonComponents from '../components/RapidFireButtonComponents';
import RapidFireQuestionComponent from '../components/RapidFireQuestionComponent';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export default function RapidFireGame() {
  const [documents, setDocuments] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isTimeUp, setIsTimeUp] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setIsTimeUp(true);
    }
  }, [timeLeft]);

  const handleFetchCollection = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'reflections'));
      const docsArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDocuments(docsArray);
      console.log('Collection fetched successfully');
      console.log(docsArray);
    } catch (e) {
      console.error('Error fetching collection: ', e);
    }
  };

  return (
    <Container>
      <Header isLoggedIn={true} userName='<username>' />
      <Box onClick={handleFetchCollection}>
        {/* TODO: remove the onClick, this is only to test */}
        <Grid container marginTop={10}>
          <Grid
            item
            xs={8}
            sx={{
              pointerEvents: isTimeUp ? 'none' : 'auto',
              opacity: isTimeUp ? 0.5 : 1,
            }}
          >
            <RapidFireQuestionComponent isTimeUp={isTimeUp} />
          </Grid>
          <Grid item xs={4} sx={{ alignContent: 'center' }}>
            <RapidFireButtonComponents
              timeLeft={timeLeft}
              isTimeUp={isTimeUp}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
