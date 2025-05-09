import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { CssBaseline, Box, Button } from "@mui/material";

import { AuthProvider } from "./context/AuthContext";
import { MovieProvider } from "./context/MovieContext";
import { ThemeProvider, useTheme } from "./context/ThemeContext";

import { lightTheme, darkTheme } from "./theme/theme.js";
import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import ProtectedRoute from "./components/ProtectedRoute";

const AppContent = () => {
  const { mode, toggleMode } = useTheme();

  return (
    <MuiThemeProvider theme={mode === "light" ? lightTheme : darkTheme}>
      <CssBaseline />
      <Box sx={{ backgroundColor: "background.default", minHeight: "100vh", p: 3 }}>
        <Button
          variant="contained"
          onClick={toggleMode}
          sx={{ position: "absolute", top: 20, right: 20 }}
        >
          Toggle {mode === "light" ? "Dark" : "Light"} Mode
        </Button>
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/movie/:id"
              element={
                <ProtectedRoute>
                  <MovieDetails />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </Box>
    </MuiThemeProvider>
  );
};

const App = () => (
  <ThemeProvider>
    <AuthProvider>
      <MovieProvider>
        <AppContent />
      </MovieProvider>
    </AuthProvider>
  </ThemeProvider>
);

export default App;
