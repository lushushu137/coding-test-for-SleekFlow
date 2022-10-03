import React, { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import CssBaseline from "@mui/material/CssBaseline";

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import "./App.css";
import Contacts from "./pages/Contacts";
import Welcome from "./pages/Welcome";
import SideBar from "./components/SideBar";
import Box from "@mui/material//Box";

export const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#4a4a4a",
      light: "#aeb7ae",
      dark: "#929292",
    },
    secondary: {
      main: "#a7c7b0",
      light: "#c9ffd6",
    },
    background: {
      default: "#8cccd2",
      paper: "#fcfff8",
    },
    text: {
      primary: "#084e46",
      secondary: "#716e71",
    },
    success: {
      main: "#47854b",
    },
  },
  // palette: {
  //   type: "light",
  //   primary: {
  //     main: "#776c79",
  //     light: "#ded8cc",
  //     dark: "#636069",
  //   },
  //   secondary: {
  //     main: "#d1c4e9",
  //   },
  //   background: {
  //     default: "lightseagreen",
  //     paper: "#fffffe",
  //   },
  //   text: {
  //     primary: "#594a4e",
  //     secondary: "#716e71",
  //   },
  //   success: {
  //     main: "#47854b",
  //   },
  // },
});

const App = () => {
  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router basename="/sleekflow-coding-test">
          <Grid container>
            <Grid xs={2}>
              <SideBar />
            </Grid>
            <Grid xs={10} height="100vh">
              <Switch>
                <Route path="/" exact={true}>
                  <Welcome />
                </Route>
                <Route path="/contact">
                  <Contacts />
                </Route>
                <Redirect to="/" />
              </Switch>
            </Grid>
          </Grid>
        </Router>
      </ThemeProvider>
    </div>
  );
};

export default App;
