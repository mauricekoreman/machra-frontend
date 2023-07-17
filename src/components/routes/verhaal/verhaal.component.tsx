import { Alert, Box, Container, Skeleton, Snackbar, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Verhaal as IVerhaal } from "../verhalen/verhalen.component";
import { Header } from "../../navigation/header";
import { MdArrowBack as BackIcon } from "react-icons/md";
import { useScroll } from "../../../hooks/useScroll";
import { MdModeEditOutline as EditIcon } from "react-icons/md";
import { useEffect, useState } from "react";
import { httpGetStoryById } from "../../../api/storiesService";
import { useAuthState } from "../../state/auth/auth.provider";

export const Verhaal = () => {
  const { user } = useAuthState();
  const { scrollY } = useScroll();
  const navigate = useNavigate();
  const { verhaalId } = useParams();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [verhaal, setVerhaal] = useState<IVerhaal>({} as IVerhaal);
  const { title, description } = verhaal;

  const allowVerhaalEdit = user.roles.some((role) => role === "admin" || role === "manager");

  async function fetchStory() {
    const { data, error } = await httpGetStoryById(verhaalId as string);
    data && setVerhaal(data);

    if (error) {
      setErrorMessage(error.message);
    }

    setLoading(false);
  }

  useEffect(() => {
    setLoading(true);
    fetchStory();
  }, []);

  return (
    <>
      <Header
        headerLeft={<BackIcon size={27} color='inherit' onClick={() => navigate(-1)} />}
        headerTitle={scrollY > 30 ? title : ""}
        headerRight={
          allowVerhaalEdit &&
          !loading && (
            <EditIcon
              size={23}
              color='inherit'
              onClick={() => navigate("edit", { state: verhaal })}
            />
          )
        }
      />
      <Container component='main' sx={{ mb: 4 }}>
        <Box>
          {loading ? (
            <>
              <Skeleton variant='text' height={"60px"} />
              <Skeleton variant='rounded' height={"70dvh"} />
            </>
          ) : (
            <>
              <Typography variant='h6' fontWeight={700} sx={{ mb: 1 }}>
                {title}
              </Typography>
              <Typography variant='body1' sx={{ whiteSpace: "pre-line" }}>
                {description}
              </Typography>
            </>
          )}
        </Box>
      </Container>
      <Snackbar
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
        open={Boolean(errorMessage)}
        autoHideDuration={2000}
        onClose={() => setErrorMessage(null)}
      >
        <Alert sx={{ width: "100%" }} severity='error'>
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
};
