import React, { useReducer, createContext } from "react";

import contextReducer from "./contextReducer";
import { defaultState } from "../constants/defaultState";

const initialState =
  JSON.parse(localStorage.getItem("simulation")) || defaultState;

export const SimulationContext = createContext(initialState);

export const Provider = ({ children }) => {
  const [simulation, dispatch] = useReducer(contextReducer, initialState);

  //Action creators
  const deleteCar = () => {
    dispatch({ type: "DELETE_Car" });
  };

  const addCar = () => {
    dispatch({ type: "ADD_Car" });
  };

  return (
    <SimulationContext.Provider value={{ deleteCar, addCar, simulation }}>
      {children}
    </SimulationContext.Provider>
  );
};
