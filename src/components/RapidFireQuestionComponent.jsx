import React, { useState } from 'react';
import { Box, Typography, Grid, Paper, Button } from '@mui/material';

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
  padding: '10px',
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
  width: '100%',
  maxWidth: '300px',
  height: '80px',
  margin: '10px auto',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
  fontSize: '24px',
};

const buttonContentStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  height: '100%',
};

const buttonLabelStyle = {
  marginLeft: '12px',
  fontSize: 'calc(0.5em + 0.5vw)', // Adjust font size to fit text
  maxHeight: '100%', // Limit the maximum height of the text
  overflow: 'hidden', // Hide overflow text
  textOverflow: 'ellipsis', // Add ellipsis for overflow text
  lineHeight: '1em', // Adjust line height for better readability
  display: 'block',
  wordWrap: 'break-word',
};

export function AnswerOptionComponent({
  option,
  isCorrect,
  onClick,
  selected,
}) {
  const selectedButtonStyle = {
    ...buttonStyle,
    backgroundColor: selected ? (isCorrect ? '#4caf50' : '#f44336') : '#3b5a82',
  };
  return (
    <Box display='flex' justifyContent='center' margin='10px'>
      <button style={selectedButtonStyle} onClick={onClick}>
        <div style={buttonContentStyle}>
          <span style={buttonLabelStyle}>{option}</span>
        </div>
      </button>
    </Box>
  );
}

export default function RapidFireQuestionComponent({
  question,
  questionNumber,
  onAnswerSelection,
  onNextQuestion,
}) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (isCorrect, index) => {
    setSelectedOption(index);
    onAnswerSelection(isCorrect);
  };

  const handleNextClick = () => {
    setSelectedOption(null);
    onNextQuestion();
  };

  if (!question || !question.question) {
    return null; // Ensure we handle the case where question is undefined
  }

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Paper
        sx={{
          ...paperStyle,
          pointerEvents: 'auto',
          opacity: 1,
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
            Question #{questionNumber}
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
            {question.question}
          </Typography>
        </Box>
        <Grid
          container
          rowSpacing={1}
          sx={{
            marginBottom: '20px',
          }}
        >
          {question.options.map((option, index) => (
            <Grid item xs={6} key={index}>
              <AnswerOptionComponent
                option={option}
                isCorrect={index === question.correctOption}
                onClick={() =>
                  handleOptionClick(index === question.correctOption, index)
                }
                selected={selectedOption === index}
                sx={{
                  fontSize: '20',
                }}
              />
            </Grid>
          ))}
        </Grid>
        {selectedOption !== null && (
          <Typography
            variant='h6'
            gutterBottom
            sx={{
              fontWeight: 'bold',
              textAlign: 'center',
              marginTop: '10px',
              color:
                selectedOption === question.correctOption ? 'green' : 'red',
            }}
          >
            {selectedOption === question.correctOption
              ? 'Correct!'
              : `Incorrect! The correct answer is ${
                  question.options[question.correctOption]
                }`}
          </Typography>
        )}
        {selectedOption !== null && (
          <Box display='flex' justifyContent='center' marginTop='20px'>
            <Button
              variant='contained'
              sx={{
                ...buttonStyle,
                backgroundColor: '#3b5a82',
                '&:active': { backgroundColor: '#2a4160' },
              }}
              onClick={handleNextClick}
            >
              Next
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
}
