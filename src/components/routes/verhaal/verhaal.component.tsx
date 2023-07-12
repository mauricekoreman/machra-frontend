import { Box, Container, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { Verhaal as IVerhaal } from "../verhalen/verhalen.component";
import { Header } from "../../navigation/header";
import { MdArrowBack as BackIcon } from "react-icons/md";
import { useScroll } from "../../../hooks/useScroll";

export const Verhaal = () => {
  const { scrollY } = useScroll();
  const navigate = useNavigate();
  const { state }: { state: IVerhaal } = useLocation();
  const { description, title } = state;

  return (
    <>
      <Header
        headerLeft={<BackIcon size={27} color='inherit' onClick={() => navigate(-1)} />}
        headerTitle={scrollY > 30 ? title : ""}
      />
      <Container component='main' sx={{ mb: 4 }}>
        <Box>
          <Typography variant='h6' sx={{ mb: 1 }}>
            {title}
          </Typography>
          <Typography variant='body1'>{description}</Typography>
        </Box>
      </Container>
    </>
  );
};



