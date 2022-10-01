import React from "react";

import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import imageForEmpty from "../assets/img/empty.png";

const Empty = () => {
  return (
    <Box
      alignItems="center"
      justifyContent="center"
      display="flex"
      height="100%"
      flexDirection="column"
    >
      <Typography variant="h4" sx={{ fontWeight: 600 }} gutterBottom>
        {" "}
        NOTHING FOR NOW...
      </Typography>
      <img
        width="200px"
        src={imageForEmpty}
        alt=""
        style={{ filter: "saturate(0.5)" }}
      ></img>
    </Box>
  );
};

export default Empty;
