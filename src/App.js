import React from "react";
import { Grid } from "@material-ui/core";

import CarCanvas from "./components/Canvas/CarCanvas/CarCanvas";
import NetworkCanvas from "./components/Canvas/NetworkCanvas/NetworkCanvas";
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
          <CarCanvas />
        </div>
      </Grid>
      <Grid item container direction="column" xs spacing={2}>
        <div className={classes.container}>
          <NetworkCanvas />
        </div>
      </Grid>
    </Grid>
  );
};

export default App;
