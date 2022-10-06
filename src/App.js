import React from "react";
import { Grid } from "@material-ui/core";

import Canvas from "./components/Canvas/Canvas";
import Form from "./components/Form/Form";
import useStyles from "./styles";

const App = () => {
  const classes = useStyles();
  return (
    <Grid container direction="row" spacing={4}>
      <Grid item container direction="column" xs={4} spacing={4}>
        <div className={classes.container}>
          <Form />
        </div>
      </Grid>
      <Grid item container direction="column" xs={8} spacing={2}>
        <Canvas />
      </Grid>
    </Grid>
  );
};

export default App;
