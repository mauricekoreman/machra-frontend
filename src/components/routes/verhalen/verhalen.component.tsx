import { useNavigate } from "react-router-dom";
import { Box, Container, Fab, Skeleton, Typography } from "@mui/material";

import { StoryCard } from "../../lib/story-card/story-card.component";
import { MdOutlineEdit as EditIcon } from "react-icons/md";
import { SearchWithFilter } from "../../lib/searchbar";
import { useVerhalenState } from "../../state/machrabord/verhalen.provider";
import { useCallback, useEffect, useState } from "react";
import { GetStoriesParams } from "../../../api/storiesService";

export interface Verhaal {
  id: string;
  title: string;
  description: string;
  active: boolean;
  year_of_story: number;
  created_at: string;
}

export const Verhalen = () => {
  const { verhalen, setVerhalen } = useVerhalenState();
  const [loadingFilters, setLoadingFilters] = useState(false);

  const navigate = useNavigate();

  const settingVerhalen = useCallback(
    async (params?: GetStoriesParams) => {
      setLoadingFilters(true);
      setVerhalen(params).then(() => setLoadingFilters(false));
    },
    [setVerhalen]
  );

  useEffect(() => {
    if (verhalen === null) {
      settingVerhalen();
    }
  }, [settingVerhalen, verhalen]);

  return (
    <Container
      component='main'
      sx={{
        paddingTop: 2,
        paddingBottom: 3,
      }}
    >
      <SearchWithFilter getData={settingVerhalen} />
      <Box
        sx={{
          display: "grid",
          mt: 3,
          gap: 3,
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gridAutoFlow: "dense",
        }}
      >
        {verhalen && !loadingFilters ? (
          <>
            {verhalen.map((data, index) => (
              <StoryCard
                key={index}
                data={data}
                expanded={true}
                onClick={() => navigate(`/verhalen/${data.id}`, { state: data })}
              />
            ))}
            {verhalen.length === 0 && (
              <Typography fontSize={20} textAlign={"center"}>
                Nog geen Machrabord verhalen!
              </Typography>
            )}
          </>
        ) : (
          [...Array(3)].map((_, i) => (
            <Skeleton
              key={i}
              variant='rounded'
              sx={{ borderRadius: 5 }}
              width={"100%"}
              height={200}
            />
          ))
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
