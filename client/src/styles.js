import { makeStyles } from "@mui/styles";

export default makeStyles(() => ({
  appBar: {
    borderRadius: 15,
    margin: "30px 0",
    padding: "20px",
  },
  innerDiv: {
    flex: "2",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  mainDiv: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    color: "rgba(0,183,255, 1)",
  },
  image: {
    marginLeft: "15px",
  },
  searchBarWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "20px 0",
    padding: "10px",
  },
  searchBar: {
    width: "40%",
    backgroundColor: "white",
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    fontSize: "1.25rem",
  },
  btn: {
    margin: "20px",
  },
  profile: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  name: {
    marginRight: "10px",
  },
}));
