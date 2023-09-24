import { Box, Typography } from "@mui/material";
import { Button } from "../../lib/button/button.component";

import winnaarImg from "../../../assets/img/leo.png";

type Props = {
  onClickContinue: () => void;
  onClickStop: () => void;
};

export const WinnaarState: React.FC<Props> = ({ onClickContinue, onClickStop }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      mt: 3,
      gap: 2,
    }}
  >
    <Typography variant='h5'>Winnaar van het spel!</Typography>
    <Typography textAlign={"center"}>
      Je bent een winnaar Super 'vo. Niet dat dat je later gaat helpen bij je carriere, maar toch
      leuk man. Hierbij win je een lidmaatschap voor clubje 1. Nee grapje. Alleen als je pappie een
      wijnkelder heeft.
    </Typography>
    <Typography>Adt je drankje.</Typography>

    <img src={winnaarImg} alt='Een winnaar' />

    <Box
      sx={{
        position: "fixed",
        bottom: 30,
        display: "flex",
        justifyContent: "space-between",
        gap: 1,
      }}
    >
      <Button title='Speel door' onClick={onClickContinue} />
      <Button title='Stoppen' onClick={onClickStop} />
    </Box>
  </Box>
);

