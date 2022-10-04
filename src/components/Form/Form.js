import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  FormControl,
  Select,
  MenuItem,
  Menu,
  InputLabel,
} from "@material-ui/core";

import useStyles from "./styles.js";

const Form = () => {
  const classes = useStyles();
  const [simulationData, setSimulationData] = useState({
    parallelCars: 500,
    traffic: "",
    hiddenLayers: "",
  });

  const handleSubmit = () => {};
  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.form} ${classes.root}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6"> Train your AI driver </Typography>
        <TextField
          name="parallelCars"
          variant="outlined"
          label="ParallelCars"
          fullWidth
          value={simulationData.parallelCars}
          onChange={(e) =>
            setSimulationData({
              ...simulationData,
              parallelCars: e.target.value,
            })
          }
        />
        <TextField
          name="traffic"
          variant="outlined"
          label="Traffic"
          fullWidth
          value={simulationData.traffic}
          onChange={(e) =>
            setSimulationData({ ...simulationData, traffic: e.target.value })
          }
        />
        <TextField
          name="hiddenLayers"
          variant="outlined"
          label="Hidden Layers"
          fullWidth
          value={simulationData.hiddenLayers}
          onChange={(e) =>
            setSimulationData({
              ...simulationData,
              hiddenLayers: e.target.value,
            })
          }
        />

        <FormControl fullWidth>
          <InputLabel>Traffic</InputLabel>
          <Select
            value={simulationData.traffic}
            onChange={(e) =>
              setSimulationData({ ...simulationData, traffic: e.target.value })
            }
          >
            {/* {selectedCategories.map((c) => (
              <MenuItem key={c.type} value={c.type}>
                {c.type}
              </MenuItem>
            ))} */}
            <MenuItem>Hi</MenuItem>
            <MenuItem>Hi</MenuItem>
            <MenuItem>Hi</MenuItem>
            <MenuItem>Hi</MenuItem>
          </Select>
        </FormControl>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
