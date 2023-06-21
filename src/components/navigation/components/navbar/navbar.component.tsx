import { Box, Divider, Drawer, List, ListItem, ListItemIcon } from "@mui/material";
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Header } from "../header/header.component";
import styled from "@emotion/styled";

import { MdLibraryBooks, MdList, MdSettings } from "react-icons/md";
import { BsDice3Fill } from "react-icons/bs";

import wapen from "../../../../assets/wapen.png";

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: black;
  flex: 1;
  display: flex;
  align-items: center;
  gap: 1em;
  padding-top: 0.7em;
  padding-bottom: 0.7em;
  padding-left: 1em;
  padding-right: 1em;
  border-radius: 5px;
  outline: 1px solid #fff;
  background-color: transparent;
  transition: all 0.1s ease;

  &:hover,
  &.active {
    background-color: #deecfc;
    outline: 1px solid #afd3fd;
  }
`;

const drawerWidth = 230;
const iconSize = 21;
const navItems = [
  {
    text: "Spelen",
    href: "/spelen",
    icon: <BsDice3Fill size={iconSize - 4} />,
  },
  {
    text: "Alle verhalen",
    href: "/",
    icon: <MdLibraryBooks size={iconSize} />,
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

  const toggleDrawer = () => {
    setSidebarOpen((prevState) => !prevState);
  };

  return (
    <>
      <Header onMenuButtonClick={toggleDrawer} />
      <Box component='nav'>
        <Drawer
          ModalProps={{ keepMounted: true }} // Better open performance on mobile
          variant='temporary'
          anchor='left'
          open={sidebarOpen}
          onClose={toggleDrawer}
          sx={{
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
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
          <Divider />
          <List sx={{ px: 2 }}>
            {navItems.map((navItem) => (
              <ListItem key={navItem.text} sx={{ p: 0, mb: 1 }} onClick={toggleDrawer}>
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
    </>
  );
};

