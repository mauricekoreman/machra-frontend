import {
  Box,
  Container,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Role } from "../../state/auth/auth.provider";
import { ICreateNewUser, httpCreateUser } from "../../../api/authService";
import { useNavigate } from "react-router-dom";
import { useHeader } from "../../navigation/header";
import { MdArrowBack as BackIcon } from "react-icons/md";
import { Button } from "../../lib/button/button.component";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Error } from "../../../api/apiTypes";

export const NewUserPage = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [rol, setRol] = useState<Role>("user");

  const navigate = useNavigate();
  const { headerOptions } = useHeader();

  const { mutate: createUser, isLoading } = useMutation(httpCreateUser);

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

      createUser(userData, {
        onSuccess: () => navigate(-1),
        onError: (error) => {
          if (error instanceof AxiosError) {
            toast((error.response?.data as Error).message, { type: "error" });
          }
        },
      });
    }
  }

  return (
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
          disabled={isLoading}
        />
        <TextField
          inputRef={passwordRef}
          id='password'
          label='Password'
          variant='outlined'
          fullWidth
          required
          disabled={isLoading}
        />
        <FormControl fullWidth disabled={isLoading}>
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
        <Button loading={isLoading} type='submit' title='Create new user' />
      </Box>
    </Container>
  );
};
