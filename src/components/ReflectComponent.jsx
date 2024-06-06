import React, { useState } from "react";
import { Box, Typography, Grid, TextField, CircularProgress, Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import DoneIcon from "@mui/icons-material/Done";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SmallButtonComponent from "./SmallButtonComponent";
import Stack from "@mui/material/Stack";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

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
  '&:active': {
    backgroundColor: '#2a4160',
  },
};

export default function ReflectComponent({ prompt, imageUrl, loading, onKeepJournaling }) {
  const [reflection, setReflection] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleDoneClick = async () => {
    try {
      await addDoc(collection(db, "reflections"), {
        text: reflection,
        timestamp: new Date(),
      });
      console.log("Reflection submitted successfully");
      setSubmitted(true);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleKeepJournalingClick = () => {
    setSubmitted(false);
    onKeepJournaling(reflection);
    setReflection("");
  };

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Paper
        sx={{
          flexGrow: 1,
          width: "100%",
          border: "1px solid #3C5C84",
          borderRadius: "8px",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            marginTop: "20px",
            color: "#3b5a82",
          }}
        >
          Let's Reflect
        </Typography>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          submitted ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <CheckCircleIcon sx={{ fontSize: 100, color: "#3b5a82" }} />
              <Typography
                variant="h4"
                sx={{
                  marginTop: "20px",
                  marginBottom: "20px",
                  color: "#3b5a82",
                  fontWeight: "bold",
                }}
              >
                Reflection Saved!
              </Typography>
              <Button
                variant="contained"
                onClick={handleKeepJournalingClick}
                sx={buttonStyle}
              >
                Keep Journaling
              </Button>
            </Box>
          ) : (
            <Grid
              container
              sx={{
                marginTop: "10px",
                paddingRight: "10px",
                paddingLeft: "10px",
                marginBottom: "10px",
              }}
              spacing={1}
            >
              <Grid
                item
                xs={6}
                md={5}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                <img
                  src={imageUrl || "https://images.unsplash.com/photo-1549388604-817d15aa0110"}
                  alt={"Reflection"}
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "8px",
                  }}
                />
              </Grid>
              <Grid item xs={6} md={7}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    marginBottom: "10px",
                    color: "#3b5a82",
                  }}
                >
                  {prompt}
                </Typography>
                <TextField
                  id="outlined-multiline-flexible"
                  label="Journal here..."
                  fullWidth
                  multiline
                  maxRows={15}
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                  sx={{ height: "375px" }}
                  InputProps={{
                    sx: {
                      height: "100%",
                      alignItems: "flex-start",
                    },
                  }}
                />
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ justifyContent: "center" }}
                >
                  <SmallButtonComponent
                    icon={<DoneIcon sx={{ fontSize: 40 }} />}
                    label="Done"
                    onClick={handleDoneClick}
                  />
                </Stack>
              </Grid>
            </Grid>
          )
        )}
      </Paper>
    </Box>
  );
}
