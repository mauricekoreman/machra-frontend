/**
 * Wanneer een nieuw spel wordt gestart, laad de actieve verhalen in.
 * Deze verhalen worden gecached zodat als er nieuwe verhalen worden geupload door andere
 * gebruikers, deze niet per ongeluk in de lijst komen en het verstoren.
 *
 * Het cijfer van het vakje waar de actieve speler in staat wordt ingevoerd
 * Dan komt er een verhaal uitgerold.
 * Zodra deze is voorgelezen wordt deze op 'gebruikt' gezet. Deze komt nu niet meer voor in de rest van het spel
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
 */

import { Box, Button as MuiButton, Container } from "@mui/material";
import { useState } from "react";
import { Verhaal } from "../verhalen/verhalen.component";

import fake_verhalen from "../../../fake-db.json";

const Button: React.FC<{ title: string; onClick: () => void }> = ({ title, onClick }) => (
  <MuiButton
    onClick={onClick}
    variant='contained'
    size='medium'
    color='primary'
    sx={{ borderRadius: 100, textTransform: "capitalize", py: 1.5, px: 4 }}
  >
    {title}
  </MuiButton>
);

export const Spelen = () => {
  const [isMachrabordActive, setIsMachrabordActive] = useState(false);
  const [verhalen, setVerhalen] = useState<Verhaal[]>([]);

  function startMachrabord() {
    setVerhalen(fake_verhalen.data);
    setIsMachrabordActive(true);
  }

  return (
    <Container component='main' sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
      {isMachrabordActive ? (
        <Box>
          <Button title='Fetch new story' onClick={() => console.log("something")} />
        </Box>
      ) : (
        <Box sx={{ flex: 1, display: "grid", placeItems: "center" }}>
          <Button title='Start nieuw spel' onClick={startMachrabord} />
        </Box>
      )}
    </Container>
  );
};

