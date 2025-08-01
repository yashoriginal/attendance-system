import React, { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import { Button, TextField, Typography, Box } from "@mui/material";

// const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";
const API_URL = "http://localhost:4000";

function App() {
  const webcamRef = useRef(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [imgSrc, setImgSrc] = useState(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef]);

  const sendAttendance = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    const blob = await (await fetch(imgSrc)).blob();
    formData.append("image", blob, "webcam.jpg");
    const res = await axios.post(`${API_URL}/mark`, formData);
    setStatus(`Attendance marked: ${res.data.type}`);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Typography variant="h3" sx={{ my: 2 }}>
        🎉 Fun Attendance System! 🎉
      </Typography>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={320}
      />
      <Button variant="contained" onClick={capture} sx={{ my: 1 }}>
        Take Photo
      </Button>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
      />
      {imgSrc && (
        <img
          src={imgSrc}
          width={160}
          style={{ margin: 8 }}
          alt="Capture preview"
        />
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={sendAttendance}
        disabled={!imgSrc || !name || !email}
        sx={{ mt: 2 }}
      >
        Submit Attendance
      </Button>
      <Typography variant="h5" sx={{ mt: 2 }}>
        {status}
      </Typography>
    </Box>
  );
}
export default App;
