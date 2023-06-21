import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Container } from "@mui/material";

import { StoryCard } from "../../lib/story-card/story-card.component";

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
    </Container>
  );
};

