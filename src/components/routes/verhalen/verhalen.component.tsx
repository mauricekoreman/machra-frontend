import { useNavigate } from "react-router-dom";
import { Box, CircularProgress, Container, Fab, Skeleton } from "@mui/material";

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
import { toast } from "react-toastify";
import { useDebounce } from "../../../hooks/useDebounce";

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
  const debouncedQuery = useDebounce(query, 300) as GetStoriesParams;

  const isSearchActive = Boolean(
    debouncedQuery?.date1 || debouncedQuery?.date2 || debouncedQuery?.search
  );

  // Getting stories based on search params
  const {
    data: searchVerhalen,
    isLoading: isLoadingSearch,
    error: searchError,
    isFetching: isFetchingSearch,
  } = useQuery({
    queryKey: ["searchVerhalen", debouncedQuery],
    enabled: isSearchActive,
    staleTime: 60000,
    refetchOnWindowFocus: false,
    queryFn: async () => await httpGetStories({ params: debouncedQuery }),
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
  let allFetchedVerhalenLet = [];
  if (isSearchActive && !isLoadingSearch) {
    allFetchedVerhalenLet = searchVerhalen ? searchVerhalen.items : [];
  } else {
    allFetchedVerhalenLet = infiniteVerhalen
      ? infiniteVerhalen.pages.flatMap((obj) => obj?.items)
      : [];
  }

  useEffect(() => {
    if (infiniteError || searchError) {
      toast("Something went wrong...", { type: "error" });
    }
  }, [infiniteError, searchError]);

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
      <SearchWithFilter setSearch={setQuery} />
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
          <></>
        ) : !isInitialLoading && !isFetchingSearch ? (
          allFetchedVerhalenLet.map((verhaal, i) => {
            if (allFetchedVerhalenLet.length === i + 1 && !isSearchActive) {
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
