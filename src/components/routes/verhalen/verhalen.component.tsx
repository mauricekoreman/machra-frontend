import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Container, Fab } from "@mui/material";

import { StoryCard } from "../../lib/story-card/story-card.component";
import { MdOutlineEdit as EditIcon } from "react-icons/md";

export interface Verhaal {
  title: string;
  story: string;
  punishment: string;
  tile: number;
  active: boolean;
}

export const Verhalen = () => {
  const verhalen = useLoaderData() as Verhaal[];
  const [selectedCard, setSelectedCard] = useState(-1);

  const navigate = useNavigate();

  // TODO: add filter component

  return (
    <Container
      role='main'
      sx={{
        paddingTop: 2,
        display: "grid",
        gap: 3,
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gridAutoFlow: "dense",
      }}
    >
      {verhalen.map((data, index) => (
        <StoryCard
          key={index}
          index={index}
          isSelectedCard={selectedCard === index}
          setSelectedCard={setSelectedCard}
          data={data}
        />
      ))}
      {selectedCard === -1 && (
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
      )}
    </Container>
  );
};




























