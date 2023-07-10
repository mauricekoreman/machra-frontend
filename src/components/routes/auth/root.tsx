import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";

export const AuthRoot = () => (
  <Container sx={{ height: "100dvh" }}>
    <Outlet />
  </Container>
);
