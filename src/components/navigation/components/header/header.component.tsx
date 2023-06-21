import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { MdMenu as MenuIcon } from "react-icons/md";

interface Header {
  onMenuButtonClick: () => void;
}

export const Header: React.FC<Header> = ({ onMenuButtonClick }) => {
  return (
    <AppBar
      position='sticky'
      variant='outlined'
      elevation={0}
      sx={{ backgroundColor: "#ffffff55", backdropFilter: "blur(10px)", zIndex: 1 }}
    >
      <Toolbar sx={{ color: "primary.main" }}>
        <IconButton
          size='large'
          edge='start'
          color='inherit'
          sx={{ mr: 2 }}
          onClick={onMenuButtonClick}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant='h6'>Lug-dunum Machra</Typography>
      </Toolbar>
    </AppBar>
  );
};

