import {
  Box,
  ButtonBase,
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
import { machraJarenObj } from "../../../utils/machrajaren";
import { useEffect, useMemo, useRef, useState } from "react";
import styled from "@emotion/styled";
import { theme } from "../../../theme";
import { GetStoriesParams } from "../../../api/storiesService";

const FilterButton = styled(ButtonBase)<{ showbubble: boolean | undefined }>`
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

interface Props {
  getData: (params?: GetStoriesParams) => void;
}

export const SearchWithFilter = ({ getData }: Props) => {
  const [showFilters, setShowFilters] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const [beginjaar, setBeginjaar] = useState("mount");
  const [eindjaar, setEindjaar] = useState("mount");

  const areFiltersSet = Boolean(beginjaar) && beginjaar !== "mount";

  const machraJaren = useMemo(() => machraJarenObj(), []);

  function handleChangeDate(e: SelectChangeEvent, type: "begin" | "eind") {
    type === "begin"
      ? setBeginjaar(e.target.value as string)
      : setEindjaar(e.target.value as string);
  }

  function handleSearch(e?: React.FormEvent) {
    e?.preventDefault();

    const date1 = beginjaar === "" || beginjaar === "mount" ? undefined : Number(beginjaar);
    const date2 = eindjaar === "" || eindjaar === "mount" ? undefined : Number(eindjaar);
    const search = searchRef.current?.value;

    getData({ date1, date2, search });
  }

  function clearFilters() {
    setBeginjaar("");
    setEindjaar("");
  }

  useEffect(() => {
    // should only happen on a change, not on first render.
    // can only happen when jaren are a number or have an empty string
    if (beginjaar !== "mount" || eindjaar !== "mount") {
      handleSearch();
    }
    // eslint-disable-next-line
  }, [beginjaar, eindjaar]);

  return (
    <Box>
      <Stack component={"form"} direction={"row"} spacing={1} onSubmit={handleSearch}>
        <Searchbar inputRef={searchRef} />
        <FilterButton
          showbubble={areFiltersSet ? areFiltersSet : undefined}
          onClick={() => setShowFilters((prevState) => !prevState)}
          type='button'
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
                value={beginjaar === "mount" ? "" : beginjaar}
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

            <FormControl fullWidth disabled={!beginjaar}>
              <InputLabel size='small' id='eindjaar-label'>
                Eindjaar
              </InputLabel>
              <Select
                size='small'
                labelId='eindjaar-label'
                value={eindjaar === "mount" ? "" : eindjaar}
                label='Eindjaar'
                onChange={(e) => handleChangeDate(e, "eind")}
              >
                {machraJaren.values
                  .slice(machraJaren.values.indexOf(Number(beginjaar)))
                  .map((jaar) => (
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


























