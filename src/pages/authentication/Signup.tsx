import { useState } from "react";
import { createUser } from "../../api/api";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import GoogleLoginButton from "../../components/GoogleLoginButton";

const Signup = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error" | "info" | "warning"
  >("success");
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const SignUpSubmit = async () => {
    setLoading(true);
    try {
      const response = await createUser(name, email, password);
      console.log(response.data);
      setSnackbarMessage("Signup successful!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setTimeout(() => navigate("/signin"), 1500);
    } catch (error: any) {
      console.error(error);
      setSnackbarMessage(
        error?.response?.data?.message || "Signup failed. Please try again."
      );
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <Box sx={{ position: "relative" }}>
        {/* Gradient Circles */}
        <Box
          sx={{
            width: "150px",
            height: "150px",
            background:
              "linear-gradient(90deg,rgba(42, 123, 155, 1) 0%, rgba(87, 199, 133, 1) 50%, rgba(237, 221, 83, 1) 100%)",
            borderRadius: "50%",
            position: "absolute",
            top: "-80px",
            left: "-80px",
          }}
        />
        <Box
          sx={{
            width: "150px",
            height: "150px",
            background:
              "linear-gradient(90deg,rgba(146, 42, 155, 1) 0%, rgba(160, 87, 199, 1) 47%, rgba(237, 221, 83, 1) 100%)",
            borderRadius: "50%",
            position: "absolute",
            bottom: "-80px",
            right: "-80px",
            zIndex: -1,
          }}
        />

        {/* Signup Form */}
        <Container
          maxWidth="xs"
          sx={{
            py: "16px",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            borderRadius: "16px",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            overflow: "visible",
            position: "relative",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold", textAlign: "center" }}>
            Sign Up Here
          </Typography>
          <TextField
            fullWidth
            label="Name"
            margin="normal"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            label="Password"
            margin="normal"
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            onClick={SignUpSubmit}
            color="primary"
            disabled={loading}
            sx={{
              border: "1px solid black",
              mt: "16px",
              width: "100%",
              position: "relative",
              height: "40px",
            }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "black" }} />
            ) : (
              "Submit"
            )}
          </Button>
          <Button
            onClick={() => navigate("/signin")}
            color="primary"
            sx={{ border: "1px solid black", mt: "16px", width: "100%" }}
          >
            Go To Sign In
          </Button>
          <GoogleLoginButton />
        </Container>

        {/* Snackbar Toaster */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={4000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default Signup;
