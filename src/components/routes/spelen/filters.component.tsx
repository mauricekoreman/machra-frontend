import {
  Box,
  CircularProgress,
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
import { useEffect, useMemo, useState } from "react";
import { machraJarenObj } from "../../../utils/machrajaren";
import { useMachrabordDispatch } from "../../state/machrabord/machrabord.provider";
import { useQuery } from "@tanstack/react-query";
import { httpGetStories } from "../../../api/storiesService";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { Error } from "../../../api/apiTypes";

interface machrabordFilters {
  date1: number | undefined;
  date2: number | undefined;
  active: boolean | undefined;
}

export const MachrabordFilters = () => {
  const machrabordDispatch = useMachrabordDispatch();

  const machraJaren = useMemo(() => machraJarenObj(), []);

  const [activeOrDate, setActiveOrDate] = useState<"active" | "date">("active");
  const [beginjaar, setBeginjaar] = useState("");
  const [eindjaar, setEindjaar] = useState("");

  const [filters, setFilters] = useState<machrabordFilters>({} as machrabordFilters);

  const {
    data: machrabordVerhalen,
    isFetching,
    isSuccess,
    error,
  } = useQuery({
    queryKey: ["machrabord-verhalen", filters],
    queryFn: async () =>
      await httpGetStories({ params: { ...filters, withAlwaysActiveStories: true } }),
    enabled: Object.keys(filters).length > 0,
  });

  function updateFilter(e: React.ChangeEvent<HTMLInputElement>) {
    setActiveOrDate((e.target as HTMLInputElement).value as "active" | "date");
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

    setFilters({ date1, date2, active });
  }

  if (
    machrabordVerhalen?.items &&
    machrabordVerhalen.items.length > 0 &&
    isSuccess &&
    Object.keys(filters).length > 0
  ) {
    machrabordDispatch({ type: "start", payload: machrabordVerhalen.items });
  }

  useEffect(() => {
    if (error instanceof AxiosError) {
      toast((error.response?.data as Error).message, { type: "error" });
    }

    if (machrabordVerhalen?.items && machrabordVerhalen.items.length <= 0) {
      toast("Geen Machrabordverhalen beschikbaar met dit filter... :(", { type: "warning" });
    }
  }, [error, machrabordVerhalen?.items]);

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
      <FormControl disabled={isFetching}>
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
        <FormControl fullWidth disabled={activeOrDate === "active" || isFetching}>
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

        <FormControl fullWidth disabled={activeOrDate === "active" || !beginjaar || isFetching}>
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
      <Button
        title='Start Machrabord'
        onClick={startMachrabord}
        sx={{ marginTop: "auto" }}
        disabled={isFetching || (activeOrDate === "date" && (!beginjaar || !eindjaar))}
      />
      {isFetching && <CircularProgress sx={{ mt: 3 }} />}
    </Box>
  );
};




























