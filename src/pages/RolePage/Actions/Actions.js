import React, { useState, useEffect } from "react";
import Axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { cloneDeep } from "lodash";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import getApiUrl from "../../../getApiUrl";
import useStyles from "./Style";

export default props => {
  const [isLoading, setIsLoading] = useState(true);
  const [availableActions, setAvailableActions] = useState(null);

  useEffect(() => {
    const getAvailableActions = async () => {
      setIsLoading(true);
      const response = await Axios(
        getApiUrl({ pathname: "/api/security/actions" })
      );
      setAvailableActions(response.data);
      setIsLoading(false);
    };
    getAvailableActions();
  }, []);

  const createOnActionChange = ({ index }) => event => {
    const action = event.target.value;
    const modifiedActions = cloneDeep(props.actions);
    modifiedActions[index] = action;

    return props.onChange({
      actions: modifiedActions
    });
  };

  const createOnDeleteButtonClickHandler = ({ index }) => () => {
    const modifiedActions = props.actions.filter(
      (ignoredAction, actionIndex) => actionIndex !== index
    );
    return props.onChange({
      actions: modifiedActions
    });
  };

  const onAddActionClick = () =>
    props.onChange({
      actions: props.actions.concat([""])
    });
  const classes = useStyles();

  if (isLoading) {
    return <CircularProgress className={classes.progress} />;
  }
  return (
    <Grid container className={classes.root}>
      {props.actions && (
        <Grid item xs={12}>
          {props.actions.map((action, index) => {
            return (
              <Grid container key={index}>
                <Grid item xs={11}>
                  <FormControl className={classes.formControl} fullWidth>
                    <Select
                      value={action}
                      onChange={createOnActionChange({ action, index })}
                      fullWidth
                    >
                      {availableActions.map(availableAction => (
                        <MenuItem value={availableAction} key={availableAction}>
                          {availableAction}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={1}>
                  <Button
                    size="medium"
                    color="secondary"
                    onClick={createOnDeleteButtonClickHandler({
                      action,
                      index
                    })}
                  >
                    <DeleteIcon />
                  </Button>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      )}
      <Grid item xs={12} className={classes.buttons}>
        <Button variant="outlined" size="medium" onClick={onAddActionClick}>
          <AddIcon /> Add Action
        </Button>
      </Grid>
    </Grid>
  );
};
