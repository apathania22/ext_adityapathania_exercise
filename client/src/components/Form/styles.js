import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: "10px",
    },
  },
  paper: {
    padding: "20px",
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  button: {
    width: "100%",
    marginBottom: 10,
  },
}));
