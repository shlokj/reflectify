import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import TimerIcon from '@mui/icons-material/Timer';
import StarIcon from '@mui/icons-material/Star';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import LockIcon from '@mui/icons-material/Lock';

const buttonStyle = {
  backgroundColor: '#3b5a82',
  border: 'none',
  borderRadius: '15px',
  color: 'white',
  padding: '20px 40px',
  fontSize: '30px',
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
  width: '100%',
  maxWidth: '300px',
  height: '120px',
  margin: '10px auto',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const buttonContentStyle = {
  display: 'flex',
  alignItems: 'center',
};

const buttonLabelStyle = {
  marginLeft: '15px',
};

export function TimerComponent() {
  return (
    <Box display='flex' justifyContent='center' margin='10px'>
      <button style={buttonStyle}>
        <div style={buttonContentStyle}>
          <TimerIcon sx={{ fontSize: 60 }} />
          <span style={buttonLabelStyle}>{'xyz left'}</span>
          {/* replace xyz with timer count */}
        </div>
      </button>
    </Box>
  );
}

export function ScoreComponent() {
  return (
    <Box display='flex' justifyContent='center' margin='10px'>
      <button style={buttonStyle}>
        <div style={buttonContentStyle}>
          <StarIcon sx={{ fontSize: 60 }} />
          <span style={buttonLabelStyle}>{' x / y'}</span>
          {/* replace x/y with score count */}
        </div>
      </button>
    </Box>
  );
}

export function SkipComponent() {
  const skipButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#AA6F6F',
  };
  return (
    <Box display='flex' justifyContent='center' margin='10px'>
      <button style={skipButtonStyle}>
        <div style={buttonContentStyle}>
          <SkipNextIcon sx={{ fontSize: 60 }} />
          <span style={buttonLabelStyle}>{'SKIP'}</span>
        </div>
      </button>
    </Box>
  );
}
export function HintComponent() {
  const hintButtonStyle = {
    ...buttonStyle,
    padding: '20px',
  };
  return (
    <Box display='flex' justifyContent='center' margin='10px'>
      <button style={hintButtonStyle}>
        <div style={buttonContentStyle}>
          <Stack
            direction='column'
            sx={{ justifyContent: 'center', marginRight: '20px' }}
          >
            <Typography
              sx={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: '20px',
                paddingTop: '3px',
              }}
            >
              Hints Used:
            </Typography>
            <Typography
              sx={{ color: 'white', fontWeight: 'bold', fontSize: '30px' }}
            >
              1/3
            </Typography>
          </Stack>
          <Stack
            direction='column'
            sx={{ justifyContent: 'center', alignItems: 'center' }}
          >
            <Typography
              sx={{ color: 'white', fontWeight: 'bold', fontSize: '20px' }}
            >
              Unlock Hint:
            </Typography>
            <LockIcon sx={{ color: 'white', fontSize: 40 }} />
          </Stack>
        </div>
      </button>
    </Box>
  );
}

export default function RapidFireButtonComponents() {
  return (
    <Box display='flex' justifyContent='center' margin='10px'>
      <Stack direction='column' spacing={2} sx={{ justifyContent: 'center' }}>
        <TimerComponent />
        <ScoreComponent />
        <SkipComponent />
        <HintComponent />
      </Stack>
    </Box>
  );
}
