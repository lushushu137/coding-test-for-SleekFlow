import React, { useCallback, useState } from "react";
import PersonDetail from "./PersonDetail";
import Empty from "./Empty";
import { Route, Redirect, Switch } from "react-router-dom";
import ContactList from "../components/ContactList";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";

const Contacts = () => {
  return (
    <div className="contacts">
      <Grid container>
        <Grid xs={4} height="100vh">
          <Box
            sx={{
              p: 4,
              mt: 4,
              mb: 4,
              borderRadius: 4,
              bgcolor: "background.paper",
              height: "90%",
            }}
          >
            <ContactList />
          </Box>
        </Grid>
        <Grid xs={8} height="100vh">
          <Box
            sx={{
              p: 4,
              m: 4,
              borderRadius: 4,
              bgcolor: "background.paper",
              height: "90%",
            }}
          >
            <Switch>
              <Route path="/sleekflow-coding-test/contact" exact={true}>
                <Empty />
              </Route>
              <Route path="/sleekflow-coding-test/contact/:id" exact={true}>
                <PersonDetail />
              </Route>
              <Redirect to="/sleekflow-coding-test/contact" />
            </Switch>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Contacts;
