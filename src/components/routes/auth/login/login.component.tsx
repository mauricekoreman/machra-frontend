import { Container, TextField, Typography } from "@mui/material";
import wapen from "../../../../assets/wapen.png";

export const Login = () => {
  return (
    <Container
      component={"main"}
      sx={{ display: "flex", flexDirection: "column", justifyContent: "center", pt: 10 }}
    >
      <img src={wapen} />
      <Typography fontSize={40} variant='h1' sx={{ mb: 4 }}>
        Machrabord Login
      </Typography>
      <TextField placeholder='Wachtwoord' variant='outlined' fullWidth required />
    </Container>
  );
};

