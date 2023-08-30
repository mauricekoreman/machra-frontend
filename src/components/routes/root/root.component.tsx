import { Box } from "@mui/material";
import { Outlet, ScrollRestoration } from "react-router-dom";

export const Root: React.FC = () => (
  <Box>
    <ScrollRestoration />
    <Outlet />
  </Box>
);

