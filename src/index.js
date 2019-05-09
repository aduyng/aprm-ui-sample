import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/App";
import getConfig from "./getConfig";

async function start() {
  global.config = await getConfig();

  const rootElement = document.getElementById("root");
  ReactDOM.render(<App />, rootElement);
}

start();
