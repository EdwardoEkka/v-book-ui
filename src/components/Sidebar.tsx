import React, { useEffect } from "react";
import { Drawer, Box, Typography, Avatar, Stack, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  Dashboard,
  Person,
  Accessibility,
  Add,
  Logout,
  Help,
  Home,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { clearUserDetails, setIsAuthenticated } from "../store/auth";
import { RootState } from "../store/store";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  const user = useSelector((state: RootState) => state.user.user);

  // Monitor auth state and navigate to /signin when it becomes false
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    dispatch(setIsAuthenticated(false)); // Update Redux
    dispatch(clearUserDetails());
    localStorage.removeItem("token");
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 240,
          boxSizing: "border-box",
        },
        display: { xs: "none", md: "block" },
      }}
    >
      <Box sx={{ p: "16px" }}>
        <Typography variant="h6" noWrap sx={{ color: "#3E8E41" }}>
          Personal File Manager
        </Typography>
      </Box>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          p: "16px",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          boxShadow: 3,
        }}
      >
        <Avatar
          sx={{
            height: 32,
            width: 32,
            border: "3px solid #3E8E41",
            my: "16px",
          }}
        />
        <Typography variant="h6">{user.name}</Typography>
      </Paper>
      <Stack direction="column" sx={{ px: "40px", py: "32px", gap: "16px" }}>
        <Stack direction="row" gap={1} onClick={() => navigate("/")} sx={{ cursor: "pointer" }}>
          <Home />
          <Typography variant="body1">Home</Typography>
        </Stack>
        <Stack direction="row" gap={1} onClick={() => navigate("/dash-board")} sx={{ cursor: "pointer" }}>
          <Dashboard />
          <Typography variant="body1">Dashboard</Typography>
        </Stack>
        <Stack direction="row" gap={1} onClick={() => navigate("/profile")} sx={{ cursor: "pointer" }}>
          <Person />
          <Typography variant="body1">Profile</Typography>
        </Stack>
        <Stack direction="row" gap={1} onClick={() => navigate("/accessibilty")} sx={{ cursor: "pointer" }}>
          <Accessibility />
          <Typography variant="body1">Accessibility</Typography>
        </Stack>
      </Stack>
      <Stack sx={{ padding: 2, gap: "16px" }}>
        <Paper
          sx={{
            display: "flex",
            flexDirection: "row",
            p: 1,
            justifyContent: "center",
            boxShadow: 3,
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          <Add />
          <Typography variant="body1">Create new Folder</Typography>
        </Paper>
        <Paper
          sx={{
            display: "flex",
            flexDirection: "row",
            p: 1,
            justifyContent: "center",
            boxShadow: 3,
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          <Add />
          <Typography variant="body1">Create new File</Typography>
        </Paper>
      </Stack>
      <Stack direction="column" sx={{ px: "40px", py: "32px", gap: "16px" }}>
        <Stack direction="row" gap={1}>
          <Help />
          <Typography variant="body1">Help</Typography>
        </Stack>
        <Stack direction="row" gap={1} sx={{ cursor: "pointer" }} onClick={handleLogout}>
          <Logout />
          <Typography variant="body1">Logout</Typography>
        </Stack>
      </Stack>
    </Drawer>
  );
};

export default Sidebar;
