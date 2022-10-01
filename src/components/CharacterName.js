import React from "react";
import { Stack, Avatar, Typography } from "@mui/material";

const CharacterName = (props) => {
  const { image, name } = props.character;
  return (
    <Stack direction="row" spacing={4} alignItems="center" sx={{ mb: 2 }}>
      <Avatar alt={name} src={image} sx={{ width: 80, height: 80 }} />
      <Typography variant="h3" fontWeight={600}>
        {name}{" "}
      </Typography>
    </Stack>
  );
};

export default CharacterName;
