import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => ({
  root: {
    display: "flex",
    flexGrow: 1
  },
  grid: {
    display: "flex",
    flexDirection: "column"
  },
  buttons: {
    marginTop: theme.spacing(1)
  }
}));
