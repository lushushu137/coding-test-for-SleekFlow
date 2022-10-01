import React from "react";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

const PersonalInfo = (props) => {
  const { status, gender, species, location, origin, created } =
    props.character;
  return (
    <React.Fragment>
      <Box
        sx={{
          mt: 1,
          mb: 1,
          p: 2,
          border: 1,
          borderRadius: 2,
          borderColor: "text.secondary",
        }}
      >
        <Grid container>
          <Grid container xs={6}>
            <Grid xs={12}>
              <Typography variant="body2" gutterBottom>
                Status: {status}
              </Typography>
            </Grid>
            <Grid xs={12}>
              <Typography variant="body2" gutterBottom>
                Gender: {gender}
              </Typography>
            </Grid>
            <Grid xs={12}>
              <Typography variant="body2">Species: {species}</Typography>
            </Grid>
          </Grid>
          <Grid container xs={6}>
            <Grid xs={12}>
              <Typography variant="body2" gutterBottom>
                Location: {location ? location.name : "unknown"}
              </Typography>
            </Grid>
            <Grid xs={12}>
              <Typography variant="body2" gutterBottom>
                Origin: {origin ? origin.name : "unknwon"}
              </Typography>
            </Grid>
            <Grid xs={12}>
              <Typography variant="body2">
                Created:{" "}
                {`${created?.split("T")[0]}  
                ${created?.split("T")[1].split(".")[0]}`}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default PersonalInfo;
