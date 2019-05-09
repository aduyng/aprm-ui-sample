import React from "react";
import useStyles from "./Style";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Resource from "./Resource/Resource";
import Grid from "@material-ui/core/Grid";
import { cloneDeep } from "lodash";

export default props => {
  const classes = useStyles();

  console.log(props.resources);

  const addButtonClickHandler = event => {
    event.preventDefault();

    return props.onChange({
      resources: props.resources.concat([
        {
          resourceId: "*",
          filters: []
        }
      ])
    });
  };

  const createOnResourceChangeHandler = ({ index }) => ({ resource }) => {
    const updatedResources = cloneDeep(props.resources);
    updatedResources[index] = resource;
    return props.onChange({ resources: updatedResources });
  };

  const createOnResourceDeleteHandler = ({ index }) => () => {
    return props.onChange({
      resources: props.resources.filter(
        (ignored, resourceIndex) => resourceIndex !== index
      )
    });
  };

  return (
    <Grid container className={classes.root}>
      {props.resources && (
        <Grid item xs={12}>
          <Grid container>
            {props.resources.map((resource, index) => (
              <Grid item xs={12} key={index}>
                <Resource
                  resource={resource}
                  key={index}
                  onDelete={createOnResourceDeleteHandler({
                    resource,
                    index
                  })}
                  onChange={createOnResourceChangeHandler({
                    resource,
                    index
                  })}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      )}
      <Grid item xs={12} className={classes.buttons}>
        <Button
          variant="outlined"
          size="medium"
          className={classes.button}
          onClick={addButtonClickHandler}
        >
          <AddIcon /> Add Resource
        </Button>
      </Grid>
    </Grid>
  );
};
