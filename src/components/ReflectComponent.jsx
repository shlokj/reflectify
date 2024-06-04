import React from 'react';
import { Box, Typography, Grid, TextField } from '@mui/material';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import SmallButtonComponent from './SmallButtonComponent';
import Stack from '@mui/material/Stack';

export default function ReflectComponent() {
  const handleEditClick = () => {
    console.log('Edit your reflection');
  };

  const handleDoneClick = () => {
    console.log('Submit your reflection');
  };
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Paper
        sx={{
          flexGrow: 1,
          width: '100%',
          border: '1px solid #3C5C84',
          borderRadius: '8px',
        }}
      >
        <Typography
          variant='h4'
          gutterBottom
          sx={{
            fontWeight: 'bold',
            textAlign: 'center',
            marginTop: '20px',
            color: '#3b5a82',
          }}
        >
          Let's Reflect
        </Typography>
        <Grid
          container
          sx={{
            marginTop: '10px',
            paddingRight: '10px',
            paddingLeft: '10px',
            marginBottom: '10px',
          }}
          spacing={1}
        >
          <Grid
            item
            xs={6}
            md={5}
            sx={{
              //   border: '1px solid black',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            <img
              src={'https://images.unsplash.com/photo-1549388604-817d15aa0110'}
              alt={'bed'}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '8px',
              }}
            />
          </Grid>
          <Grid item xs={6} md={7}>
            <TextField
              id='outlined-multiline-flexible'
              label='Tell us about this day and moment.'
              fullWidth
              multiline
              maxRows={15}
              sx={{ height: '375px' }}
              InputProps={{
                sx: {
                  height: '100%',
                  alignItems: 'flex-start',
                },
              }}
            />
            <Stack
              direction='row'
              spacing={2}
              sx={{ justifyContent: 'center' }}
            >
              <SmallButtonComponent
                icon={<EditIcon sx={{ fontSize: 40 }} />}
                label='Edit'
                onClick={handleEditClick}
              />
              <SmallButtonComponent
                icon={<DoneIcon sx={{ fontSize: 40 }} />}
                label='Done'
                onClick={handleDoneClick}
              />
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
