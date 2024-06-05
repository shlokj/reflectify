import React, { useState } from "react";
import { Container } from "@mui/material";
import Header from "../components/Header";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import RapidFireButtonComponents from "../components/RapidFireButtonComponents";
import RapidFireQuestionComponent from "../components/RapidFireQuestionComponent";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function RapidFireGame() {
  const [documents, setDocuments] = useState([]);

  const handleFetchCollection = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "reflections"));
      const docsArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDocuments(docsArray);
      console.log("Collection fetched successfully");
      console.log(docsArray);
    } catch (e) {
      console.error("Error fetching collection: ", e);
    }
  };

  return (
    <Container>
      <Header isLoggedIn={true} userName="<username>" />
      <Box onClick={handleFetchCollection}>
        {/* TODO: remove the onClick, this is only to test  */}
        <Grid container marginTop={10}>
          <Grid item xs={8}>
            <RapidFireQuestionComponent />
          </Grid>
          <Grid item xs={4}>
            <RapidFireButtonComponents />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
