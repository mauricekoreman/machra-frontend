import { Box, Button, Container, IconButton, TextField } from "@mui/material";
import { MdArrowBack as BackIcon } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FormEvent } from "react";
import { Header } from "../../navigation/header";

export const NieuwVerhaal = () => {
  const navigate = useNavigate();

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log("Submit form!");
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
          <TextField id='titel' label='Titel' variant='outlined' fullWidth required />
          <TextField
            id='verhaal'
            label='Verhaal'
            variant='outlined'
            required
            multiline
            fullWidth
            minRows={4}
          />
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

