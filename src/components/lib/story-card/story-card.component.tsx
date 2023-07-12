import styled from "@emotion/styled";
import { Card, CardContent, Typography } from "@mui/material";
import { Verhaal } from "../../routes/verhalen/verhalen.component";
import React from "react";

const StyledStory = styled.p<{ expanded: boolean }>`
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${({ expanded }) => (expanded ? "none" : 7)};
`;

export const StoryCard: React.FC<{
  data: Verhaal;
  expanded: boolean;
  onClick?: () => void;
}> = ({ data, expanded, onClick }) => {
  const { description, title } = data;

  return (
    <Card
      onClick={onClick}
      sx={{
        borderRadius: 5,
        px: 1,
        pt: 0.5,
        overflowY: "auto",
        WebkitOverflowScrolling: "touch",
      }}
      variant='outlined'
    >
      <CardContent sx={{ position: "relative" }}>
        <Typography variant='h6' sx={{ mb: 1 }}>
          {title}
        </Typography>
        <Typography component={StyledStory} expanded={expanded} variant='body1'>
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};






















