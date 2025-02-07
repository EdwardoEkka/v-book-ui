import {
  Dashboard,
  Settings,
  Person,
  Accessibility,
} from "@mui/icons-material";
import { Paper, Stack } from "@mui/material";

const BottomBar = () => {
  return (
    <Paper
      sx={{
        position: "sticky",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: { xs: "block", md: "none" },
        p: "16px",
        borderRadius: "0",
      }}
    >
      <Stack direction="row" sx={{ justifyContent: "center", gap: "16px" }}>
        <Dashboard />
        <Person />
        <Accessibility />
        <Settings />
      </Stack>
    </Paper>
  );
};

export default BottomBar;
