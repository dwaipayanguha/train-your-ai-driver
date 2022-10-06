import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  root: {
    "& .MuiTextField-root": {
      margin: "10px",
    },
  },
  paper: {
    padding: "10px",
    marginLeft: "10px",
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  buttonSubmit: {
    marginBottom: 10,
  },
  radioGroup: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "10px",
  },
}));
