import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';

const paperStyle = {
  flexGrow: 1,
  width: '100%',
  border: '1px solid #3C5C84',
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
};

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
  marginLeft: '12px',
};

export function AnswerOptionComponent({ isTimeUp }) {
  const disabledButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#B0BEC5',
    cursor: 'not-allowed',
  };
  return (
    <Box display='flex' justifyContent='center' margin='10px'>
      <button
        style={isTimeUp ? disabledButtonStyle : buttonStyle}
        disabled={isTimeUp}
      >
        <div style={buttonContentStyle}>
          <span style={buttonLabelStyle}>{'value'}</span>
          {/* replace value with option value */}
        </div>
      </button>
    </Box>
  );
}

export default function RapidFireQuestionComponent({ isTimeUp }) {
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Paper
        sx={{
          ...paperStyle,
          pointerEvents: isTimeUp ? 'none' : 'auto',
          opacity: isTimeUp ? 0.5 : 1,
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant='h5'
            gutterBottom
            sx={{
              fontWeight: 'bold',
              textAlign: 'center',
              marginTop: '40px',
              color: '#3b5a82',
            }}
          >
            Question #
          </Typography>
          <Typography
            variant='h4'
            gutterBottom
            sx={{
              fontWeight: 'bold',
              textAlign: 'center',
              color: '#3b5a82',
              margin: '20px',
            }}
          >
            question that we will ask question that we will ask question that we
            will ask question that we will ask question that we will ask
          </Typography>
        </Box>
        <Grid
          container
          rowSpacing={1}
          sx={{
            marginBottom: '20px',
          }}
        >
          <Grid item xs={6}>
            <AnswerOptionComponent isTimeUp={isTimeUp} />
          </Grid>
          <Grid item xs={6}>
            <AnswerOptionComponent isTimeUp={isTimeUp} />
          </Grid>
          <Grid item xs={6}>
            <AnswerOptionComponent isTimeUp={isTimeUp} />
          </Grid>
          <Grid item xs={6}>
            <AnswerOptionComponent isTimeUp={isTimeUp} />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
