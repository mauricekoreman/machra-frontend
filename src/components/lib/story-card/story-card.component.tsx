import styled from "@emotion/styled";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { MdClose as CloseIcon } from "react-icons/md";
import { Verhaal } from "../../routes/verhalen/verhalen.component";
import React, { SyntheticEvent } from "react";

const StyledCard = styled(motion.div)<{ isSelected: boolean }>`
  ${({ isSelected }) =>
    isSelected && {
      position: "fixed",
      zIndex: 3,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: "100vw",
      height: "100vh",
    }}
`;

const CloseBtn = styled(motion.div)`
  position: absolute;
  right: 1rem;
  top: 1rem;
  z-index: 10;
`;

const StyledStory = styled(motion.p)<{ expanded: boolean }>`
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${({ expanded }) => (expanded ? "none" : 7)};
`;

export const StoryCard: React.FC<{
  index: number;
  data: Verhaal;
  isSelectedCard: boolean;
  setSelectedCard: React.Dispatch<React.SetStateAction<number>>;
}> = ({ index, data, isSelectedCard, setSelectedCard }) => {
  const { story, title, tile, active, punishment } = data;

  function goBack(e: SyntheticEvent) {
    setSelectedCard(-1);
    e.stopPropagation();
  }

  return (
    <Card
      onClick={() => setSelectedCard(index)}
      sx={{ borderRadius: isSelectedCard ? 0 : 5, px: 1, pt: 0.5 }}
      isSelected={isSelectedCard}
      component={StyledCard}
      layoutId={`card-container--index-${index}`}
      variant='outlined'
      transition={{ type: "spring", stiffness: 400, damping: 40 }}
    >
      <CardContent
        sx={{ position: "relative" }}
        component={motion.div}
        layoutId={`card-content--index-${index}`}
      >
        {isSelectedCard && (
          <CloseBtn
            layoutId={`close-button--index-${index}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <CloseIcon size={27} onClick={goBack} />
          </CloseBtn>
        )}
        <Typography component={motion.h6} layout='position' variant='h6' sx={{ mb: 1 }}>
          {title}
        </Typography>
        <Typography
          component={StyledStory}
          expanded={isSelectedCard}
          variant='body1'
          transition={{ duration: 1 }}
          layout='position'
          layoutId={`card-text--index-${index}`}
        >
          {story}
        </Typography>
      </CardContent>
    </Card>
  );
};











