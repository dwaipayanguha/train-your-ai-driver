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
    dispatch({ type: "DELETE_CAR" });
  };

  const modifyCar = () => {
    dispatch({ type: "MODIFY_CAR" });
  };

  return (
    <SimulationContext.Provider value={{ deleteCar, modifyCar, simulation }}>
      {children}
    </SimulationContext.Provider>
  );
};
