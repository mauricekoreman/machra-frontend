import {
  Alert,
  Box,
  Container,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
} from "@mui/material";
import { MdArrowBack as BackIcon } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FormEvent, useRef, useState } from "react";
import { Header } from "../../navigation/header";
import { machraJarenArray } from "../../../utils/machrajaren";
import { PostVerhaal, httpPostStory } from "../../../api/storiesService";
import { useAuthDispatch, useAuthState } from "../../state/auth/auth.provider";
import { Button } from "../../lib/button/button.component";

export const NieuwVerhaal = () => {
  const navigate = useNavigate();
  const { user } = useAuthState();
  const authDispatch = useAuthDispatch();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const titelRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);
  const [jaarGebeurtenis, setJaargebeurtenis] = useState<number | "">("");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      if (titelRef.current && descRef.current && jaarGebeurtenis && user.roles.length > 0) {
        setLoading(true);
        const nieuwVerhaal: PostVerhaal = {
          title: titelRef.current.value,
          description: descRef.current.value,
          active: false,
          year_of_story: jaarGebeurtenis,
        };

        const { data, error } = await httpPostStory(nieuwVerhaal);

        if (data) {
          navigate(-1);
        }

        if (error) {
          console.log(error);
          if (error.code === 401) {
            authDispatch({ type: "signout" });
          }
          setErrorMessage("Something went wrong...");
        }
      }
    } catch (error) {
      console.error("Post new verhaal error", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header
        headerTitle={"Nieuw verhaal"}
        headerLeft={
          <IconButton color='inherit' size='large' edge='start' onClick={() => navigate(-1)}>
            <BackIcon />
          </IconButton>
        }
      />
      <Container component='main' sx={{ py: 2 }}>
        <Box
          component='form'
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          onSubmit={submit}
        >
          <TextField
            inputRef={titelRef}
            id='titel'
            label='Titel'
            variant='outlined'
            fullWidth
            required
          />
          <TextField
            inputRef={descRef}
            id='verhaal'
            label='Verhaal'
            variant='outlined'
            required
            multiline
            fullWidth
            minRows={4}
          />
          <FormControl required>
            <InputLabel id='jaar_gebeurtenis'>Jaar van gebeurtenis</InputLabel>
            <Select
              labelId='jaar_gebeurtenis'
              value={jaarGebeurtenis}
              label='Jaar van gebeurtenis'
              onChange={(e) => setJaargebeurtenis(e.target.value as number)}
            >
              {machraJarenArray().map((jaar) => (
                <MenuItem key={jaar} value={jaar}>
                  {jaar}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button title='Upload verhaal' type='submit' loading={loading} />
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
