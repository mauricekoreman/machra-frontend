import { Button as MuiButton, Container, TextField, Typography } from "@mui/material";
import wapen from "../../../../assets/wapen.png";
import { Button } from "../../../lib/button/button.component";
import { FormEvent, useRef, useState } from "react";

export const Login = () => {
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  function toggleIsAdminLogin() {
    setIsAdminLogin((prevState) => !prevState);
  }

  function login(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (passwordRef.current && !usernameRef.current) {
      return console.log({ password: passwordRef.current.value });
    }

    if (passwordRef.current && usernameRef.current) {
      return console.log({
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      });
    }
  }

  return (
    <Container
      component={"main"}
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        pt: 2,
      }}
    >
      <img src={wapen} />
      <Typography fontSize={40} variant='h1' sx={{ mb: 2 }}>
        Machrabord
      </Typography>
      <form
        onSubmit={login}
        style={{ display: "flex", flexDirection: "column", gap: "8px", height: "100%" }}
      >
        {isAdminLogin && (
          <TextField
            inputRef={usernameRef}
            placeholder='Username'
            variant='outlined'
            fullWidth
            required
          />
        )}
        <TextField
          inputRef={passwordRef}
          placeholder='Wachtwoord'
          variant='outlined'
          fullWidth
          required
          type='password'
        />
        <MuiButton
          variant='text'
          sx={{ alignSelf: "end", textTransform: "capitalize" }}
          onClick={toggleIsAdminLogin}
        >
          {isAdminLogin ? "Machraan" : "Admin"}
        </MuiButton>

        <Button title='Login' sx={{ marginTop: "auto", marginBottom: 4 }} type='submit' />
      </form>
    </Container>
  );
};
