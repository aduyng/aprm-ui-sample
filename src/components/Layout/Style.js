import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.gray
    }
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    paddingTop: theme.spacing(3),
    [theme.breakpoints.up(1100 + theme.spacing(3) * 2)]: {
      width: 1100,
      marginLeft: "auto",
      marginRight: "auto"
    }
  }
}));
