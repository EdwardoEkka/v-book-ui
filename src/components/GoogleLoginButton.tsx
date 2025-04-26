
import React from "react";
import { Button } from "@mui/material";

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID;
const REDIRECT_URI = process.env.REACT_APP_GOOGLE_AUTH_REDIRECT_URI;

export const loginWithGoogle = () => {
  const url = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=email%20profile&access_type=offline&prompt=consent`;
  window.location.href = url; // Redirect user to Google login page
};

const GoogleLoginButton = () => {
  return (
    <Button
      color="primary"
      fullWidth
      onClick={loginWithGoogle}
      sx={{
        border: "1px solid black",
        mt: "16px",
        width: "100%",
        height: "40px",
        position: "relative",
      }}
    >
      Continue with Google
    </Button>
  );
};

export default GoogleLoginButton;
