import { Container, InputBase } from "@mui/material";

export const TestPage = () => {
  return (
    <Container>
      <h1>Test page!</h1>
      <InputBase sx={{ color: "red" }} color='success' placeholder='hoiohi' />
    </Container>
  );
};

