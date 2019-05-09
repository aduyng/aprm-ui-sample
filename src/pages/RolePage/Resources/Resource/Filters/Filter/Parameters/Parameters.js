import React from "react";
import useStyles from "./Style";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { cloneDeep } from "lodash";
import Grid from "@material-ui/core/Grid";
import Parameter from "./Parameter/Parameter";

export default props => {
  const classes = useStyles();
  const addButtonClickHandler = event => {
    event.preventDefault();
    return props.onChange({
      parameters: props.parameters.concat([
        `parameter${props.parameters.length + 1}`
      ])
    });
  };

  const createOnParameterChangeHandler = ({ index }) => ({ parameter }) => {
    const updated = cloneDeep(props.parameters);
    updated[index] = parameter;
    return props.onChange({
      parameters: updated
    });
  };

  const createOnParameterDeleteHandler = ({ index }) => () =>
    props.onChange({
      parameters: props.parameters.filter(
        (ignored, parameterIndex) => parameterIndex !== index
      )
    });
  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Grid container>
          {props.parameters.map((parameter, index) => (
            <Parameter
              key={index}
              parameter={parameter}
              onChange={createOnParameterChangeHandler({ index })}
              onDelete={createOnParameterDeleteHandler({ index })}
            />
          ))}
        </Grid>
      </Grid>
      <Grid item xs={12} className={classes.buttons}>
        <Button
          size="small"
          className={classes.button}
          onClick={addButtonClickHandler}
        >
          <AddIcon /> Add Parameter
        </Button>
      </Grid>
    </Grid>
  );
};
