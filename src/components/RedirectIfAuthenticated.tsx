import React, { ReactElement, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../store/store";
import { setUserDetails, setIsAuthenticated } from "../store/auth";
import { authenticateUser } from "../api/api";
import { Box, CircularProgress, Typography } from "@mui/material";

const RedirectIfAuthenticated = ({ children }: { children: ReactElement }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authenticateUserHere = async () => {
      try {
        const response = await authenticateUser();
        dispatch(setUserDetails(response.data.user));
        dispatch(setIsAuthenticated(true));
      } catch (error) {
        console.log("Authentication failed:", error);
        dispatch(setIsAuthenticated(false));
      } finally {
        setLoading(false);
      }
    };

    if (!isAuthenticated) {
      authenticateUserHere();
    } else {
      setLoading(false);
    }
  }, [dispatch, isAuthenticated]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          gap: 2,
        }}
      >
        <CircularProgress size={60} />
        <Typography variant="h6" color="textSecondary">
          Checking authentication...
        </Typography>
      </Box>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RedirectIfAuthenticated;
