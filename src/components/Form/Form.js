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

  const [formLayer, setFormLayer] = useState(null);
  const [formTraffic, setFormTraffic] = useState({
    lane: null,
    height: null,
  });
  const [trafficList, setTrafficList] = useState([]);
  const [layersList, setLayerList] = useState([]);

  const handleLaneSubmit = () => {
    let simulationSettings = defaultSettings;
    if (localStorage.getItem("simulationSettings"))
      simulationSettings = JSON.parse(
        localStorage.getItem("simulationSettings")
      );

    simulationSettings.lanes = simulationData.lanes;

    localStorage.setItem(
      "simulationSettings",
      JSON.stringify(simulationSettings)
    );

    localStorage.removeItem("bestBrain");

    window.location.reload();
  };

  const handleParallelCarSubmit = () => {
    let simulationSettings = defaultSettings;
    if (localStorage.getItem("simulationSettings"))
      simulationSettings = JSON.parse(
        localStorage.getItem("simulationSettings")
      );

    simulationSettings.parallelCars = simulationData.parallelCars;

    localStorage.setItem(
      "simulationSettings",
      JSON.stringify(simulationSettings)
    );

    localStorage.removeItem("bestBrain");

    window.location.reload();
  };

  const handleLayerSubmit = () => {
    let simulationSettings = defaultSettings;
    if (localStorage.getItem("simulationSettings"))
      simulationSettings = JSON.parse(
        localStorage.getItem("simulationSettings")
      );

    simulationSettings.hiddenLayers = layersList;
    if (formLayer != null) {
      simulationSettings.hiddenLayers.push(parseInt(formLayer));
    }
    localStorage.setItem(
      "simulationSettings",
      JSON.stringify(simulationSettings)
    );

    localStorage.removeItem("bestBrain");

    window.location.reload();
  };

  const handleTrafficSubmit = () => {
    let simulationSettings = defaultSettings;
    if (localStorage.getItem("simulationSettings"))
      simulationSettings = JSON.parse(
        localStorage.getItem("simulationSettings")
      );

    simulationSettings.trafficOptions = trafficList;
    if (formTraffic.height !== null && formTraffic.lane !== null) {
      setFormTraffic({
        lane: parseInt(formTraffic.lane) + 1,
        height: parseInt(formTraffic.height),
      });
      simulationSettings.trafficOptions.push(formTraffic);
    }

    localStorage.setItem(
      "simulationSettings",
      JSON.stringify(simulationSettings)
    );

    localStorage.removeItem("bestBrain");

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
        label={`Lane: ${parseInt(data.lane) + 1}  Height: ${-data.height}`}
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
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
          onClick={handleLaneSubmit}
        >
          Update Number of Lanes
        </Button>
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
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
          onClick={handleLayerSubmit}
        >
          Update Layers
        </Button>
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
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
          onClick={handleParallelCarSubmit}
        >
          Update Number of Parallel Cars
        </Button>
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
          onClick={handleTrafficSubmit}
        >
          Update traffic
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
