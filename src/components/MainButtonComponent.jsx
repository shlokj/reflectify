import React from 'react';
import { Box } from '@mui/material';

const buttonStyle = (disabled) => ({
  backgroundColor: disabled ? '#c0c0c0' : '#3b5a82',
  border: 'none',
  borderRadius: '100px',
  color: 'white',
  padding: '20px 40px',
  fontSize: '30px',
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: disabled ? 'not-allowed' : 'pointer',
  transition: 'background-color 0.3s',
  width: '100%',
  maxWidth: '300px',
  height: '150px',
  margin: '10px auto',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

const buttonContentStyle = {
  display: 'flex',
  alignItems: 'center',
};

const buttonLabelStyle = {
  marginLeft: '15px',
};

export default function MainButtonComponent({
  icon,
  label,
  onClick,
  disabled,
}) {
  return (
    <Box display='flex' justifyContent='center' margin='10px'>
      <button
        style={buttonStyle(disabled)}
        onClick={!disabled ? onClick : undefined}
        disabled={disabled}
      >
        <div style={buttonContentStyle}>
          {icon}
          <span style={buttonLabelStyle}>{label}</span>
        </div>
      </button>
    </Box>
  );
}
