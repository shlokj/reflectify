import React from 'react';
import { Box } from '@mui/material';
import Paper from '@mui/material/Paper';

export default function ReflectComponent() {
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Paper
        sx={{
          flexGrow: 1,
          width: '100%',
          border: '1px solid #3C5C84',
          borderRadius: '8px',
        }}
      />
    </Box>
  );
}
