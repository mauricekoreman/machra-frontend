import { Box, Container, Typography, Stack } from "@mui/material";
import {
  useMachrabordDispatch,
  useMachrabordState,
} from "../../state/machrabord/machrabord.provider";
import { MachrabordFilters } from "./filters.component";
import { UitlegState } from "./uitleg-state.component";
import { Button } from "../../lib/button/button.component";
import { Button as MuiButton } from "@mui/material";
import { Modal } from "../../lib/modal/modal.component";
import { useEffect, useState } from "react";
import { useHeader } from "../../navigation/header";
import { MdOutlineStopCircle as StopIcon } from "react-icons/md";
import { SpelState } from "./spel-state.component";
import { EindeState } from "./einde-state.component";
import { useVerhalenState } from "../../state/machrabord/verhalen.provider";

export const Spelen = () => {
  const { isMachrabordActive, gameState } = useMachrabordState();
  const dispatch = useMachrabordDispatch();
  const { verhalen } = useVerhalenState();

  const { headerOptions } = useHeader();
  const [modalOpen, setModalOpen] = useState(false);

  function closeModal() {
    setModalOpen(false);
  }

  useEffect(() => {
    headerOptions({
      headerRight: isMachrabordActive && (
        <Stack direction={"row"} alignItems={"center"} gap={0.5} onClick={() => setModalOpen(true)}>
          <StopIcon size={21} color='orangered' />
          <Typography color='orangered'>Stop spel</Typography>
        </Stack>
      ),
    });
  }, [headerOptions, isMachrabordActive]);

  function displayGameState() {
    switch (gameState) {
      case "filterSettings":
        return <MachrabordFilters />;

      case "uitleg": {
        return (
          <>
            <UitlegState />
            <Button
              sx={{ position: "fixed", bottom: 30 }}
              title='Start'
              onClick={() => dispatch({ type: "changeGameState", payload: "spel" })}
            />
          </>
        );
      }

      case "spel":
        return <SpelState />;

      case "einde":
        return (
          <EindeState
            onClickOpnieuw={() => dispatch({ type: "start", payload: verhalen! })}
            onClickStoppen={() => dispatch({ type: "stop" })}
          />
        );
      default:
        return <Typography>Something went wrong...</Typography>;
    }
  }

  return (
    <>
      <Container
        component='main'
        sx={{ flex: 1, display: "flex", flexDirection: "column", pt: 2, pb: 16 }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          {displayGameState()}
        </Box>
      </Container>
      <Modal open={modalOpen} onClose={closeModal}>
        <Typography>Klik op bevestig om het spel te stoppen</Typography>
        <Stack direction='row' spacing={2} sx={{ mt: 2 }}>
          <MuiButton onClick={closeModal}>Annuleer</MuiButton>
          <MuiButton
            onClick={() => {
              dispatch({ type: "stop" });
              closeModal();
            }}
          >
            Bevestig
          </MuiButton>
        </Stack>
      </Modal>
    </>
  );
};








