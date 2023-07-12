import { useLoaderData, useNavigate } from "react-router-dom";
import { Box, Container, Fab, Typography } from "@mui/material";

import { StoryCard } from "../../lib/story-card/story-card.component";
import { MdOutlineEdit as EditIcon } from "react-icons/md";
import { SearchWithFilter } from "../../lib/searchbar";

export interface Verhaal {
  id: string;
  title: string;
  description: string;
  active: boolean;
  year_of_story: number;
  created_at: string;
}

export const Verhalen = () => {
  const { data: verhalen, error } = useLoaderData() as { data: Verhaal[]; error: any };

  const navigate = useNavigate();

  return (
    <Container
      component='main'
      sx={{
        paddingTop: 2,
        paddingBottom: 3,
      }}
    >
      <SearchWithFilter />
      <Box
        sx={{
          display: "grid",
          mt: 3,
          gap: 3,
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gridAutoFlow: "dense",
        }}
      >
        {verhalen.map((data, index) => (
          <StoryCard
            key={index}
            data={data}
            expanded={false}
            onClick={() => navigate(`/verhalen/${data.id}`, { state: data })}
          />
        ))}
        {verhalen.length === 0 && (
          <Typography fontSize={20} textAlign={"center"}>
            Nog geen Machrabord verhalen!
          </Typography>
        )}
      </Box>
      <Fab
        color='primary'
        onClick={() => navigate("/nieuw-verhaal")}
        variant='extended'
        sx={{
          position: "fixed",
          right: "1rem",
          bottom: "2rem",
          display: "flex",
          gap: 1,
          textTransform: "capitalize",
          borderRadius: 5,
          py: 4,
        }}
      >
        <EditIcon size={21} />
        Nieuw verhaal
      </Fab>
    </Container>
  );
};









































































