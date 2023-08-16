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
  Stack,
  TextField,
  Typography,
  Button as MuiButton,
  RadioGroup,
  FormControlLabel,
  Radio,
  SelectChangeEvent,
} from "@mui/material";
import { MdArrowBack as BackIcon } from "react-icons/md";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FormEvent, useMemo, useRef, useState } from "react";
import { Header } from "../../navigation/header";
import { machraJarenObj } from "../../../utils/machrajaren";
import {
  PostVerhaal,
  httpDeleteStory,
  httpPatchStory,
  httpPostStory,
} from "../../../api/storiesService";
import { useAuthDispatch, useAuthState } from "../../state/auth/auth.provider";
import { Button } from "../../lib/button/button.component";
import { Modal } from "../../lib/modal/modal.component";
import { Verhaal as IVerhaal } from "../verhalen/verhalen.component";
import { shouldStoryBeActive } from "./active-verhaal";

interface IModalData {
  open: boolean;
  message: string;
  onClickBevestig: (() => void) | (() => Promise<void>);
}

export const EditVerhaal = () => {
  const { state } = useLocation();
  const { verhaalId } = useParams();
  const { title, description, year_of_story, active } = (state as IVerhaal) || {};

  const navigate = useNavigate();
  const { user } = useAuthState();
  const authDispatch = useAuthDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [modalData, setModalData] = useState<IModalData>({} as IModalData);

  const titelRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);
  const [jaarGebeurtenis, setJaargebeurtenis] = useState<number>(year_of_story ?? "");
  const [verhaalActive, setVerhaalActive] = useState(active ?? true);

  const isManager = user.roles.includes("manager");
  const isAdmin = user.roles.includes("admin");

  const machraJaren = useMemo(() => machraJarenObj(), []);

  async function submit() {
    if (titelRef.current && descRef.current && !isNaN(jaarGebeurtenis) && user.roles.length > 0) {
      const verhaalState: PostVerhaal = {
        title: titelRef.current.value,
        description: descRef.current.value,
        active: shouldStoryBeActive(jaarGebeurtenis),
        year_of_story: jaarGebeurtenis,
      };

      setLoading(true);
      let response;
      if (state === null) {
        response = await httpPostStory(verhaalState);
      } else {
        response = await httpPatchStory(verhaalState, verhaalId as string);
      }

      if (response?.data) {
        navigate(-1);
      }

      if (response?.error) {
        if (response.error.code === 401) {
          authDispatch({ type: "signout" });
        }
        setErrorMessage("Something went wrong...");
        setLoading(false);
      }
    }
  }

  async function deleteVerhaal() {
    const { data, error } = await httpDeleteStory(verhaalId as string);

    if (data?.status === 200) {
      navigate("/");
    }

    if (error) {
      if (error.code === 401) {
        authDispatch({ type: "signout" });
      }
      setErrorMessage("Something went wrong...");
    }
  }

  function handleChangeActive(e: SelectChangeEvent) {
    setVerhaalActive(JSON.parse(e.target.value));
  }

  function closeModal() {
    setModalData({
      ...modalData,
      open: false,
    });
  }

  return (
    <>
      <Header
        headerTitle={state === null ? "Nieuw verhaal" : "Update verhaal"}
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
          onSubmit={(e: FormEvent) => {
            e.preventDefault();
            setModalData({
              open: true,
              message: "Klik bevestig om het verhaal te uploaden",
              onClickBevestig: submit,
            });
          }}
        >
          <TextField
            inputRef={titelRef}
            id='titel'
            label='Titel'
            variant='outlined'
            defaultValue={title ?? ""}
            fullWidth
            required
          />
          <TextField
            inputRef={descRef}
            id='verhaal'
            label='Verhaal'
            variant='outlined'
            defaultValue={description ?? ""}
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
              {machraJaren.values.map((jaar, index) => (
                <MenuItem key={jaar} value={jaar}>
                  {machraJaren.ui[index]}
                </MenuItem>
              ))}
              <MenuItem key={"no-year"} value={0}>
                Geen jaar
              </MenuItem>
            </Select>
          </FormControl>

          {(isManager || isAdmin) && (
            <RadioGroup value={verhaalActive} onChange={handleChangeActive}>
              <FormControlLabel
                value={true}
                label='Aan actief Machrabord toevoegen'
                control={<Radio />}
              />
              <FormControlLabel
                value={false}
                label='Niet in actief Machrabord'
                control={<Radio />}
              />
            </RadioGroup>
          )}

          <Button
            title={state === null ? "Upload verhaal" : "Update verhaal"}
            type='submit'
            loading={loading}
          />
          {isAdmin && state !== null && (
            <Button
              title={"Verwijder verhaal"}
              type='button'
              color='error'
              loading={loading}
              onClick={() =>
                setModalData({
                  open: true,
                  message: "Klik op bevestig om het verhaal te verwijderen",
                  onClickBevestig: () => {
                    deleteVerhaal();
                    closeModal();
                  },
                })
              }
            />
          )}
        </Box>
      </Container>
      <Modal open={modalData.open || false} onClose={closeModal}>
        <Typography>{modalData.message}</Typography>
        <Stack direction='row' spacing={2} sx={{ mt: 2 }}>
          <MuiButton onClick={closeModal}>Annuleer</MuiButton>
          <MuiButton onClick={modalData.onClickBevestig}>Bevestig</MuiButton>
        </Stack>
      </Modal>
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
