import { useState } from "react";
import { loginUser } from "../../api/api";
import { Button, Container, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const SignInSubmit = async () => {
    try {
      const response = await loginUser(name, email, password);
      localStorage.setItem("token", response.data.token);
      navigate("/", { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeName = (e: any) => {
    setName(e.target.value);
  };

  const onChangeEmail = (e: any) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: any) => {
    setPassword(e.target.value);
  };

  return (
    <Container maxWidth="sm" sx={{ my: "32px" }}>
      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        Sign In Here
      </Typography>
      <TextField
        fullWidth
        label="Name"
        margin="normal"
        required
        value={name}
        onChange={(e) => {
          onChangeName(e);
        }}
      />
      <TextField
        fullWidth
        label="Email"
        margin="normal"
        required
        value={email}
        onChange={(e) => {
          onChangeEmail(e);
        }}
      />
      <TextField
        fullWidth
        label="Password"
        margin="normal"
        required
        value={password}
        onChange={(e) => {
          onChangePassword(e);
        }}
      />
      <Button
        onClick={() => {
          SignInSubmit();
        }}
        color="primary"
        sx={{ border: "1px solid black", mt: "16px" }}
      >
        Submit
      </Button>
    </Container>
  );
};

export default Signin;
