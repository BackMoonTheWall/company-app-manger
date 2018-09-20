import React from "react";
import history from "./history";
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from "./pages/home";
import Login from "./pages/login";
import "./App.css";
export default function () {
    return (
        <Router history={history}>
            <Switch>
                <Route exact path="/" component={() => <Redirect to="/home" />} />
                <Route path="/home" component={Home} />
                <Route path="/login" component={Login} />
            </Switch>
        </Router>
    )
}