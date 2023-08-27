import { Box, Container, IconButton, Skeleton, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../navigation/header";
import { MdArrowBack as BackIcon } from "react-icons/md";
import { useScroll } from "../../../hooks/useScroll";
import { MdModeEditOutline as EditIcon } from "react-icons/md";
import { httpGetStoryById } from "../../../api/storiesService";
import { useAuthState } from "../../state/auth/auth.provider";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { Error } from "../../../api/apiTypes";

export const Verhaal = () => {
  const { user } = useAuthState();
  const { scrollY } = useScroll();
  const navigate = useNavigate();
  const { verhaalId } = useParams();

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

  if (error instanceof AxiosError) {
    toast((error.response?.data as Error).message, { type: "error" });
  }

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
      <Container component='main' sx={{ mb: 4 }}>
        <Box>
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
            </>
          )}
        </Box>
      </Container>
    </>
  );
};
