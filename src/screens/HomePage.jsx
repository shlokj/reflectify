import React, { useState } from "react";
import { Container, CircularProgress, Box } from "@mui/material";
import MainButtonComponent from "../components/MainButtonComponent";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ExtensionIcon from "@mui/icons-material/Extension";
import TimelineIcon from "@mui/icons-material/Timeline";
import Header from "../components/Header";
import ReflectComponent from "../components/ReflectComponent";
import Grid from "@mui/material/Grid";
import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function HomePage() {
  const [isBucketEmpty, setIsBucketEmpty] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [urls, setUrls] = useState([]);

  const handleFileChange = async (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      setUploading(true);

      const uploadPromises = Array.from(files).map((file) => {
        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        return new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setProgress(progress);
            },
            (error) => {
              console.error(error);
              reject(error);
            },
            async () => {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              resolve(downloadURL);
            }
          );
        });
      });

      try {
        const downloadURLs = await Promise.all(uploadPromises);
        setUrls((prevUrls) => [...prevUrls, ...downloadURLs]);
        setIsBucketEmpty(false);
        setUploading(false);
      } catch (error) {
        console.error("Error uploading files:", error);
        setUploading(false);
      }
    }
  };

  const handleUploadMemoriesClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleLetsPlayClick = () => {
    console.log("Let's Play clicked");
  };

  const handleTimelineClick = () => {
    console.log("Timeline clicked");
  };

  return (
    <Container>
      <Header isLoggedIn={true} userName="<username>" />
      <Box>
        <input
          id="fileInput"
          type="file"
          multiple
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <Grid container marginTop={10}>
          <Grid
            item
            xs={8}
            sx={{
              pointerEvents: isBucketEmpty ? "none" : "auto",
              opacity: isBucketEmpty ? 0.5 : 1,
            }}
          >
            <ReflectComponent />
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {uploading ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 100,
                  }}
                >
                  <CircularProgress
                    variant="determinate"
                    value={progress}
                    size={60}
                  />
                </Box>
              ) : (
                <MainButtonComponent
                  icon={<CloudUploadIcon sx={{ fontSize: 60 }} />}
                  label={
                    isBucketEmpty
                      ? "Upload Memories To Start"
                      : "Upload Memories"
                  }
                  onClick={handleUploadMemoriesClick}
                />
              )}
              <MainButtonComponent
                icon={<ExtensionIcon sx={{ fontSize: 60 }} />}
                label="Let's Play"
                onClick={handleLetsPlayClick}
                disabled={isBucketEmpty}
              />
              <MainButtonComponent
                icon={<TimelineIcon sx={{ fontSize: 60 }} />}
                label="Timeline"
                onClick={handleTimelineClick}
                disabled={isBucketEmpty}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
