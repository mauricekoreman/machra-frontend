import {
  Box,
  Button,
  Container,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { MdArrowBack as BackIcon } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FormEvent, useRef, useState } from "react";
import { Header } from "../../navigation/header";
import { machraJarenArray } from "../../../utils/machrajaren";
import { PostVerhaal, httpPostStory } from "../../../api/storiesService";
import { useAuthState } from "../../state/auth/auth.provider";

export const NieuwVerhaal = () => {
  const navigate = useNavigate();
  const { user } = useAuthState();

  const titelRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);
  const [jaarGebeurtenis, setJaargebeurtenis] = useState<number | "">("");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      if (titelRef.current && descRef.current && jaarGebeurtenis && user?.token) {
        const nieuwVerhaal: PostVerhaal = {
          titel: titelRef.current.value,
          desc: descRef.current.value,
          active: false,
          year_of_story: jaarGebeurtenis,
        };

        const { data, error } = await httpPostStory(user?.token, nieuwVerhaal);

        if (data) {
          navigate(-1);
        }

        if (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.error("je error boi", error);
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
          <FormControl>
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
          <Button
            variant='contained'
            size='medium'
            color='primary'
            sx={{ borderRadius: 100, textTransform: "capitalize", py: 1.5 }}
            type='submit'
          >
            Upload verhaal
          </Button>
        </Box>
      </Container>
    </>
  );
};
