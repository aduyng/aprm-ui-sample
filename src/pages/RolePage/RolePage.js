import React, { useEffect, useState } from "react";
import axios from "axios";
import queryString from "query-string";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import { withRouter } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import Head from "../../components/Head/Head";
import getApiUrl from "../../getApiUrl";
import useStyles from "./Style";
import Actions from "./Actions/Actions";
import Resources from "./Resources/Resources";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import SaveIcon from "@material-ui/icons/Save";

export default withRouter(props => {
  const [role, setRole] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { roleName } = queryString.parse(props.location.search);

  useEffect(() => {
    const getRole = async () => {
      setIsLoading(true);
      const response = await axios(
        getApiUrl({ pathname: `/api/security/roles/${roleName}` })
      );
      setRole({
        name: response.data.name,
        actions: response.data.permissions[0].actions,
        resources: response.data.permissions[0].resources
      });
      setIsLoading(false);
    };
    if (roleName) {
      getRole();
    } else {
      setRole({
        actions: [],
        resources: []
      });
      setIsLoading(false);
    }
  }, []);

  const onActionsChange = ({ actions }) =>
    setRole({
      ...role,
      actions
    });

  const onSubmitClick = async event => {
    event.preventDefault();
    setIsLoading(true);
    const response = await axios({
      method: "post",
      url: getApiUrl({ pathname: `/api/security/roles/${role.name}` }),
      data: {
        updateRoleRequest: {
          permissions: {
            actions: role.actions,
            resources: role.resources
          }
        }
      }
    });

    if (response.status === 201) {
      // TODO: display created successfully
    } else if (response.status === 200) {
      // TODO: display updated successfully
    } else {
      // TODO: handle errors
    }
    setIsLoading(false);
  };

  const onNameChange = event => {
    setRole({
      ...role,
      name: event.target.value
    });
  };

  const onCancelButtonClick = () => props.history.goBack();

  const onResourcesChange = ({ resources }) => {
    setRole({
      ...role,
      resources
    });
  };

  const classes = useStyles();
  const title = roleName ? `Edit Role: ${roleName}` : "Add Role";
  return (
    <Layout>
      <Head title={title} />
      <Container maxWidth="lg">
        <Typography variant="h4">{title}</Typography>
        <Typography variant="body1" gutterBottom>
          Enter the role details below. Required fields are indicated with *
        </Typography>

        {isLoading && (
          <CircularProgress className={classes.progress} size={50} />
        )}

        {!isLoading && (
          <Grid container className={classes.root}>
            <Grid item xs={12} key="role">
              <TextField
                required
                fullWidth
                onChange={onNameChange}
                value={role.name}
                label="Role Name"
                margin="normal"
                helperText="Role name must be unique"
              />
            </Grid>
            <Grid item xs={12} key="actions">
              <Card className={classes.card}>
                <CardContent>
                  <Typography className={classes.title} gutterBottom>
                    Actions
                  </Typography>
                  <Actions actions={role.actions} onChange={onActionsChange} />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} key="resources">
              <Card className={classes.card}>
                <CardContent>
                  <Typography className={classes.title} gutterBottom>
                    Resources
                  </Typography>
                  <FormControl component="fieldset" margin="normal">
                    <Resources
                      resources={role.resources}
                      onChange={onResourcesChange}
                    />
                  </FormControl>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} key="buttons">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                onClick={onSubmitClick}
                className={classes.submit}
              >
                <SaveIcon /> Save Changes
              </Button>
              <Button
                color="secondary"
                size="large"
                onClick={onCancelButtonClick}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        )}
      </Container>
    </Layout>
  );
});
