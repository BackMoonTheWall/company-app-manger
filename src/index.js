// App.js
import React from 'react';
import ReactDOM from "react-dom";
import { hot } from 'react-hot-loader';

import 'antd/dist/antd.css';
import 'antd-css-rewrite/css/dist.css';
import 'zcmui/dist/zcmui.css';

import App from "./App";

hot(module)(App);

ReactDOM.render(<App />, document.querySelector("#root"));