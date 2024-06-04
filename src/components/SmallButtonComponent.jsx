import React from 'react';
import { Box } from '@mui/material';

const buttonStyle = {
  backgroundColor: '#3b5a82',
  border: 'none',
  borderRadius: '15px',
  color: 'white',
  padding: '10px 20px',
  fontSize: '20px',
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
  width: '150px',
  height: '70px',
  margin: '10px 0',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const buttonContentStyle = {
  display: 'flex',
  alignItems: 'center',
};

const buttonLabelStyle = {
  marginLeft: '5px',
};

export default function SmallButtonComponent({ icon, label, onClick }) {
  return (
    <Box display='flex' justifyContent='center' margin='0px'>
      <button style={buttonStyle} onClick={onClick}>
        <div style={buttonContentStyle}>
          {icon}
          <span style={buttonLabelStyle}>{label}</span>
        </div>
      </button>
    </Box>
  );
}
