import React from 'react';
import { Container } from '@mui/material';
import MainButtonComponent from '../components/MainButtonComponent';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ExtensionIcon from '@mui/icons-material/Extension';
import TimelineIcon from '@mui/icons-material/Timeline';
import Header from '../components/Header';
import ReflectComponent from '../components/ReflectComponent';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

export default function HomePage() {
  const handleUploadMemoriesClick = () => {
    console.log('Upload Memories clicked');
  };

  const handleLetsPlayClick = () => {
    console.log("Let's Play clicked");
  };

  const handleTimelineClick = () => {
    console.log('Timeline clicked');
  };

  return (
    <Container>
      <Header isLoggedIn={true} userName='<username>' />
      <Box>
        <Grid container marginTop={10}>
          <Grid item xs={8}>
            <ReflectComponent />
          </Grid>
          <Grid item xs={4}>
            <MainButtonComponent
              icon={<CloudUploadIcon sx={{ fontSize: 60 }} />}
              label='Upload Memories'
              onClick={handleUploadMemoriesClick}
            />
            <MainButtonComponent
              icon={<ExtensionIcon sx={{ fontSize: 60 }} />}
              label="Let's Play"
              onClick={handleLetsPlayClick}
            />
            <MainButtonComponent
              icon={<TimelineIcon sx={{ fontSize: 60 }} />}
              label='Timeline'
              onClick={handleTimelineClick}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
