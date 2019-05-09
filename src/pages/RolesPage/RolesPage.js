import React, { useEffect, useState } from "react";
import axios from "axios";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import CommentIcon from "@material-ui/icons/Edit";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { withRouter } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import Head from "../../components/Head/Head";
import getApiUrl from "../../getApiUrl";
import useStyles from "./Style";

export default withRouter(props => {
  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getRoles = async () => {
      setIsLoading(true);
      const response = await axios(
        getApiUrl({ pathname: `/api/security/roles` })
      );
      setRoles(response.data);
      setIsLoading(false);
    };

    getRoles();
  }, []);

  const getDescription = role => {
    return role.permissions.map(
      ({ actions, resources }) =>
        `Can ${actions.join(", ")} on ${resources
          .map(({ resourceId }) => resourceId)
          .join(", ")}`
    );
  };

  const createRoleOnClickEventHandler = ({ role }) => () => {
    props.history.push(`/roles/view?roleName=${role.name}`);
  };

  const onAddClick = () => {
    props.history.push("/roles/add");
  };

  const classes = useStyles();

  return (
    <Layout>
      <Head title="Roles" />

      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom>
          Roles
        </Typography>
        {isLoading && (
          <CircularProgress className={classes.progress} size={50} />
        )}
        {!isLoading && (
          <List>
            {roles.map(role => (
              <ListItem
                key={role.name}
                dense
                button
                onClick={createRoleOnClickEventHandler({ role })}
                className={classes.listItem}
              >
                <ListItemText
                  primary={role.name}
                  secondary={getDescription(role)}
                />
                <ListItemSecondaryAction>
                  <IconButton aria-label="Edit">
                    <CommentIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        )}
        <Fab
          color="primary"
          aria-label="Add"
          className={classes.fab}
          onClick={onAddClick}
        >
          <AddIcon />
        </Fab>
      </Container>
    </Layout>
  );
});
