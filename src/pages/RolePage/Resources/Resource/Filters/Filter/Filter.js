import React from "react";
import useStyles from "./Style";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Parameters from "./Parameters/Parameters";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

export default props => {
  const onParametersChange = ({ parameters }) =>
    props.onChange({
      filter: {
        ...props.filter,
        parameters
      }
    });
  const classes = useStyles();

  const onDeleteButtonClick = () => props.onDelete({ filter: props.filter });

  return (
    <Grid container className={classes.root}>
      <Grid item xs={11}>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Filter ID"
              margin="dense"
              value={props.filter.id}
            />
          </Grid>
          <Grid item xs={12} className={classes.parameters}>
            <Typography>Parameters</Typography>
            <Parameters
              parameters={props.filter.parameters}
              onChange={onParametersChange}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={1}>
        <Button size="small" color="secondary" onClick={onDeleteButtonClick}>
          <DeleteIcon />
        </Button>
      </Grid>
    </Grid>
  );
};
