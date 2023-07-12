import { Router } from "./components/routes/router";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { MachrabordProvider } from "./components/state/machrabord/machrabord.provider";
import { AuthProvider } from "./components/state/auth/auth.provider";
import { VerhalenProvider } from "./components/state/machrabord/verhalen.prover";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <VerhalenProvider>
          <MachrabordProvider>
            <Router />
          </MachrabordProvider>
        </VerhalenProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;


