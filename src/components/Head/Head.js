import React from "react";
import { Helmet } from "react-helmet";

export default props => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{props.title}</title>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
      />
    </Helmet>
  );
};
