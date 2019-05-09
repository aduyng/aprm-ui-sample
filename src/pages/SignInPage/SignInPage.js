import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Layout from "../../components/Layout/Layout";
import Head from "../../components/Head/Head";
import useStyles from "./Style";

export default () => {
  const [credentials, setCredentials] = useState({
    username: {
      value: ""
    },
    password: { value: "" }
  });

  const onUsernameChange = event => {
    const value = event.target.value.trim();
    return setCredentials({
      ...credentials,
      username: {
        ...credentials.username,
        value,
        isValid: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          value
        )
      }
    });
  };
  const classes = useStyles();

  return (
    <Layout>
      <Head title="Sign In" />
      <div className={classes.root}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              error={credentials.username.isValid === false}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={credentials.username.value}
              onChange={onUsernameChange}
              helperText={
                credentials.username.isValid === false
                  ? "The entered username is not valid"
                  : ""
              }
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  );
};
