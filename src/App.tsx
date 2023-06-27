import { Root } from "./components/routes/root";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { MachrabordProvider } from "./components/contexts/machrabord/machrabord.provider";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MachrabordProvider>
        <Root />
      </MachrabordProvider>
    </ThemeProvider>
  );
}

export default App;


