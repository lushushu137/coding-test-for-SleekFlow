import React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import welcomeImage from "../assets/img/canDo.png";

const Welcome = () => {
  return (
    <Box
      alignItems="center"
      justifyContent="center"
      display="flex"
      flexDirection="column"
      sx={{
        p: 4,
        m: 4,
        ml: 0,
        borderRadius: 4,
        bgcolor: "background.paper",
        height: "90%",
      }}
    >
      <img
        width="400px"
        src={welcomeImage}
        alt=""
        style={{ filter: "saturate(0.5)" }}
      />
      <Typography variant="p" gutterBottom>
        This site is for the coding test from SleekFlow.
      </Typography>
      <Typography variant="p" color="text.secondary">
        - Made by Lu Shu -
      </Typography>
    </Box>
  );
};

export default Welcome;
