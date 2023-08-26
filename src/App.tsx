import { Router } from "./components/routes/router";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { MachrabordProvider } from "./components/state/machrabord/machrabord.provider";
import { AuthProvider } from "./components/state/auth/auth.provider";
import { VerhalenProvider } from "./components/state/machrabord/verhalen.provider";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  const queryClient = new QueryClient();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <VerhalenProvider>
            <MachrabordProvider>
              <ReactQueryDevtools initialIsOpen={false} />
              <Router />
            </MachrabordProvider>
          </VerhalenProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;


