import React from "react";
import NavLink from "./MyNavLink";
import { MenuList, ListItemButton, Box, Typography } from "@mui/material";
const SideBar = (props) => {
  return (
    <Box
      sx={{
        p: 4,
        m: 4,
        borderRadius: 4,
        bgcolor: "background.paper",
        height: "90%",
      }}
    >
      <NavLink to="/sleekflow-coding-test/" exact={true}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Rick_and_Morty.svg/800px-Rick_and_Morty.svg.png"
          width="100%"
          alt="Rick and Morty"
          style={{ filter: "saturate(0.5)" }}
        ></img>
      </NavLink>
      <MenuList>
        <NavLink to="/sleekflow-coding-test/contact" exact={true}>
          <ListItemButton>
            <Typography
              variant="h7"
              sx={{
                fontWeight: 200,
                color: "text.primary",
                textAlign: "center",
                width: "100%",
              }}
            >
              Contact
            </Typography>
          </ListItemButton>
        </NavLink>
      </MenuList>
    </Box>
  );
};

export default SideBar;
