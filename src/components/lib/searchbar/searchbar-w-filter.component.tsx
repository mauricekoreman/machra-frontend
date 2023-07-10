import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import { Searchbar } from ".";
import {
  MdOutlineFilterAlt as FilterIconOutline,
  MdFilterAlt as FilterIcon,
  MdClose as ClearIcon,
} from "react-icons/md";
import { machraJarenArray } from "../../../utils/machrajaren";
import { useState } from "react";
import styled from "@emotion/styled";
import { theme } from "../../../theme";

const FilterButton = styled(Box)<{ showbubble: boolean | undefined }>`
  position: relative;
  display: grid;
  place-items: center;
  background-color: #e6eaeba9;
  width: 3.2rem;
  border-radius: 8px;
  border: 1px solid #e6eaebfc;

  &::after {
    display: ${({ showbubble }) => (showbubble ? "visible" : "none")};
    position: absolute;
    content: "";
    transform: translate(70%, -80%);
    height: 10px;
    width: 10px;
    border-radius: 100px;
    background-color: ${theme.palette.secondary.main};
  }
`;

export const SearchWithFilter = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [beginjaar, setBeginjaar] = useState("");
  const [eindjaar, setEindjaar] = useState("");

  const areFiltersSet = Boolean(beginjaar);

  function handleChangeDate(e: SelectChangeEvent, type: "begin" | "eind") {
    type === "begin"
      ? setBeginjaar(e.target.value as string)
      : setEindjaar(e.target.value as string);
  }

  function clearFilters() {
    setBeginjaar("");
    setEindjaar("");
  }

  return (
    <Box>
      <Stack direction={"row"} spacing={1}>
        <Searchbar />
        <FilterButton
          showbubble={areFiltersSet ? areFiltersSet : undefined}
          onClick={() => setShowFilters((prevState) => !prevState)}
          component={"button"}
        >
          {areFiltersSet ? <FilterIcon size={21} /> : <FilterIconOutline size={21} />}
        </FilterButton>
      </Stack>

      {showFilters && (
        <Stack sx={{ mt: 2 }} direction={"row"} spacing={1} alignItems={"center"}>
          <Stack direction='row' spacing={1} flex={1}>
            <FormControl fullWidth>
              <InputLabel size='small' id='beginjaar-label'>
                Beginjaar
              </InputLabel>
              <Select
                size='small'
                labelId='beginjaar-label'
                value={beginjaar}
                label='Beginjaar'
                onChange={(e) => handleChangeDate(e, "begin")}
              >
                {machraJarenArray().map((jaar) => (
                  <MenuItem key={jaar} value={jaar}>
                    {jaar}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth disabled={!beginjaar}>
              <InputLabel size='small' id='eindjaar-label'>
                Eindjaar
              </InputLabel>
              <Select
                size='small'
                labelId='eindjaar-label'
                value={eindjaar}
                label='Eindjaar'
                onChange={(e) => handleChangeDate(e, "eind")}
              >
                {machraJarenArray(Number(beginjaar)).map((jaar) => (
                  <MenuItem key={jaar} value={jaar}>
                    {jaar}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
          <ClearIcon size={21} onClick={clearFilters} />
        </Stack>
      )}
    </Box>
  );
};



