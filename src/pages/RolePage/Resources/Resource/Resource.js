import React from "react";
import useStyles from "./Style";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Filters from "./Filters/Filters";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import classNames from "classnames";

export default ({ resource, onChange, onDelete, index }) => {
  const classes = useStyles();

  const onFiltersChange = ({ filters }) =>
    onChange({
      resource: {
        ...resource,
        filters
      }
    });

  const onDeleteButtonClick = () => onDelete({ resource });

  return (
    <Grid
      container
      className={classNames(classes.root, {
        [classes.odd]: index % 2 === 0,
        [classes.even]: index % 2 !== 0
      })}
    >
      <Grid item xs={11}>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Resource ID"
              margin="dense"
              value={resource.resourceId}
            />
          </Grid>
          <Grid item xs={12} className={classes.filters}>
            <Typography className={classes.title}>Filters</Typography>
            <Filters filters={resource.filters} onChange={onFiltersChange} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={1}>
        <Button size="medium" color="secondary" onClick={onDeleteButtonClick}>
          <DeleteIcon />
        </Button>
      </Grid>
    </Grid>
  );
};
