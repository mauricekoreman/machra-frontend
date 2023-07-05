import { Box, Typography } from "@mui/material";
import { Button } from "../../lib/button/button.component";

export const EindeState: React.FC<{ onClickOpnieuw: () => void; onClickStoppen: () => void }> = ({
  onClickOpnieuw,
  onClickStoppen,
}) => (
  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 6, gap: 2 }}>
    <Typography variant='h5'>Einde van Machrabord</Typography>
    <Typography>Alle verhalen zijn gebruikt</Typography>
    <Typography>Speel opnieuw of stoppen?</Typography>

    <Box
      sx={{
        position: "fixed",
        bottom: 30,
        display: "flex",
        justifyContent: "space-between",
        gap: 3,
      }}
    >
      <Button title='Opnieuw' onClick={onClickOpnieuw} />
      <Button title='Stoppen' onClick={onClickStoppen} />
    </Box>
  </Box>
);
