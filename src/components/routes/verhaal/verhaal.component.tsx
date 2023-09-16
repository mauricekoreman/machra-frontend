import { Box, Container, IconButton, Skeleton, Typography } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Header } from "../../navigation/header";
import { MdArrowBack as BackIcon } from "react-icons/md";
import { useScroll } from "../../../hooks/useScroll";
import { MdModeEditOutline as EditIcon } from "react-icons/md";
import { httpDeleteStory, httpGetStoryById, httpPatchStory } from "../../../api/storiesService";
import { useAuthState } from "../../state/auth/auth.provider";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { Error } from "../../../api/apiTypes";
import { useEffect } from "react";
import { Button } from "../../lib/button/button.component";

function displayDate(date: number) {
  if (date === 0) {
    return null;
  } else {
    return date.toString().slice(0, 4) + " / " + date.toString().slice(4);
  }
}

export const Verhaal = () => {
  const { user } = useAuthState();
  const { scrollY } = useScroll();
  const navigate = useNavigate();
  const { verhaalId } = useParams();

  const queryClient = useQueryClient();

  const { state } = useLocation();
  const { reviewVerhaal } = (state as { reviewVerhaal: boolean }) || {};

  const allowVerhaalEdit = user.roles.some((role) => role === "admin" || role === "manager");

  const {
    data: queryVerhaal,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["infinite-verhalen", "verhaal", verhaalId],
    queryFn: async () => await httpGetStoryById(verhaalId as string),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const {
    mutate: handleAccept,
    isLoading: isAcceptLoading,
    error: acceptError,
  } = useMutation(httpPatchStory, {
    onSuccess: () => {
      queryClient.invalidateQueries(["reviewVerhalen"], { refetchType: "all" });
      queryClient.invalidateQueries(["infinite-verhalen"], { exact: true, refetchType: "all" });
      navigate(-1);
    },
  });

  const {
    mutate: handleDeny,
    isLoading: isDenyLoading,
    error: denyError,
  } = useMutation(httpDeleteStory, {
    onSuccess: () => {
      queryClient.removeQueries(["infinite-verhalen", "verhaal", verhaalId]);
      queryClient.invalidateQueries(["reviewVerhalen"], { refetchType: "all" });
      navigate(-1);
    },
  });

  useEffect(() => {
    if (error instanceof AxiosError) {
      toast((error.response?.data as Error).message, { type: "error" });
    }

    if (acceptError instanceof AxiosError) {
      toast((acceptError.response?.data as Error).message, { type: "error" });
    }

    if (denyError instanceof AxiosError) {
      toast((denyError.response?.data as Error).message, { type: "error" });
    }
  }, [error, acceptError, denyError]);

  return (
    <>
      <Header
        headerLeft={
          <IconButton color='inherit' size='large' edge='start' onClick={() => navigate(-1)}>
            <BackIcon />
          </IconButton>
        }
        headerTitle={scrollY > 30 ? queryVerhaal?.title : ""}
        headerRight={
          allowVerhaalEdit &&
          !isLoading && (
            <EditIcon
              size={23}
              color='inherit'
              onClick={() => navigate("edit", { state: queryVerhaal })}
            />
          )
        }
      />
      <Container component='main' sx={{ mb: 4, display: "flex", flexDirection: "column" }}>
        {isLoading ? (
          <>
            <Skeleton variant='text' height={"60px"} />
            <Skeleton variant='rounded' height={"70dvh"} />
          </>
        ) : (
          <>
            <Typography variant='h6' fontWeight={700} sx={{ mb: 1 }}>
              {queryVerhaal?.title}
            </Typography>
            <Typography variant='body1' sx={{ whiteSpace: "pre-line" }}>
              {queryVerhaal?.description}
            </Typography>
            <Typography variant='subtitle2' mt={5}>
              {displayDate(queryVerhaal?.year_of_story as number)}
            </Typography>
            {reviewVerhaal && (
              <Box
                sx={{
                  position: "fixed",
                  bottom: 30,
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 2,
                  alignSelf: "center",
                }}
              >
                {/* We weten dat queryVerhaal niet undefined is omdat isLoading === false hier */}
                <Button
                  title='Wijs af'
                  color='inherit'
                  disabled={isDenyLoading}
                  onClick={() => handleDeny(queryVerhaal?.id as string)}
                />
                <Button
                  title='Accepteer'
                  disabled={isAcceptLoading}
                  onClick={() =>
                    handleAccept({
                      story: { ...queryVerhaal, isReviewed: true },
                      storyId: verhaalId as string,
                    })
                  }
                />
              </Box>
            )}
          </>
        )}
      </Container>
    </>
  );
};




























