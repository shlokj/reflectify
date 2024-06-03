import React from 'react';
import { Box, Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

export default function Header({ isLoggedIn, userName }) {
  return (
    <Box
      display='flex'
      flexDirection='column'
      justifyContent='space-between'
      alignItems='center'
      width='100vw'
      position='fixed'
      top={0}
      left={0}
      zIndex={1000}
      bgcolor='#E5F1F7'
      p={1}
    >
      <Box
        display='flex'
        alignItems='center'
        justifyContent='space-between'
        width='100%'
        padding='10px 200px 0px 200px'
      >
        <Box display='flex' alignItems='center' ml={2}>
          <img
            src={`${process.env.PUBLIC_URL}/logo.png`}
            alt='React Logo'
            width={100}
            style={{ marginRight: '10px' }}
          />
          <Typography
            variant='h2'
            component='h1'
            sx={{ fontWeight: 'bold', letterSpacing: '0.1em' }}
          >
            REFLECTIFY
          </Typography>
        </Box>
        <Box display='flex' alignItems='center' mr={6}>
          {isLoggedIn ? (
            <>
              <Typography
                variant='h5'
                component='p'
                sx={{ fontWeight: 'bold', marginRight: '10px' }}
              >
                Welcome, {userName}
              </Typography>
              <SettingsIcon sx={{ fontSize: 60 }} />
            </>
          ) : (
            <Box
              display='flex'
              flexDirection='column'
              alignItems='flex-end'
              sx={{ textAlign: 'right' }}
            >
              <Typography
                variant='h5'
                component='p'
                sx={{ fontWeight: 'bold' }}
              >
                REFLECT
              </Typography>
              <Typography
                variant='h5'
                component='p'
                sx={{ fontWeight: 'bold' }}
              >
                ENGAGE
              </Typography>
              <Typography
                variant='h5'
                component='p'
                sx={{ fontWeight: 'bold' }}
              >
                ENHANCE
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
