import { Router } from "./components/routes/router";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { MachrabordProvider } from "./components/state/machrabord/machrabord.provider";
import { AuthProvider } from "./components/state/auth/auth.provider";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const queryClient = new QueryClient();
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <MachrabordProvider>
            <ToastContainer
              position='top-center'
              autoClose={3000}
              hideProgressBar={false}
              draggableDirection='y'
              newestOnTop={false}
              limit={2}
              closeOnClick
              draggable
              theme='light'
            />
            <ReactQueryDevtools initialIsOpen={false} />
            <Router />
          </MachrabordProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;


