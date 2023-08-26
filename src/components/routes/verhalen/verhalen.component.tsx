import { useNavigate } from "react-router-dom";
import { Box, CircularProgress, Container, Fab, Skeleton, Typography } from "@mui/material";

import { StoryCard } from "../../lib/story-card/story-card.component";
import { MdOutlineEdit as EditIcon } from "react-icons/md";
import { SearchWithFilter } from "../../lib/searchbar";
import { useEffect, useState } from "react";
import { GetStoriesParams, httpGetStories } from "../../../api/storiesService";

import { useInView } from "react-intersection-observer";
import { useInfiniteVerhalen } from "../../../hooks/useInfiniteVerhalen";
import { useQuery } from "@tanstack/react-query";
import { useAuthDispatch } from "../../state/auth/auth.provider";
import { AxiosError } from "axios";

export interface Verhaal {
  id: string;
  title: string;
  description: string;
  active: boolean;
  year_of_story: number;
  created_at: string;
}

export const Verhalen = () => {
  const navigate = useNavigate();
  const { ref, inView } = useInView();
  const authDispatch = useAuthDispatch();
  const [allFetchedStories, setAllFetchedStories] = useState<Verhaal[]>([]);

  // Getting all the stories on infinite scroll
  const {
    data: infiniteVerhalen,
    error: infiniteError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isInitialLoading,
  } = useInfiniteVerhalen();

  const [query, setQuery] = useState<GetStoriesParams>({});
  const isSearchActive = Boolean(query?.date1 || query?.date2 || query?.search);

  // Getting stories based on search params
  const {
    data: searchVerhalen,
    isLoading: isLoadingSearch,
    error: searchError,
    isFetching: isFetchingSearch,
  } = useQuery({
    queryKey: ["searchVerhalen", query],
    enabled: isSearchActive,
    staleTime: 60000,
    refetchOnWindowFocus: false,
    queryFn: async () => await httpGetStories({ params: query }),
    retry: (failureCount, error) => {
      if ((error as AxiosError).response?.status === 401) {
        authDispatch({ type: "signout" });
      }
      return failureCount < 3 ? true : false;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  // Setting stories array based on if there is a search going on or not
  useEffect(() => {
    if (isSearchActive && !isLoadingSearch) {
      setAllFetchedStories(searchVerhalen ? searchVerhalen.items : []);
    } else {
      setAllFetchedStories(
        infiniteVerhalen ? infiniteVerhalen.pages.flatMap((obj) => obj?.items) : []
      );
    }
  }, [infiniteVerhalen, searchVerhalen, query, isLoadingSearch, isSearchActive]);

  return (
    <Container
      component='main'
      sx={{
        flex: 1,
        height: "100%",
        paddingTop: 2,
        paddingBottom: 3,
      }}
    >
      <SearchWithFilter getData={(search) => setQuery(search)} />
      <Box
        sx={{
          mt: 3,
          display: "grid",
          gap: 3,
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gridAutoFlow: "dense",
        }}
      >
        {infiniteError || searchError ? (
          // todo: display notification
          <Typography variant='body1'>Error!</Typography>
        ) : !isInitialLoading && !isFetchingSearch ? (
          allFetchedStories.map((verhaal, i) => {
            if (allFetchedStories.length === i + 1 && !isSearchActive) {
              return (
                <div ref={ref} key={verhaal.id}>
                  <StoryCard data={verhaal} onClick={() => navigate(`/verhalen/${verhaal.id}`)} />
                </div>
              );
            }
            return (
              <div key={verhaal.id}>
                <StoryCard data={verhaal} onClick={() => navigate(`/verhalen/${verhaal.id}`)} />
              </div>
            );
          })
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
        {isFetchingNextPage && (
          <CircularProgress style={{ display: "block", margin: "0 auto" }} size={30} />
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
