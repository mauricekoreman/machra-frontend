import {
  Button as MuiButton,
  Container,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import wapen from "../../../../assets/wapen.png";
import { Button } from "../../../lib/button/button.component";
import { FormEvent, useRef, useState } from "react";
import { httpSignin } from "../../../../api/authService";
import { useAuthDispatch } from "../../../state/auth/auth.provider";

export const Login = () => {
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const authDispatch = useAuthDispatch();

  function toggleIsAdminLogin() {
    setIsAdminLogin((prevState) => !prevState);
  }

  async function login(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (passwordRef.current) {
      setLoading(true);
      const { data, error } = await httpSignin({
        username: usernameRef.current?.value,
        password: passwordRef.current.value,
      });

      if (error) {
        setErrorMessage(error);
        setLoading(false);
        return;
      }

      data && authDispatch({ type: "signin", payload: data });
    }
  }

  return (
    <>
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

          <Button
            loading={loading}
            title='Login'
            sx={{ marginTop: "auto", marginBottom: 4 }}
            type='submit'
          />
        </form>
      </Container>
      <Snackbar
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
        open={Boolean(errorMessage)}
        autoHideDuration={2000}
        onClose={() => setErrorMessage(null)}
      >
        <Alert sx={{ width: "100%" }} severity='error'>
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

