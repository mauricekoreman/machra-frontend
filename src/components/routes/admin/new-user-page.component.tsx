import {
  Alert,
  Box,
  Container,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Snackbar,
  TextField,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Role } from "../../state/auth/auth.provider";
import { ICreateNewUser, httpCreateUser } from "../../../api/authService";
import { useNavigate } from "react-router-dom";
import { useHeader } from "../../navigation/header";
import { MdArrowBack as BackIcon } from "react-icons/md";
import { Button } from "../../lib/button/button.component";

export const NewUserPage = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [rol, setRol] = useState<Role>("user");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();
  const { headerOptions } = useHeader();

  useEffect(() => {
    headerOptions({
      headerTitle: "Create new user",
      headerLeft: (
        <IconButton color='inherit' size='large' edge='start' onClick={() => navigate(-1)}>
          <BackIcon />
        </IconButton>
      ),
    });
  }, [headerOptions, navigate]);

  function handleChangeRole(e: SelectChangeEvent) {
    setRol(e.target.value as Role);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (usernameRef.current?.value && passwordRef.current?.value && rol) {
      const userData: ICreateNewUser = {
        username: usernameRef.current.value,
        password: passwordRef.current.value,
        roles: [rol],
      };

      const error = await httpCreateUser(userData);

      if (error?.error) {
        setErrorMessage(error.error.message);
      } else {
        navigate(-1);
      }
    }
  }

  return (
    <>
      <Container sx={{ py: 2 }}>
        <Box
          component='form'
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            inputRef={usernameRef}
            id='username'
            label='Username'
            variant='outlined'
            fullWidth
            required
          />
          <TextField
            inputRef={passwordRef}
            id='password'
            label='Password'
            variant='outlined'
            fullWidth
            required
          />
          <FormControl fullWidth>
            <InputLabel id='select-role-label'>Rol</InputLabel>
            <Select
              labelId='select-role-label'
              id='select-role'
              value={rol}
              label='Rol'
              onChange={handleChangeRole}
            >
              <MenuItem value={"user"}>User</MenuItem>
              <MenuItem value={"manager"}>Manager</MenuItem>
              <MenuItem value={"admin"}>Admin</MenuItem>
            </Select>
          </FormControl>
          <Button type='submit' title='Create new user' />
        </Box>
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

