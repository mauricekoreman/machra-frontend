import { Box, Container, Skeleton, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { httpGetStoriesAdmin } from "../../../api/storiesService";
import { AxiosError } from "axios";
import { useAuthDispatch } from "../../state/auth/auth.provider";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { StoryCard } from "../../lib/story-card/story-card.component";
import { useNavigate } from "react-router-dom";

export const ManagerDashboard = () => {
  const authDispatch = useAuthDispatch();
  const navigate = useNavigate();

  const { data, error, isFetching } = useQuery({
    queryKey: ["reviewVerhalen"],
    staleTime: 60000,
    refetchOnWindowFocus: false,
    queryFn: async () => await httpGetStoriesAdmin({ isReviewed: false }),
    retry: (failureCount, error) => {
      if ((error as AxiosError).response?.status === 401) {
        authDispatch({ type: "signout" });
      }
      return failureCount < 3 ? true : false;
    },
  });

  useEffect(() => {
    if (error) {
      toast("Something went wrong...", { type: "error" });
    }
  }, [error]);

  return (
    <Container>
      <Typography variant='subtitle1'>Stories to review</Typography>
      {isFetching &&
        [...Array(3)].map((_, i) => (
          <Skeleton
            key={i}
            variant='rounded'
            sx={{ borderRadius: 5 }}
            width={"100%"}
            height={200}
          />
        ))}
      {data &&
        data.map((verhaal) => (
          <Box
            key={verhaal.id}
            sx={{
              mt: 3,
              display: "grid",
              gap: 3,
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gridAutoFlow: "dense",
            }}
          >
            <StoryCard
              key={verhaal.id}
              data={verhaal}
              onClick={() =>
                navigate(`/verhalen/${verhaal.id}`, { state: { reviewVerhaal: true } })
              }
            />
          </Box>
        ))}
    </Container>
  );
};

