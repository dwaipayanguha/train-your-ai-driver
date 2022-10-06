import React, { useEffect, useRef, useState } from "react";
import { TextField, Button, Typography, Paper, Chip } from "@material-ui/core";

import useStyles from "./styles.js";
import { defaultSettings } from "../../constants/defaultSettings.js";

const Form = () => {
  const classes = useStyles();
  const FormRef = useRef(null);

  const [simulationData, setSimulationData] = useState({
    parallelCars: 500,
    lanes: 3,
  });

  const [formLayer, setFormLayer] = useState(3);
  const [formTraffic, setFormTraffic] = useState({
    lane: 1,
    height: -100,
  });
  const [trafficList, setTrafficList] = useState([]);
  const [layersList, setLayerList] = useState([]);

  const handleSubmit = () => {
    let simulationSettings = defaultSettings;
    if (localStorage.getItem("simulationSettings"))
      simulationSettings = JSON.parse(
        localStorage.getItem("simulationSettings")
      );

    if (simulationData.lanes > 6 || simulationData < 0) {
      setSimulationData({ ...simulationData, lane: simulationSettings.lanes });
    }
    simulationSettings.lanes = simulationData.lanes;
    if (simulationData.parallelCars < 0)
      setSimulationData({
        ...simulationData,
        parallelCars: simulationSettings.parallelCars,
      });
    simulationSettings.parallelCars = simulationData.parallelCars;
    simulationSettings.trafficOptions = trafficList;

    if (layersList.length == 0) {
      setLayerList(simulationSettings.hiddenLayers);
    }
    simulationSettings.hiddenLayers = layersList;

    simulationSettings.hiddenLayers.push(formLayer);
    if (formTraffic.lane > simulationSettings.lanes) {
      setFormLayer({ ...formTraffic, lane: simulationSettings.lanes });
    }
    simulationSettings.trafficOptions.push(formTraffic);
    localStorage.setItem(
      "simulationSettings",
      JSON.stringify(simulationSettings)
    );
    window.location.reload();
  };

  const handleDeleteTraffic = (idx) => {
    setTrafficList((current) => current.filter((_, index) => index != idx));
  };

  const handleDeleteLayer = (idx) => {
    setLayerList((current) => current.filter((_, index) => index != idx));
  };

  useEffect(() => {
    let simulationSettings = defaultSettings;
    if (localStorage.getItem("simulationSettings"))
      simulationSettings = JSON.parse(
        localStorage.getItem("simulationSettings")
      );

    setSimulationData({
      ...simulationData,
      parallelCars: simulationSettings.parallelCars,
    });
    setSimulationData({
      ...simulationData,
      lanes: simulationSettings.lanes,
    });

    setTrafficList(simulationSettings.trafficOptions);
    setLayerList(simulationSettings.hiddenLayers);
  }, []);

  const layers = layersList.map((data, index) => {
    return (
      <Chip
        id={index}
        label={`Cells: ${data}`}
        variant="outlines"
        onDelete={handleDeleteLayer.bind(this, index)}
      />
    );
  });

  const traffic = trafficList.map((data, index) => {
    return (
      <Chip
        id={index}
        label={`Lane: ${data.lane + 1}  Height: ${-data.height}`}
        variant="outlined"
        onDelete={handleDeleteTraffic.bind(this, index)}
      />
    );
  });

  return (
    <Paper className={classes.paper}>
      <form
        ref={FormRef}
        autoComplete="off"
        noValidate
        className={`${classes.form} ${classes.root}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h4"> Train your AI driver </Typography>
        <TextField
          name="lanes"
          variant="outlined"
          label="Number of Lanes"
          fullWidth
          value={simulationData.lanes}
          onChange={(e) =>
            setSimulationData({
              ...simulationData,
              lanes: e.target.value,
            })
          }
        />

        <Typography variant="h6">
          Add a hidden layer in the neural network
        </Typography>
        <TextField
          name="layer"
          variant="outlined"
          label="Number of cells in the new layer"
          fullWidth
          value={formLayer}
          onChange={(e) => setFormLayer(e.target.value)}
        />
        <>{layers}</>
        <TextField
          name="parallelCars"
          variant="outlined"
          label="Number of Parallel Cars"
          fullWidth
          value={simulationData.parallelCars}
          onChange={(e) =>
            setSimulationData({
              ...simulationData,
              parallelCars: e.target.value,
            })
          }
        />
        <Typography variant="h6"> Add dummy cars in traffic </Typography>
        <TextField
          name="lane"
          variant="outlined"
          label="Lane Number (1 / 2 / 3 ...)"
          fullWidth
          value={formTraffic.lane}
          onChange={(e) =>
            setFormTraffic({
              ...formTraffic,
              lane: e.target.value,
            })
          }
        />

        <TextField
          name="height"
          variant="outlined"
          label="When should the dummy car appear (value in 100s)"
          fullWidth
          value={-formTraffic.height}
          onChange={(e) =>
            setFormTraffic({
              ...formTraffic,
              height: -e.target.value,
            })
          }
        />
        <>{traffic}</>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
