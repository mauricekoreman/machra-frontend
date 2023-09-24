import {
  Box,
  Container,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  Button as MuiButton,
  FormHelperText,
} from "@mui/material";
import { MdArrowBack as BackIcon } from "react-icons/md";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Header } from "../../navigation/header";
import { calcMachraJarenArray } from "../../../utils/machrajaren";
import {
  PostVerhaal,
  httpDeleteStory,
  httpPatchStory,
  httpPostStory,
} from "../../../api/storiesService";
import { useAuthDispatch, useAuthState } from "../../state/auth/auth.provider";
import { Button } from "../../lib/button/button.component";
import { Modal } from "../../lib/modal/modal.component";
import { Verhaal as IVerhaal } from "../../../api/storiesService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

interface IModalData {
  open: boolean;
  message: string;
  onClickBevestig: (() => void) | (() => Promise<void>);
}

export const EditVerhaal = () => {
  const { state } = useLocation();
  const { verhaalId } = useParams();
  const { title, description, year_of_story } = (state as IVerhaal) || {};

  const navigate = useNavigate();
  const { user } = useAuthState();
  const authDispatch = useAuthDispatch();
  const [modalData, setModalData] = useState<IModalData>({} as IModalData);

  const titelRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);
  const [jaarGebeurtenis, setJaargebeurtenis] = useState<number>(year_of_story ?? "");

  const isManager = user.roles.includes("manager");
  const isAdmin = user.roles.includes("admin");

  const queryClient = useQueryClient();

  const {
    mutate: postStory,
    isLoading: isPostLoading,
    isSuccess: isPostSuccess,
    error: postError,
  } = useMutation(httpPostStory, {
    onSuccess: () => {
      queryClient.invalidateQueries(["infinite-verhalen"], { refetchType: "all" });
    },
  });

  const {
    mutate: patchStory,
    isLoading: isPatchLoading,
    isSuccess: isPatchSuccess,
    error: patchError,
  } = useMutation(httpPatchStory, {
    onSuccess: () => {
      queryClient.invalidateQueries(["infinite-verhalen"], { refetchType: "all" });
    },
  });

  const {
    mutate: deleteStory,
    isLoading: isDeleteLoading,
    isSuccess: isDeleteSuccess,
    error: deleteError,
  } = useMutation(httpDeleteStory, {
    onSuccess: () => {
      queryClient.removeQueries(["infinite-verhalen", "verhaal", verhaalId]);
      queryClient.invalidateQueries(["infinite-verhalen"], { refetchType: "all" });
    },
  });

  async function submit() {
    if (titelRef.current && descRef.current && !isNaN(jaarGebeurtenis) && user.roles.length > 0) {
      const verhaalState: PostVerhaal = {
        title: titelRef.current.value,
        description: descRef.current.value,
        year_of_story: jaarGebeurtenis,
      };

      if (state === null) {
        postStory(verhaalState);
      } else {
        patchStory({ story: verhaalState, storyId: verhaalId as string });
      }

      closeModal();
    }
  }

  useEffect(() => {
    if (isPostSuccess || isPatchSuccess) {
      navigate(-1);
    }

    if (isDeleteSuccess) {
      navigate("/");
    }

    if (postError || patchError || deleteError) {
      if ((postError as AxiosError).response?.status === 401) {
        authDispatch({ type: "signout" });
      }
      toast("Something went wrong...", { type: "error" });
    }
  }, [
    isPostSuccess,
    postError,
    authDispatch,
    navigate,
    patchError,
    isPatchSuccess,
    deleteError,
    isDeleteSuccess,
  ]);

  async function deleteVerhaal() {
    deleteStory(verhaalId as string);
  }

  function closeModal() {
    setModalData({
      ...modalData,
      open: false,
    });
  }

  const isLoading = isPatchLoading || isDeleteLoading || isPostLoading;

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
            disabled={isLoading}
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
            disabled={isLoading}
          />
          <FormControl required disabled={isLoading}>
            <InputLabel id='jaar_gebeurtenis'>Jaar van gebeurtenis</InputLabel>
            <Select
              labelId='jaar_gebeurtenis'
              value={jaarGebeurtenis}
              label='Jaar van gebeurtenis'
              onChange={(e) => setJaargebeurtenis(e.target.value as number)}
            >
              {calcMachraJarenArray().map((jaar) => (
                <MenuItem key={jaar} value={jaar}>
                  {jaar}
                </MenuItem>
              ))}
              <MenuItem key={"no-year"} value={0}>
                Geen jaar
              </MenuItem>
            </Select>
            <FormHelperText>
              *In Machrajaren. Voorbeeld: 2022 loopt van okt. 2022 tot okt 2023.
            </FormHelperText>
          </FormControl>

          <Button
            title={state === null ? "Upload verhaal" : "Update verhaal"}
            type='submit'
            loading={isLoading}
          />
          {isAdmin && state !== null && (
            <Button
              title={"Verwijder verhaal"}
              type='button'
              color='error'
              loading={isLoading}
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
        {!isAdmin && !isManager && (
          <Typography variant='body2' mt={2}>
            Als dit verhaal wordt goedgekeurd, dan zal deze in Machrabord verschijnen.
          </Typography>
        )}
        <Stack direction='row' spacing={2} sx={{ mt: 2 }}>
          <MuiButton onClick={closeModal}>Annuleer</MuiButton>
          <MuiButton onClick={modalData.onClickBevestig}>Bevestig</MuiButton>
        </Stack>
      </Modal>
    </>
  );
};
