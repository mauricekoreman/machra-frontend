import {
  Box,
  ButtonBase,
  Button as MuiButton,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { machrabordTiles } from "../../../utils/machrabord-tiles";
import { useState } from "react";
import styled from "@emotion/styled";
import { Button } from "../../lib/button/button.component";
import {
  useMachrabordDispatch,
  useMachrabordState,
} from "../../state/machrabord/machrabord.provider";
import { MdClose as RejectStoryIcon, MdCheck as NewStoryIcon } from "react-icons/md";
import { Modal } from "../../lib/modal/modal.component";

const Tile = styled(ButtonBase)`
  background-color: #e6eaebfc;
  height: 50px;
  width: 50px;
  display: grid;
  place-items: center;
  border-radius: 4px;
  cursor: pointer;
`;

export const SpelState = () => {
  const dispatch = useMachrabordDispatch();
  const { activeVerhaal, machrabordVerhalen } = useMachrabordState();
  const [hideActiveVerhaal, setHideActiveVerhaal] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  function getVerhaalOrNah(tileNumber: number) {
    const isStoryTile = machrabordTiles.includes(tileNumber);

    if (isStoryTile) {
      dispatch({ type: "getVerhaal" });
      setHideActiveVerhaal(false);
    } else {
      setModalOpen(true);
    }
  }

  return !hideActiveVerhaal ? (
    <>
      <Card variant='outlined' sx={{ borderRadius: 5, px: 1, pt: 0.5, flex: 1 }}>
        <CardContent>
          <Typography variant='h6' sx={{ mb: 1 }}>
            {activeVerhaal?.title}
          </Typography>
          <Typography>{activeVerhaal?.description}</Typography>
        </CardContent>
      </Card>
      <Box
        sx={{
          position: "fixed",
          bottom: 30,
          display: "flex",
          justifyContent: "space-between",
          gap: 3,
        }}
      >
        <Button
          component={<RejectStoryIcon size={"2em"} />}
          onClick={() => dispatch({ type: "rejectVerhaal" })}
        />
        <Button
          component={<NewStoryIcon size={"2em"} />}
          onClick={() => {
            if (machrabordVerhalen.length === 0) {
              dispatch({ type: "changeGameState", payload: "einde" });
            }
            setHideActiveVerhaal(true);
          }}
        />
      </Box>
    </>
  ) : (
    <>
      <Stack direction={"row"} gap={1} flexWrap={"wrap"}>
        {[...Array(63)].map((_, tileNumber) => (
          <Tile key={tileNumber + 1} onClick={() => getVerhaalOrNah(tileNumber + 1)}>
            <Typography variant='body2'>{tileNumber + 1}</Typography>
          </Tile>
        ))}
      </Stack>
      <Modal open={modalOpen}>
        <Typography>Dit vak bevat geen verhalen!</Typography>
        <MuiButton onClick={() => setModalOpen(false)}>OK</MuiButton>
      </Modal>
    </>
  );
};
















