import { makeStyles } from "@material-ui/core";

export default makeStyles(() => ({
  carCanvas: {
    background: "lightgray",
  },
  networkCanvas: {
    background: "lightgray",
  },
  container: {
    minWidth: "100%",
    height: "100vh",
    minHeight: 150,
    margin: "0",
    background: "darkgray",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));
