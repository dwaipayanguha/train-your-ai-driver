import React, { useRef, useEffect, useContext } from "react";
import { Grid } from "@material-ui/core";

import useStyles from "./styles";

import getRandomColour from "../../utils/getRandomColour.js";
import { defaultState } from "../../constants/defaultState";

import Car from "../Car/car.js";
import Road from "../Road/road";
import NeuralNetwork from "../NeuralNetwork/neuralNetwork";
import Visualizer from "../Visualizer/visualizer";

function generateCars(N, road) {
  const cars = [];
  for (let i = 0; i < N; i++) {
    cars.push(new Car(road.getLaneCenter(1), 100, 30, 50, "AI"));
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
      2,
      getRandomColour()
    );
    traffic.push(trafficCar);
  }

  return traffic;
}

function modifyCar() {
  const simulation =
    JSON.parse(localStorage.getItem("simulation")) || defaultState;
  simulation.road = new Road(500 / 2, 500 * 0.9);

  simulation.cars = generateCars(simulation.parallelCars, simulation.road);
  simulation.bestCar = simulation.cars[0];
  if (simulation.bestBrain) {
    for (let i = 0; i < simulation.cars.length; i++) {
      simulation.cars[i].brain = simulation.bestBrain;

      if (i != 0) {
        NeuralNetwork.mutate(simulation.cars[i].brain, 0.1);
      }
    }

    simulation.bestCar.brain = simulation.bestBrain;
  }
  simulation.traffic = generateTraffic(
    simulation.trafficOptions,
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
      (c) => c.y == Math.min(...simulation.cars.map((c) => c.y))
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
    // requestAnimationFrame(animate);
  };

  useEffect(() => {
    const carCanvas = CarCanvasRef.current;
    const networkCanvas = NetworkCanvasRef.current;

    const carContext = carCanvas.getContext("2d");
    const networkContext = networkCanvas.getContext("2d");

    carCtx.current = carContext;
    networkCtx.current = networkContext;

    simulation = modifyCar();
    animate();
  }, [animate, localStorage.getItem("simulation")]);

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
