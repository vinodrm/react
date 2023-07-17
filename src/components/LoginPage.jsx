import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import JioLogo from "./jio-logo.svg";
import "./LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  

  useEffect(() => {
    const generateBubbles = () => {
      const loginPageContainer = document.getElementById("loginPageContainer");

      const getRandomNumber = (min, max) => {
        return Math.random() * (max - min) + min;
      };

      const createBubble = () => {
        const bubble = document.createElement("div");
        bubble.classList.add("bubble");
        bubble.style.top = getRandomNumber(0, 100) + "vh";
        bubble.style.left = getRandomNumber(0, 100) + "vw";
        bubble.style.animationDuration = getRandomNumber(0, 10) + "s";
        bubble.style.animationDelay = getRandomNumber(0, 0) + "s";

        const red = getRandomNumber(0, 255);
        const green = getRandomNumber(0, 255);
        const blue = getRandomNumber(0, 255);
        bubble.style.backgroundColor = `rgba(${red}, ${green}, ${blue})`;

        bubble.addEventListener("animationend", () => {
          // Remove the bubble from the DOM when animation ends
          bubble.remove();
        });

        loginPageContainer.appendChild(bubble);
      };

      for (let i = 0; i < 1000; i++) {
        createBubble();
      }
    };

    generateBubbles();
  }, []);

  const handleSendOTP = (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      alert("Please enter email and password.");
      return;
    }

    const generatedOTP = generateOTP();
    sendOTPByEmail(email, generatedOTP);
    setIsOtpSent(true);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (otp === "") {
      alert("Please enter OTP.");
      return;
    }

    if (otp === "123456") {
      const token = generateToken();
      localStorage.setItem("token", token);
      navigate("/dashboard");
    } else {
      alert("Invalid OTP");
    }
  };

  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const sendOTPByEmail = (email, otp) => {
    console.log(`Sending OTP ${otp} to email ${email}`);
  };

  const generateToken = () => {
    return "your_generated_token_here";
  };

  return (
    <div className="login-page-container" id="loginPageContainer">
      <Container maxWidth="xs">
        <Box
          boxShadow={5}
          p={5}
          borderRadius={8}
          bgcolor="white"
          display="flex"
          flexDirection="column"
          alignItems="center"
          marginBottom={2}
        >
          <img
            src={JioLogo}
            alt="Jio Logo"
            width="80"
            style={{ marginTop: "10px" }}
          />
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            fontFamily="Arial,sans-serif"
            marginBottom={2}
          >
            Login
          </Typography>
          {!isOtpSent && (
            <form onSubmit={handleSendOTP}>
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                required
                fullWidth
                marginBottom={1}
              />
              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                required
                fullWidth
                marginBottom={2}
              />
              <Box display="flex" justifyContent="center">
                <Button type="submit" variant="contained" color="primary">
                  Send OTP
                </Button>
              </Box>
            </form>
          )}
          {isOtpSent && (
            <form onSubmit={handleLogin}>
              <TextField
                label="Enter OTP"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                variant="outlined"
                required
                fullWidth
                marginBottom={2}
              />
              <Box display="flex" justifyContent="center">
                <Button type="submit" variant="contained" color="primary">
                  Login
                </Button>
              </Box>
            </form>
          )}
          </Box>
        </Container>
      </div>
    );
  };
  
  export default LoginPage;
  