import React from "react";
import { Box, Stack } from "@mui/material";
import TimerIcon from "@mui/icons-material/Timer";
import StarIcon from "@mui/icons-material/Star";

const buttonStyle = {
  backgroundColor: "#3b5a82",
  border: "none",
  borderRadius: "15px",
  color: "white",
  padding: "20px 40px",
  fontSize: "calc(0.8em + 1vw)",
  fontWeight: "bold",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  transition: "background-color 0.3s",
  width: "100%",
  maxWidth: "300px",
  height: "120px",
  margin: "10px auto",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};

const buttonContentStyle = {
  display: "flex",
  alignItems: "center",
};

const buttonLabelStyle = {
  marginLeft: "15px",
};

export function TimerComponent({ timeLeft }) {
  const timerButtonLabelStyle = { marginLeft: "10px" };
  return (
    <Box display="flex" justifyContent="center" margin="10px">
      <button style={buttonStyle} disabled>
        <div style={buttonContentStyle}>
          <TimerIcon sx={{ fontSize: 60 }} />
          <span style={timerButtonLabelStyle}>
            {timeLeft > 0 ? `${timeLeft} sec left` : "Time's Up"}
          </span>
        </div>
      </button>
    </Box>
  );
}

export function ScoreComponent({ score, totalQuestions }) {
  return (
    <Box display="flex" justifyContent="center" margin="10px">
      <button style={buttonStyle}>
        <div style={buttonContentStyle}>
          <StarIcon sx={{ fontSize: 60 }} />
          <span style={buttonLabelStyle}>{score}</span>
        </div>
      </button>
    </Box>
  );
}

export default function RapidFireButtonComponents({
  timeLeft,
  score,
  totalQuestions,
}) {
  return (
    <Box display="flex" justifyContent="center" margin="10px">
      <Stack direction="column" spacing={2} sx={{ justifyContent: "center" }}>
        <TimerComponent timeLeft={timeLeft} />
        <ScoreComponent score={score} totalQuestions={totalQuestions} />
      </Stack>
    </Box>
  );
}
