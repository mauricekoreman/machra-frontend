import { Box, Stack } from "@mui/material";
import { Searchbar } from ".";
import { MdOutlineFilterAlt as FilterIcon } from "react-icons/md";

export const SearchWithFilter = () => (
  <Stack direction={"row"} spacing={1}>
    <Searchbar />
    <Box
      component={"button"}
      sx={{
        display: "grid",
        placeItems: "center",
        backgroundColor: "#e6eaeba9",
        width: "3.2rem",
        borderRadius: "8px",
        border: "1px solid #e6eaebfc",
      }}
    >
      <FilterIcon size={21} />
    </Box>
  </Stack>
);

