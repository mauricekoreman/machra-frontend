import { AppBar, Toolbar, Typography, useScrollTrigger } from "@mui/material";
import { ReactNode } from "react";

interface Header {
  headerLeft: ReactNode | null;
  headerTitle: string | null | undefined;
}

export const Header: React.FC<Header> = ({ headerLeft, headerTitle = "Lug-dunum Machra" }) => {
  const scrollTrigger = useScrollTrigger({ threshold: 0, disableHysteresis: true });

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
      <Toolbar>
        {headerLeft}
        <Typography sx={{ ml: 1 }} variant='h6'>
          {headerTitle}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

