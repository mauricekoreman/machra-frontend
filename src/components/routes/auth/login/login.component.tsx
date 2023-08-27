import { Button as MuiButton, Container, TextField, Typography, Box } from "@mui/material";
import wapen from "../../../../assets/wapen.png";
import { Button } from "../../../lib/button/button.component";
import { FormEvent, useRef, useState } from "react";
import { useAuthDispatch } from "../../../state/auth/auth.provider";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Error } from "../../../../api/apiTypes";
import { httpSignin } from "../../../../api/authService";

export const Login = () => {
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const authDispatch = useAuthDispatch();

  const { mutate: signin, isLoading, error } = useMutation(httpSignin, { retry: false });

  function toggleIsAdminLogin() {
    setIsAdminLogin((prevState) => !prevState);
  }

  async function login(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (passwordRef.current) {
      signin(
        { username: usernameRef.current?.value, password: passwordRef.current.value },
        { onSuccess: (data) => authDispatch({ type: "signin", payload: data }) }
      );
    }
  }

  if (error instanceof AxiosError) {
    toast((error.response?.data as Error).message, { type: "error" });
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
      <Box
        component={"form"}
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

        <Button
          loading={isLoading}
          title='Login'
          sx={{ marginTop: "auto", marginBottom: 4 }}
          type='submit'
        />
      </Box>
    </Container>
  );
};
