import React from 'react';
import { Container } from '@mui/material';
import ButtonComponent from '../components/ButtonComponent';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ExtensionIcon from '@mui/icons-material/Extension';
import TimelineIcon from '@mui/icons-material/Timeline';

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
      <ButtonComponent
        icon={<CloudUploadIcon sx={{ fontSize: 60 }} />}
        label='Upload Memories'
        onClick={handleUploadMemoriesClick}
      />
      <ButtonComponent
        icon={<ExtensionIcon sx={{ fontSize: 60 }} />}
        label="Let's Play"
        onClick={handleLetsPlayClick}
      />
      <ButtonComponent
        icon={<TimelineIcon sx={{ fontSize: 60 }} />}
        label='Timeline'
        onClick={handleTimelineClick}
      />
    </Container>
  );
}
