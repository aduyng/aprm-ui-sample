import React from "react";
import Grid from "@material-ui/core/Grid";
import Filter from "./Filter/Filter";
import useStyles from "./Style";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { cloneDeep } from "lodash";

export default props => {
  const classes = useStyles();

  const addButtonClickHandler = event => {
    event.preventDefault();

    return props.onChange({
      filters: props.filters.concat([
        {
          id: "",
          parameters: []
        }
      ])
    });
  };

  const createFilterChangeHandler = ({ index }) => ({ filter }) => {
    const updated = cloneDeep(props.filters);
    updated[index] = filter;
    return props.onChange({
      filters: updated
    });
  };

  return (
    <Grid container className={classes.root}>
      {props.filters && (
        <Grid item xs={12}>
          <Grid container>
            {props.filters.map((filter, index) => (
              <Filter
                key={index}
                filter={filter}
                onChange={createFilterChangeHandler({ index })}
              />
            ))}
          </Grid>
        </Grid>
      )}
      <Grid item xs={12} className={classes.buttons}>
        <Button size="small" variant="outlined" onClick={addButtonClickHandler}>
          <AddIcon /> Add Filter
        </Button>
      </Grid>
    </Grid>
  );
};
