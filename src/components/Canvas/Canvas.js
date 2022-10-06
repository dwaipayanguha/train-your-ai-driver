import React, { useRef, useEffect } from "react";
import { Grid, Button, Paper } from "@material-ui/core";

import useStyles from "./styles";

import getRandomColour from "../../utils/getRandomColour.js";
import { defaultState } from "../../constants/defaultState";
import { defaultSettings } from "../../constants/defaultSettings";

import Car from "../Car/car.js";
import Road from "../Road/road";
import NeuralNetwork from "../NeuralNetwork/neuralNetwork";
import Visualizer from "../Visualizer/visualizer";

function generateCars(N, road, hiddenLayers) {
  const cars = [];
  for (let i = 0; i < N; i++) {
    cars.push(new Car(road.getLaneCenter(1), 100, 30, 50, "AI", hiddenLayers));
  }
  return cars;
}

function generateTraffic(trafficOptions, road) {
  const traffic = [];
  for (let i = 0; i < trafficOptions.length; i++) {
    const trafficCar = new Car(
      road.getLaneCenter(trafficOptions[i].lane),
      trafficOptions[i].height,
      30,
      50,
      "DUMMY",
      [],
      2,
      getRandomColour()
    );
    traffic.push(trafficCar);
  }

  return traffic;
}

function modifyCar() {
  const simulation = defaultState;
  let simulationSettings = defaultSettings;
  if (localStorage.getItem("simulationSettings"))
    simulationSettings = JSON.parse(localStorage.getItem("simulationSettings"));

  simulation.road = new Road(600 / 2, 600 * 0.9, simulationSettings.lanes);

  simulation.cars = generateCars(
    simulationSettings.parallelCars,
    simulation.road,
    simulationSettings.hiddenLayers
  );
  simulation.bestCar = simulation.cars[0];
  if (localStorage.getItem("bestBrain")) {
    for (let i = 0; i < simulation.cars.length; i++) {
      simulation.cars[i].brain = JSON.parse(localStorage.getItem("bestBrain"));

      if (i != 0) {
        NeuralNetwork.mutate(simulation.cars[i].brain, 0.1);
      }
    }

    simulation.bestCar.brain = JSON.parse(localStorage.getItem("bestBrain"));
  }
  simulation.traffic = generateTraffic(
    simulationSettings.trafficOptions,
    simulation.road
  );

  return simulation;
}

const Canvas = () => {
  const classes = useStyles();
  const CarCanvasRef = useRef(null);
  const NetworkCanvasRef = useRef(null);
  const carCtx = useRef(null);
  const networkCtx = useRef(null);

  let simulation;

  const animate = (time) => {
    for (let i = 0; i < simulation.traffic.length; i++) {
      simulation.traffic[i].update(simulation.road.borders, []);
    }
    for (let i = 0; i < simulation.cars.length; i++) {
      simulation.cars[i].update(simulation.road.borders, simulation.traffic);
    }

    carCtx.current.height = window.innerHeight;
    networkCtx.current.height = window.innerHeight;

    simulation.bestCar = simulation.cars.find(
      (c) => c.y === Math.min(...simulation.cars.map((c) => c.y))
    );

    carCtx.current.save();
    carCtx.current.translate(
      0,
      -simulation.bestCar.y + window.innerHeight * 0.7
    );

    simulation.road.draw(carCtx.current);

    for (let i = 0; i < simulation.traffic.length; i++) {
      simulation.traffic[i].draw(carCtx.current);
    }

    carCtx.current.globalAlpha = 0.2; //make parallel cars transparent
    for (let i = 0; i < simulation.cars.length; i++) {
      simulation.cars[i].draw(carCtx.current);
    }
    carCtx.current.globalAlpha = 0.2;
    simulation.bestCar.draw(carCtx.current, true);

    carCtx.current.restore();

    networkCtx.lineDashOffset = -time / 50;
    Visualizer.drawNetwork(networkCtx.current, simulation.bestCar.brain);
    requestAnimationFrame(animate);
  };

  const deleteBestBrain = () => {
    simulation.bestBrain = null;
    localStorage.removeItem("bestBrain");
  };

  const rememberBestBrain = () => {
    localStorage.setItem("bestBrain", JSON.stringify(simulation.bestCar.brain));
  };

  const restartSimulation = () => {
    window.location.reload();
  };

  useEffect(() => {
    const carCanvas = CarCanvasRef.current;
    const networkCanvas = NetworkCanvasRef.current;

    carCanvas.width = "600";
    networkCanvas.width = "400";

    const carContext = carCanvas.getContext("2d");
    const networkContext = networkCanvas.getContext("2d");

    carCtx.current = carContext;
    networkCtx.current = networkContext;

    simulation = modifyCar();
    animate();
  }, [animate, localStorage.getItem("simulationSettings")]);

  return (
    <Grid container spacing={2}>
      <Grid item container direction="column" xs spacing={2}>
        <div className={classes.container}>
          <canvas
            ref={CarCanvasRef}
            className={classes.carCanvas}
            width="500"
            height={window.innerHeight}
          ></canvas>
        </div>
      </Grid>
      <Grid
        className={classes.form}
        item
        container
        direction="column"
        xs
        spacing={2}
      >
        <Grid item xs></Grid>
        <Grid item xs></Grid>
        <Grid item xs>
          <Button
            className={classes.buttonSubmit}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
            onClick={rememberBestBrain}
          >
            Remember current car as best car
          </Button>
        </Grid>

        <Grid item xs>
          <Button
            className={classes.buttonSubmit}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            align="flex"
            fullWidth
            onClick={deleteBestBrain}
          >
            Delete best car
          </Button>
        </Grid>

        <Grid item xs>
          <Button
            className={classes.buttonSubmit}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            align="flex"
            fullWidth
            onClick={restartSimulation}
          >
            Restart simulation with chosen best car
          </Button>
        </Grid>
        <Grid item xs></Grid>
        <Grid item xs></Grid>
      </Grid>
      <Grid item container direction="column" xs spacing={2}>
        <div className={classes.container}>
          <canvas
            ref={NetworkCanvasRef}
            className={classes.networkCanvas}
            width="500"
            height={window.innerHeight}
          ></canvas>
        </div>
      </Grid>
    </Grid>
  );
};

export default Canvas;
