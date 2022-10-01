import React, { useState } from "react";
import {
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Typography,
  Avatar,
} from "@mui/material";
import LazyLoad from "react-lazyload";
import NavLink from "./MyNavLink";
import defaultAvatar from "../assets/img/defaultAvatar.png";
import { useTheme } from "@mui/material/styles";

const ContactItem = (props) => {
  const { name, image, species, id, selectedId, styleFromVirtualScroll } =
    props;
  const theme = useTheme();

  return (
    <NavLink
      to={`/sleekflow-coding-test/contact/${id}`}
      style={
        styleFromVirtualScroll
          ? {
              ...styleFromVirtualScroll,
              top: styleFromVirtualScroll.top + 5,
              height: styleFromVirtualScroll.height - 5,
            }
          : null
      }
    >
      <ListItemButton
        alignItems="flex-start"
        selected={id === selectedId && selectedId !== null}
        sx={{
          mb: 1,
          mt: 1,
          borderRadius: 4,
        }}
      >
        <ListItemAvatar>
          <LazyLoad
            scrollContainer={
              styleFromVirtualScroll
                ? ".virtual-scroll-container"
                : ".scroll-container"
            }
            scroll={true}
            placeholder={
              <img
                width="40"
                height="40"
                src={defaultAvatar}
                alt="logo"
                importance="low"
              />
            }
          >
            <Avatar alt={name} src={image} />
          </LazyLoad>
        </ListItemAvatar>
        <ListItemText
          sx={{ color: "text.primary" }}
          primary={name}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.secondary"
              ></Typography>
              {species}
            </React.Fragment>
          }
        />
      </ListItemButton>
    </NavLink>
  );
};
export default ContactItem;
