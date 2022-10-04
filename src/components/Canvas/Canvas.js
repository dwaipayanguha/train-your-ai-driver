import React, { useRef, useEffect } from "react";

import useStyles from "./styles";
import Visualizer from "../Visualizer/visualizer";

const Canvas = (type) => {
  const classes = useStyles();
  const carCanvasRef = useRef(null);
  const networkCanvasRef = useRef(null);

  // const draw = (ctx, time) => {
  //   if (type === "carCanvas") {
  //     for (let i = 0; i < traffic.length; i++) {
  //       traffic[i].update(road.borders, []);
  //     }
  //     for (let i = 0; i < cars.length; i++) {
  //       cars[i].update(road.borders, traffic);
  //     }

  //     bestCar = cars.find((c) => c.y == Math.min(...cars.map((c) => c.y)));

  //     ctx.save();
  //     ctx.translate(0, -bestCar.y + window.innerHeight * 0.7);

  //     road.draw(ctx);
  //     for (let i = 0; i < traffic.length; i++) {
  //       traffic[i].draw(ctx);
  //     }

  //     ctx.globalAlpha = 0.2; //make parallel cars transparent
  //     for (let i = 0; i < cars.length; i++) {
  //       cars[i].draw(ctx);
  //     }
  //     ctx.globalAlpha = 1;
  //     bestCar.draw(ctx, true);

  //     ctx.restore();
  //   } else {
  //     ctx.lineDashOffset = -time / 50;
  //     Visualizer.drawNetwork(ctx, bestCar.brain);
  //     requestAnimationFrame(draw(ctx));
  //   }
  // };

  const draw = () => {};

  useEffect(() => {
    let canvas;
    if (type === "carCanvas") {
      canvas = carCanvasRef.current;
    } else {
      canvas = networkCanvasRef.current;
    }
    const context = canvas.getContext("2d");

    draw(context);
  }, [draw]);

  return (
    <canvas
      ref={type === "carCanvas" ? carCanvasRef : networkCanvasRef}
      className={
        type === "carCanvas" ? classes.carCanvas : classes.networkCanvas
      }
      width="500"
      height={window.innerHeight}
    ></canvas>
  );
};

export default Canvas;
