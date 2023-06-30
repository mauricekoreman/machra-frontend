import { AppBar, Box, Button, Toolbar, Typography, useScrollTrigger } from "@mui/material";
import { ReactNode } from "react";
import { useMachrabord } from "../../contexts/machrabord/machrabord.provider";
import styled from "@emotion/styled";

interface Header {
  headerLeft: ReactNode | null;
  headerTitle: string | undefined;
}

const TrucateHeaderTitle = styled(Typography)`
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

export const Header: React.FC<Header> = ({ headerLeft, headerTitle = "Lug-dunum Machra" }) => {
  const scrollTrigger = useScrollTrigger({ threshold: 0, disableHysteresis: true });
  const { isMachrabordActive, dispatch } = useMachrabord();

  return (
    <AppBar
      position='sticky'
      elevation={0}
      sx={{
        color: "primary.main",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(8px)",
        zIndex: 1,
        boxShadow: scrollTrigger ? "inset 0px -1px 1px #ebebeb" : "none",
      }}
    >
      <Toolbar sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {headerLeft}
          <TrucateHeaderTitle sx={{ ml: 1, flex: 1 }} variant='h6'>
            {headerTitle}
          </TrucateHeaderTitle>
        </Box>
        {isMachrabordActive && (
          <Button
            size='medium'
            color='error'
            variant='text'
            sx={{ textTransform: "capitalize" }}
            onClick={() => dispatch("stop")}
          >
            Stop Machrabord
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

