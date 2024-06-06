import React, { useState, useEffect } from 'react';
import { Container, CircularProgress, Box, Grid, Typography, Button } from '@mui/material';
import Header from '../components/Header';
import RapidFireButtonComponents from '../components/RapidFireButtonComponents';
import RapidFireQuestionComponent from '../components/RapidFireQuestionComponent';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: 'key',
  dangerouslyAllowBrowser: true,
});

const generateTriviaQuestions = async (prompts) => {
  const questions = [];
  const limitedPrompts = prompts.slice(0, 5);

  for (const prompt of limitedPrompts) {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: `Create 3 trivia questions in JSON format with the following structure:
            [
              {
                "question": "string",
                "options": ["string", "string", "string", "string"],
                "correct_option_index": "integer"
              }
            ]
            based on the following prompt: "${prompt.text}". Don't output anything else like Sure, here is ... and don't output unnecessary punctuation.`,
          },
        ],
      });

      const questionData = JSON.parse(response.choices[0].message.content);
      console.log('Parsed OpenAI response:', questionData); // Log the parsed response

      questionData.forEach(q => {
        if (
          q &&
          q.question &&
          q.options &&
          q.options.length === 4 &&
          typeof q.correct_option_index === "number"
        ) {
          questions.push({
            question: q.question,
            options: q.options,
            correctOption: q.correct_option_index,
          });
        } else {
          console.warn('Skipped invalid question:', q); // Log invalid questions
        }
      });
    } catch (error) {
      console.error('Error generating questions:', error);
    }
  }

  return questions.slice(0, 10); // Return up to 10 questions
};

export default function RapidFireGame() {
  const [documents, setDocuments] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [loading, setLoading] = useState(true);
  const [timerStarted, setTimerStarted] = useState(false);

  useEffect(() => {
    if (timerStarted && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setIsTimeUp(true);
    }
  }, [timeLeft, timerStarted]);

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'reflections'));
        const docsArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log('Fetched documents:', docsArray); // Log fetched documents for debugging
        setDocuments(docsArray);

        if (docsArray.length > 0) {
          const triviaQuestions = await generateTriviaQuestions(docsArray);
          console.log('Generated questions:', triviaQuestions); // Log generated questions for debugging
          setQuestions(triviaQuestions);
        }
        setLoading(false);
        setTimerStarted(true); // Start the timer once questions are loaded
      } catch (e) {
        console.error('Error fetching collection: ', e);
        setLoading(false);
      }
    };
    fetchCollection();
  }, []);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsTimeUp(true);
    }
  };

  const handleAnswerSelection = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handlePlayAgain = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setTimeLeft(30);
    setIsTimeUp(false);
    setTimerStarted(true);
  };

  return (
    <Container>
      <Header isLoggedIn={true} userName='<username>' />
      {loading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          {isTimeUp ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
              }}
            >
              <Typography variant="h3" gutterBottom>
                {currentQuestionIndex === questions.length ? 'Game Over!' : "Time's Up!"}
              </Typography>
              <Typography variant="h5" gutterBottom>
                Your Score: {score} / {questions.length}
              </Typography>
              <Button
                variant="contained"
                sx={{ ...buttonStyle, backgroundColor: '#3b5a82', '&:active': { backgroundColor: '#2a4160' } }}
                onClick={handlePlayAgain}
              >
                Play Again
              </Button>
            </Box>
          ) : (
            <Grid container marginTop={10}>
              <Grid item xs={8}>
                {questions.length > 0 && (
                  <RapidFireQuestionComponent
                    question={questions[currentQuestionIndex]}
                    questionNumber={currentQuestionIndex + 1}
                    onAnswerSelection={handleAnswerSelection}
                    onNextQuestion={handleNextQuestion}
                  />
                )}
              </Grid>
              <Grid item xs={4} sx={{ alignContent: 'center' }}>
                <RapidFireButtonComponents
                  timeLeft={timeLeft}
                  score={score}
                  totalQuestions={questions.length}
                />
              </Grid>
            </Grid>
          )}
        </Box>
      )}
    </Container>
  );
}

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
};

