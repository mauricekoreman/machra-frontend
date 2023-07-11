import { Router } from "./components/routes/router";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { MachrabordProvider } from "./components/state/machrabord/machrabord.provider";
import { AuthProvider } from "./components/state/auth/auth.provider";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <MachrabordProvider>
          <Router />
        </MachrabordProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;


