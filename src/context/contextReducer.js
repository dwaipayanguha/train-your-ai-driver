import { defaultState } from "../constants/defaultState";
import getRandomColour from "../utils/getRandomColour";

import Car from "../components/Car/car";
import Road from "../components/Road/road";
import NeuralNetwork from "../components/NeuralNetwork/neuralNetwork";

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

const init = (state) => {
  console.log("init");
  state.road = new Road(500 / 2, 500 * 0.9);
  state.cars = generateCars(state.parallelCars, state.road);
  state.bestCar = state.cars[0];

  if (state.bestBrain) {
    for (let i = 0; i < state.cars.length; i++) {
      state.cars[i].brain = JSON.parse(state.bestBrain);

      if (i != 0) {
        NeuralNetwork.mutate(state.cars[i].brain, 0.1);
      }
    }

    state.bestCar.brain = JSON.parse(state.bestBrain);
  }

  state.traffic = generateTraffic(state.trafficOptions, state.road);

  return state;
};

const contextReducer = (state, action) => {
  let simulation;
  switch (action.type) {
    case "DELETE_CAR":
      simulation = init(defaultState);
      //localStorage.setItem("simulation", JSON.stringify(state));
      return simulation;
    case "MODIFY_CAR":
      //simulation = [...state];
      simulation = init(state);
      console.log(simulation);
      //localStorage.setItem("simulation", JSON.stringify(state));
      return simulation;
    default:
      return state;
  }
};

export default contextReducer;
