import React from "react";
import useStyles from "./Style";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";

export default ({ parameter, onChange, onDelete }) => {
  const classes = useStyles();
  const onParameterChange = event =>
    onChange({ parameter: event.target.value });

  const onDeleteButtonClick = () => onDelete({ parameter });

  return (
    <Grid container className={classes.root}>
      <Grid item xs={11}>
        <TextField
          required
          fullWidth
          onChange={onParameterChange}
          label="Parameter Name"
          margin="normal"
          value={parameter}
        />
      </Grid>
      <Grid item xs={1}>
        <Button size="small" color="secondary" onClick={onDeleteButtonClick}>
          <DeleteIcon />
        </Button>
      </Grid>
    </Grid>
  );
};
