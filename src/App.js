import React from "react";
import { Grid } from "@material-ui/core";

import Canvas from "./components/Canvas/Canvas";
import Form from "./components/Form/Form";
import useStyles from "./styles";

const App = () => {
  const classes = useStyles();

  return (
    <Grid container direction="row" spacing={2}>
      <Grid item container direction="column" xs spacing={2}>
        <div className={classes.container}>
          <Form />
        </div>
      </Grid>
      <Grid item container direction="column" xs spacing={2}>
        <div className={classes.container}>
          <Canvas type="carCanvas" />
        </div>
      </Grid>
      <Grid item container direction="column" xs spacing={2}>
        <div className={classes.container}>
          <Canvas type="networkCanvas" />
        </div>
      </Grid>
    </Grid>
  );
};

export default App;
