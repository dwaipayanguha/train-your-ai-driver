import React, { useRef, useEffect, useContext } from "react";

import useStyles from "./styles";

import getRandomColour from "../../../utils/getRandomColour.js";
import { defaultState } from "../../../constants/defaultState";

import Car from "../../Car/car.js";
import Road from "../../Road/road";
import NeuralNetwork from "../../NeuralNetwork/neuralNetwork";

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

const CarCanvas = () => {
  const classes = useStyles();
  const CanvasRef = useRef(null);
  const ctx = useRef(null);

  let simulation;

  const animate = () => {
    for (let i = 0; i < simulation.traffic.length; i++) {
      simulation.traffic[i].update(simulation.road.borders, []);
    }
    for (let i = 0; i < simulation.cars.length; i++) {
      simulation.cars[i].update(simulation.road.borders, simulation.traffic);
    }

    ctx.current.height = window.innerHeight;

    simulation.bestCar = simulation.cars.find(
      (c) => c.y == Math.min(...simulation.cars.map((c) => c.y))
    );

    ctx.current.save();
    ctx.current.translate(0, -simulation.bestCar.y + window.innerHeight * 0.7);

    simulation.road.draw(ctx.current);

    for (let i = 0; i < simulation.traffic.length; i++) {
      simulation.traffic[i].draw(ctx.current);
    }

    ctx.current.globalAlpha = 0.2; //make parallel cars transparent
    for (let i = 0; i < simulation.cars.length; i++) {
      simulation.cars[i].draw(ctx.current);
    }
    ctx.current.globalAlpha = 0.2;
    simulation.bestCar.draw(ctx.current, true);

    ctx.current.restore();

    //requestAnimationFrame(animate);
  };

  useEffect(() => {
    const canvas = CanvasRef.current;
    const context = canvas.getContext("2d");
    ctx.current = context;
    simulation = modifyCar();
    animate();
  }, [animate]);

  return (
    <canvas
      ref={CanvasRef}
      className={classes.carCanvas}
      width="500"
      height={window.innerHeight}
    ></canvas>
  );
};

export default CarCanvas;
