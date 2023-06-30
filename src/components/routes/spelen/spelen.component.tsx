/**
 * Wanneer een nieuw spel wordt gestart, laad de actieve verhalen in.
 * Deze verhalen worden gecached zodat als er nieuwe verhalen worden geupload door andere
 * gebruikers, deze niet per ongeluk in de lijst komen en het verstoren.
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

import { Box, Container, Card, CardContent, Typography } from "@mui/material";
import { MdClose as RejectStoryIcon, MdCheck as NewStoryIcon } from "react-icons/md";
import { useMachrabord } from "../../contexts/machrabord/machrabord.provider";
import { MachrabordFilters } from "./filters.component";
import { SpelUitleg } from "./spel-uitleg.component";
import { Button } from "../../lib/button/button.component";

export const Spelen = () => {
  const { isMachrabordActive, activeVerhaal, machrabordVerhalen, dispatch } = useMachrabord();

  function displayGameState() {
    if (!activeVerhaal) {
      return <SpelUitleg />;
    } else if (machrabordVerhalen.length > 0) {
      return (
        <Card variant='outlined' sx={{ borderRadius: 5, px: 1, pt: 0.5, flex: 1 }}>
          <CardContent>
            <Typography variant='h6' sx={{ mb: 1 }}>
              {activeVerhaal.title}
            </Typography>
            <Typography>{activeVerhaal.story}</Typography>
          </CardContent>
        </Card>
      );
    } else if (machrabordVerhalen.length === 0) {
      return (
        <Box>
          <Typography>Spel is klaar, kaarten zijn op</Typography>
        </Box>
      );
    }
  }

  return (
    <Container
      component='main'
      sx={{ flex: 1, display: "flex", flexDirection: "column", pt: 2, pb: 16 }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {isMachrabordActive ? (
          <>
            {displayGameState()}
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
                onClick={() => dispatch("rejectVerhaal")}
              />
              <Button
                component={<NewStoryIcon size={"2em"} />}
                onClick={() => dispatch("getVerhaal")}
              />
            </Box>
          </>
        ) : (
          <MachrabordFilters />
        )}
      </Box>
    </Container>
  );
};


