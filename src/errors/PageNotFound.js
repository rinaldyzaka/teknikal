import React from "react";
import Grid from "@mui/material/Grid";

//styles
import useStyles from "../../styles/PageNotFound";

export default function PageNotFound() {
  const classes = useStyles();
  return (
    <Grid className={classes.content} container justify="center">
      <h1 className={classes.descError}>
        ERROR 404
        <p className={classes.textError}>PAGE NOT FOUND</p>
      </h1>
    </Grid>
  );
}
