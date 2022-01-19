import React from "react";
import Grid from "@mui/material/Grid";

//style
import useStyles from "../styles/PageNotFound";

export default function AccessForbiden() {
  const classes = useStyles();
  return (
    <Grid className={classes.content} container justify="center">
      <h1 className={classes.descError}>
        ERROR 403
        <p className={classes.textError}>ACCESS FORBIDDEN</p>
      </h1>
    </Grid>
  );
}