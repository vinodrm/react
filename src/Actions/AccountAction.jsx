import React, { useState } from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";

const AccountAction = ({ handleLogin }) => {
  const [otp, setOTP] = useState("");
  const [token, setToken] = useState("");

  const handleOTPVerification = async (e) => {
    e.preventDefault();

    // Perform OTP and token verification logic here
    try {
      // Make a request to the backend API to verify the OTP and token
      const response = await fetch("/api/verify-otp-token", {
        method: "POST",
        body: JSON.stringify({ otp, token }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // OTP and token verification successful
        handleLogin(); // Call the login callback function from LoginPage
      } else {
        // OTP and token verification failed
        const errorData = await response.json();
        alert(errorData.message); // Display the error message returned from the backend
      }
    } catch (error) {
      console.error("Error occurred during OTP and token verification:", error);
      alert(
        "An error occurred during OTP and token verification. Please try again later."
      );
    }
  };

  return (
    <Container maxWidth="xs">
      <Box boxShadow={3} p={4} borderRadius={8} bgcolor="white">
        <Typography variant="h5" align="center" gutterBottom>
          OTP and Token Verification
        </Typography>
        <form onSubmit={handleOTPVerification}>
          <TextField
            label="OTP"
            type="text"
            value={otp}
            onChange={(e) => setOTP(e.target.value)}
            variant="outlined"
            required
            fullWidth
          />
          <TextField
            label="Token"
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            variant="outlined"
            required
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default AccountAction;
