import { useLoaderData, useNavigate } from "react-router-dom";
import { Container, Fab } from "@mui/material";

import { StoryCard } from "../../lib/story-card/story-card.component";
import { MdOutlineEdit as EditIcon } from "react-icons/md";

export interface Verhaal {
  id: string;
  title: string;
  story: string;
  punishment: string;
  tile: number;
  active: boolean;
}

export const Verhalen = () => {
  const verhalen = useLoaderData() as Verhaal[];

  const navigate = useNavigate();

  return (
    <Container
      component='main'
      sx={{
        paddingTop: 2,
        paddingBottom: 3,
        display: "grid",
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

