import {
  Box,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { Button } from "../../lib/button/button.component";
import { useMemo, useState } from "react";
import { machraJarenObj } from "../../../utils/machrajaren";
import { useMachrabordDispatch } from "../../state/machrabord/machrabord.provider";
import { useVerhalenState } from "../../state/machrabord/verhalen.provider";

export const MachrabordFilters = () => {
  const dispatch = useMachrabordDispatch();
  const { setVerhalen } = useVerhalenState();

  const machraJaren = useMemo(() => machraJarenObj(), []);

  const [activeOrDate, setActiveOrDate] = useState("active");
  const [beginjaar, setBeginjaar] = useState("");
  const [eindjaar, setEindjaar] = useState("");

  function updateFilter(e: React.ChangeEvent<HTMLInputElement>) {
    setActiveOrDate((e.target as HTMLInputElement).value);
  }

  function handleChangeDate(e: SelectChangeEvent, type: "begin" | "eind") {
    type === "begin"
      ? setBeginjaar(e.target.value as string)
      : setEindjaar(e.target.value as string);
  }

  async function startMachrabord() {
    const date1 = beginjaar === "" || activeOrDate === "active" ? undefined : Number(beginjaar);
    const date2 = eindjaar === "" || activeOrDate === "active" ? undefined : Number(eindjaar);
    const active = activeOrDate === "active" ? true : undefined;

    const verhalen = await setVerhalen({ date1, date2, active });
    dispatch({ type: "start", payload: verhalen });
  }

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography sx={{ mb: 8, mt: 4 }} variant='h4'>
        Stel filters in
      </Typography>
      <FormControl>
        <RadioGroup value={activeOrDate} onChange={updateFilter}>
          <FormControlLabel
            control={<Radio />}
            label='Huidige Machrabord versie'
            labelPlacement='end'
            value='active'
          />
          <FormControlLabel
            control={<Radio />}
            label='Selecteer een datum range'
            labelPlacement='end'
            value='date'
          />
        </RadioGroup>
      </FormControl>

      <Box sx={{ display: "flex", width: "100%", maxWidth: "20rem", gap: 2, mt: 4, mb: 6 }}>
        <FormControl fullWidth disabled={activeOrDate === "active"}>
          <InputLabel id='beginjaar-label'>Beginjaar</InputLabel>
          <Select
            labelId='beginjaar-label'
            value={beginjaar}
            label='Beginjaar'
            onChange={(e) => handleChangeDate(e, "begin")}
          >
            {machraJaren.values.map((jaar, index) => (
              <MenuItem key={jaar} value={jaar}>
                {machraJaren.ui[index]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth disabled={activeOrDate === "active" || !beginjaar}>
          <InputLabel id='eindjaar-label'>Eindjaar</InputLabel>
          <Select
            labelId='eindjaar-label'
            value={eindjaar}
            label='Eindjaar'
            onChange={(e) => handleChangeDate(e, "eind")}
          >
            {machraJaren.values.slice(machraJaren.values.indexOf(Number(beginjaar))).map((jaar) => (
              <MenuItem key={jaar} value={jaar}>
                {jaar}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Button title='Start Machrabord' onClick={startMachrabord} sx={{ marginTop: "auto" }} />
    </Box>
  );
};























