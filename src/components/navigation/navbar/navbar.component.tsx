import { Box, Divider, Drawer, IconButton, List, ListItem, ListItemIcon } from "@mui/material";
import { useMemo, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Header } from "../header/header.component";
import styled from "@emotion/styled";

import { MdLibraryBooks, MdList, MdSettings } from "react-icons/md";
import { BsDice3Fill } from "react-icons/bs";
import { MdMenu as MenuIcon } from "react-icons/md";

import wapen from "../../../assets/wapen.png";

import { theme } from "../../../theme";

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: black;
  flex: 1;
  display: flex;
  align-items: center;
  gap: 1em;
  padding-top: 0.9em;
  padding-bottom: 0.9em;
  padding-left: 1em;
  padding-right: 1em;
  border-radius: 100px;
  background-color: transparent;
  transition: all 0.1s ease;

  &:hover,
  &:hover svg,
  &.active,
  &.active svg {
    background-color: ${theme.palette.primary.main};
    color: ${theme.palette.primary.contrastText};
  }
`;

const drawerWidth = 270;
const iconSize = 21;
const navItems = [
  {
    text: "Alle verhalen",
    href: "/",
    icon: <MdLibraryBooks size={iconSize} />,
  },
  {
    text: "Spelen",
    href: "/spelen",
    icon: <BsDice3Fill size={iconSize - 4} />,
  },
  {
    text: "De regels",
    href: "/regels",
    icon: <MdList size={iconSize} />,
  },
  {
    text: "Test page",
    href: "/test",
    icon: <MdSettings />,
  },
];

export const Navbar: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const currentLocation = useMemo(
    () => navItems.find((el) => el.href === location.pathname),
    [location]
  );

  const toggleDrawer = () => {
    setSidebarOpen((prevState) => !prevState);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header
        headerTitle={currentLocation?.text}
        headerLeft={
          <IconButton color='inherit' size='large' edge='start' onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
        }
      />
      <Box component='nav'>
        <Drawer
          ModalProps={{ keepMounted: true }} // Better open performance on mobile
          variant='temporary'
          anchor='left'
          open={sidebarOpen}
          onClose={toggleDrawer}
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              borderTopRightRadius: "18px",
              borderBottomRightRadius: "18px",
            },
          }}
        >
          <img
            alt='Machra wapen'
            src={wapen}
            style={{
              width: 120,
              height: 120,
              objectFit: "contain",
              display: "block",
              margin: "0 auto",
            }}
          />
          <Divider sx={{ mx: 3 }} />
          <List sx={{ px: 2 }}>
            {navItems.map((navItem) => (
              <ListItem key={navItem.text} sx={{ p: 0 }} onClick={toggleDrawer}>
                <StyledNavLink to={navItem.href}>
                  <ListItemIcon sx={{ minWidth: 0 }}>{navItem.icon}</ListItemIcon>
                  {navItem.text}
                </StyledNavLink>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Box>
      <Outlet />
    </Box>
  );
};

