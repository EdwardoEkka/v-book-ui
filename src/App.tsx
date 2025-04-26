import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import RootChecker from "./components/RootFolder";
import { Box, CssBaseline } from "@mui/material";
import AccessBar from "./components/AccessBar";
import "./App.css";
import RootFolder from "./pages/root/RootFolder";
import Signup from "./pages/authentication/Signup";
import Signin from "./pages/authentication/Signin";
import ProtectedRoute from "./components/ProtectedRoute";
import RedirectIfAuthenticated from "./components/RedirectIfAuthenticated";
import FileCreate from "./pages/file/CreateFile";
import ViewFile from "./pages/file/ViewFile";
import DashBoard from "./pages/dashboard/DashBoard";
import ProfilePage from "./pages/profile/ProfilePage";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AccessibilityPage from "./pages/accessibility/AccessibilityPage";
import Auth from "./components/Auth";

const App: React.FC = () => {
  const dark = useSelector((state: RootState) => state.accessibilty.isDark);

  // Create a theme based on dark mode
  const theme = createTheme({
    palette: {
      mode: dark ? "dark" : "light",
      background: {
        default: dark ? "#121212" : "#f4f4f4",
        paper: dark ? "#1E1E1E" : "#FFFFFF",
      },
      text: {
        primary: dark ? "#FFFFFF" : "#000000",
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: dark ? "#121212" : "#f4f4f4",
            color: dark ? "#FFFFFF" : "#000000",
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route
              element={
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column-reverse", md: "row" },
                    minHeight: "100vh",
                  }}
                >
                  <AccessBar />
                  <Box component="main" sx={{ flexGrow: 1 }}>
                    <Outlet />
                  </Box>
                </Box>
              }
            >
              <Route path="/" element={<RootChecker />} />
              <Route path="/folder/:id" element={<RootFolder />} />
              <Route path="/folder/:id/file-creation" element={<FileCreate />} />
              <Route path="/folder/:id/file-view/:fileId" element={<ViewFile />} />
              <Route path="/dash-board" element={<DashBoard />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/accessibilty" element={<AccessibilityPage />} />
            </Route>
          </Route>

          {/* Authentication Routes */}
          <Route
            path="/signup"
            element={
              <RedirectIfAuthenticated>
                <Signup />
              </RedirectIfAuthenticated>
            }
          />
          <Route
            path="/signin"
            element={
              <RedirectIfAuthenticated>
                <Signin />
              </RedirectIfAuthenticated>
            }
          />
          <Route path="auth/complete/google-oauth2"             
          element={
              <RedirectIfAuthenticated>
                <Auth />
              </RedirectIfAuthenticated>
            }/>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
