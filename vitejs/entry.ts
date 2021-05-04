import "vite/dynamic-import-polyfill";
import { createElement } from "react";
import { render } from "react-dom";
import { App } from "./app";
import "./app.scss";

const container = document.getElementById("root");

render(createElement(App), container);
