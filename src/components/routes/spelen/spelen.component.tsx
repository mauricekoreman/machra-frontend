/**
 * Wanneer een nieuw spel wordt gestart, laad de actieve verhalen in.
 * Deze verhalen worden gecached zodat als er nieuwe verhalen worden geupload door andere
 * gebruikers, deze niet per ongeluk in de lijst komen en het verstoren.
 *
 * ! = GESCHRAPT
 * !Het cijfer van het vakje waar de actieve speler in staat wordt ingevoerd
 * !Dan komt er een verhaal uitgerold.
 *
 * Zodra het verhaal is voorgelezen wordt deze op 'gebruikt' gezet. Deze komt nu niet meer voor in de rest van het spel
 *
 * Als de host niet tevreden is met het verhaal kan er een ander verhaal worden opgevraagd.
 * Het verhaal dat niet voorgelezen is, wordt NIET op 'gebruikt' gezet en kan dus in een latere ronde terugkomen.
 *
 * Er kan ook gezocht worden door alle verhalen momenteel in het spel. Dit is een overzicht zoals in '/verhalen' met filter mogelijkheden.
 * Een verhaal uit de lijst kan worden aangeklikt en er staat dan een knop: 'gebruik'. Nu is het verhaal op 'gebruikt' gezet.
 *
 * Ook op inactieve verhalen kan worden gezocht. Dit zal wel een aparte API call zijn en deze komen niet uit de cache. Wel worden deze vanaf
 * het moment dat er naar gevraagd wordt in de cache gezet voor latere zoekopdrachten.
 *
 * In de lijst met alle verhalen is een filter aanwezig om gebruikte verhalen 'visible' te zetten of 'invisible (default)'.
 * Gebruikte verhalen hebben een andere achtergrond tint om zo onderscheid te maken.xq
 *
 * Filter mogelijkheid om vóór het beginnen van het spel type verhalen kan kiezne (toegevoegde datum)
 */

import {
  Box,
  Button as MuiButton,
  Container,
  Card,
  CardContent,
  Typography,
  SxProps,
  Theme,
  List,
  ButtonGroup,
} from "@mui/material";
import { useState } from "react";
import { Verhaal } from "../verhalen/verhalen.component";
import { MdClose as RejectStoryIcon, MdCheck as NewStoryIcon } from "react-icons/md";

import fake_verhalen from "../../../fake-db.json";
import styled from "@emotion/styled";
import { Codeblock } from "../../lib/codeblock/codeblock.component";
import { useMachrabord } from "../../contexts/machrabord/machrabord.provider";

const Button: React.FC<{
  title?: string;
  component?: JSX.Element;
  onClick: () => void;
  sx?: SxProps<Theme>;
  disabled?: boolean;
}> = ({ title, component, onClick, sx, disabled = false }) => (
  <MuiButton
    onClick={onClick}
    variant='contained'
    size='medium'
    color='primary'
    disabled={disabled}
    sx={{ borderRadius: 100, textTransform: "capitalize", py: 1.5, px: 4, ...sx }}
  >
    {component ? component : title}
  </MuiButton>
);

const ListItem = ({ children }: { children: React.ReactNode }) => (
  <li>
    <Typography>{children}</Typography>
  </li>
);

const StyledList = styled.ul`
  list-style: none;

  & > li {
    position: relative;
  }

  & > li::before {
    content: "*";
    position: absolute;
    left: -20px;
    top: 2px;
  }
`;

export const Spelen = () => {
  const { isMachrabordActive, startStopMachrabordSession } = useMachrabord();

  const [verhalen, setVerhalen] = useState<Verhaal[]>([]);
  const [activeVerhaal, setActiveVerhaal] = useState<Verhaal | null>(null);

  function startMachrabord() {
    setVerhalen(fake_verhalen.data);
    startStopMachrabordSession("start");
  }

  function fetchVerhaal() {
    const randomId = Math.floor(Math.random() * verhalen.length);
    setActiveVerhaal(verhalen[randomId]);
  }

  return (
    <Container
      component='main'
      sx={{ flex: 1, display: "flex", flexDirection: "column", pt: 2, pb: 16 }}
    >
      {isMachrabordActive ? (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          {activeVerhaal ? (
            <Card variant='outlined' sx={{ borderRadius: 5, px: 1, pt: 0.5, flex: 1 }}>
              <CardContent>
                <Typography variant='h6' sx={{ mb: 1 }}>
                  {activeVerhaal.title}
                </Typography>
                <Typography>{activeVerhaal.story}</Typography>
              </CardContent>
            </Card>
          ) : (
            <Box sx={{ px: 2 }}>
              <Typography variant='h2' sx={{ fontSize: 21, fontWeight: 600 }}>
                Voor de Spelleider:
              </Typography>
              <StyledList>
                <ListItem>
                  Bij elke klik op{" "}
                  <Codeblock>
                    <NewStoryIcon size={"1.2em"} />
                  </Codeblock>{" "}
                  wordt een random verhaal getrokken. Deze wordt uit op 'gebruikt' gezet en komt dan
                  niet meer voor in het spel.
                </ListItem>
                <ListItem>
                  Als de host niet tevreden is met het verhaal kan er op{" "}
                  <Codeblock>
                    <RejectStoryIcon size={"1.2em"} />
                  </Codeblock>{" "}
                  geklikt worden om een ander verhaal te laten zien. Het weggedrukte verhaal wordt{" "}
                  <b>niet</b> op 'gebruikt' gezet en kan dus later in het spel terugkomen.
                </ListItem>
                <ListItem>
                  Op deze manier hebben alle verhalen een even grote kans om in het spel te komen.
                </ListItem>
                <ListItem>
                  Klik op{" "}
                  <Codeblock>
                    <NewStoryIcon size={"1.2em"} />
                  </Codeblock>{" "}
                  om het eerste verhaal op te halen!
                </ListItem>
              </StyledList>
            </Box>
          )}
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
              disabled={!activeVerhaal}
              component={<RejectStoryIcon size={"2em"} />}
              onClick={fetchVerhaal}
            />
            <Button component={<NewStoryIcon size={"2em"} />} onClick={fetchVerhaal} />
          </Box>
        </Box>
      ) : (
        <Box sx={{ flex: 1, display: "grid", placeItems: "center" }}>
          <Typography variant='h4'>Stel filters in</Typography>
          <Button title='Start nieuw spel' onClick={startMachrabord} />
        </Box>
      )}
    </Container>
  );
};







