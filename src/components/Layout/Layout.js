import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import useStyles from "./Style";

export default props => {
  const classes = useStyles();
  return (
    <div className={classes.layout} component="main">
      <CssBaseline />
      <div className={classes.body}>{props.children}</div>
    </div>
  );
};
