import styled from "@emotion/styled";
import { Card, CardContent, Typography } from "@mui/material";
import { Verhaal } from "../../../api/storiesService";
import React from "react";

const StyledStory = styled.p`
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 7;
`;

export const StoryCard: React.FC<{
  data: Verhaal;
  onClick?: () => void;
}> = ({ data, onClick }) => {
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
        height: "100%",
      }}
      variant='outlined'
    >
      <CardContent sx={{ position: "relative" }}>
        <Typography variant='h6' sx={{ mb: 1 }}>
          {title}
        </Typography>
        <Typography component={StyledStory} variant='body1'>
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};























