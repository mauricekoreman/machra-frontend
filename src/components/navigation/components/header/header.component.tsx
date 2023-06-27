import { AppBar, Box, Button, Toolbar, Typography, useScrollTrigger } from "@mui/material";
import { ReactNode } from "react";
import { useMachrabord } from "../../../contexts/machrabord/machrabord.provider";

interface Header {
  headerLeft: ReactNode | null;
  headerTitle: string | null | undefined;
}

export const Header: React.FC<Header> = ({ headerLeft, headerTitle = "Lug-dunum Machra" }) => {
  const scrollTrigger = useScrollTrigger({ threshold: 0, disableHysteresis: true });
  const { isMachrabordActive, startStopMachrabordSession } = useMachrabord();

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
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {headerLeft}
          <Typography sx={{ ml: 1 }} variant='h6'>
            {headerTitle}
          </Typography>
        </Box>
        {isMachrabordActive && (
          <Button
            size='medium'
            color='error'
            variant='text'
            sx={{ textTransform: "capitalize" }}
            onClick={() => startStopMachrabordSession("stop")}
          >
            Stop Machrabord
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

