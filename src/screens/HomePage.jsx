import React, { useState, useEffect } from "react";
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
import { useNavigate } from "react-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "open-api-key",
  dangerouslyAllowBrowser: true,
});

export default function HomePage() {
  const [isBucketEmpty, setIsBucketEmpty] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [urls, setUrls] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [currentImage, setCurrentImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [previousJournal, setPreviousJournal] = useState("");

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
        setLoading(true);
        const selectedImages = selectRandomImages(downloadURLs, 3);
        const mostInterestingImage = await analyzeImages(selectedImages);
        setCurrentImage(mostInterestingImage);
        generatePrompt(mostInterestingImage);
      } catch (error) {
        console.error("Error uploading files:", error);
        setUploading(false);
      }
    }
  };

  const selectRandomImages = (urls, count) => {
    const shuffled = urls.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const analyzeImages = async (images) => {
    const responses = await Promise.all(
      images.map(async (image) => {
        const response = await openai.chat.completions.create({
          model: "gpt-4o",
          messages: [
            {
              role: "user",
              content: [
                { type: "text", text: "What’s in this image?" },
                {
                  type: "image_url",
                  image_url: { url: image },
                },
              ],
            },
          ],
        });
        return response.choices[0].message.content;
      })
    );

    let maxLength = 0;
    let mostInterestingImage = images[0];
    responses.forEach((description, index) => {
      if (description.length > maxLength) {
        maxLength = description.length;
        mostInterestingImage = images[index];
      }
    });
    return mostInterestingImage;
  };

  const generatePrompt = async (imageUrl) => {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Generate 1-3 line prompt for journaling based on this image. Don't output **prompt**",
              },
              {
                type: "image_url",
                image_url: { url: imageUrl },
              },
              previousJournal && {
                type: "text",
                text: `Context: ${previousJournal}`,
              },
            ].filter(Boolean),
          },
        ],
      });

      const generatedPrompt = response.choices[0].message.content;
      setPrompt(generatedPrompt);
      setLoading(false);
    } catch (error) {
      console.error("Error generating prompt:", error);
      setLoading(false);
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

  const handleKeepJournaling = async (reflection) => {
    setPreviousJournal(reflection);
    setLoading(true);
    const remainingImages = urls.filter((url) => url !== currentImage);
    const selectedImages = selectRandomImages(remainingImages, 3);
    const mostInterestingImage = await analyzeImages(selectedImages);
    setCurrentImage(mostInterestingImage);
    generatePrompt(mostInterestingImage);
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
            <ReflectComponent
              prompt={prompt}
              imageUrl={currentImage}
              loading={loading}
              onKeepJournaling={handleKeepJournaling}
            />
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
