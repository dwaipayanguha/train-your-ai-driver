import React, { useRef, useEffect, useContext } from "react";

import useStyles from "./styles";
import Visualizer from "../../Visualizer/visualizer";

import { SimulationContext } from "../../../context/context.js";

const NetworkCanvas = () => {
  const classes = useStyles();
  const CanvasRef = useRef(null);
  return (
    <canvas
      ref={CanvasRef}
      className={classes.networkCanvas}
      width="500"
      height={window.innerHeight}
    ></canvas>
  );
};

export default NetworkCanvas;
