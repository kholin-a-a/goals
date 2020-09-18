import React from "react";
import { render } from "react-dom";
import { App } from "./App";

render(
  <App />,
  document.getElementById("root")
);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}