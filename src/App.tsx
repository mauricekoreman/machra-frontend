import { Router } from "./components/routes/router";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { MachrabordProvider } from "./components/state/machrabord/machrabord.provider";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MachrabordProvider>
        <Router />
      </MachrabordProvider>
    </ThemeProvider>
  );
}

export default App;


