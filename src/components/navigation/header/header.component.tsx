import { AppBar, Box, Toolbar, Typography, useScrollTrigger } from "@mui/material";
import { ReactNode } from "react";
import styled from "@emotion/styled";
import { useHeaderState } from "./header.state";

interface Header {
  headerLeft?: ReactNode | null;
  headerRight?: ReactNode | null;
  headerTitle: string | undefined;
}

const TrucateHeaderTitle = styled(Typography)`
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

export const Header: React.FC<Header> = ({ headerLeft, headerRight, headerTitle }) => {
  const headerState = useHeaderState();
  const {
    headerTitle: stateHeaderTitle,
    headerLeft: stateHeaderLeft,
    headerRight: stateHeaderRight,
  } = headerState;

  const scrollTrigger = useScrollTrigger({ threshold: 0, disableHysteresis: true });

  return (
    <AppBar
      position='sticky'
      elevation={0}
      sx={{
        color: "primary.main",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(8px)",
        zIndex: 2,
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
          {stateHeaderLeft ?? headerLeft}
          <TrucateHeaderTitle sx={{ ml: 1, flex: 1 }} variant='h6'>
            {stateHeaderTitle ?? headerTitle}
          </TrucateHeaderTitle>
        </Box>
        {stateHeaderRight ?? headerRight}
      </Toolbar>
    </AppBar>
  );
};

