import React from "react";
import Axios from "axios";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useHistory,
    useRouteMatch,
} from "react-router-dom";

import Auth from "../../auth/Auth";

import NavBar from "../NavBar/NavBar";
import Dashboard from "./Dashboard";
import GetHabit from "./Habit/GetHabit";

export default function Home() {
    const history = useHistory();
    let { path } = useRouteMatch();

    function handleLogout(e) {
        e.preventDefault();
        Axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:8080/auth/logout",
        });
        Auth.deauthenticateUser();
        history.push("/");
    }

    return (
        <Router>
            <NavBar handleLogout={handleLogout} />
            <Switch>
                <Route path={`${path}/:userId/statistics`} />
                <Route path={`${path}/get-habits`} component={GetHabit} />
                <Route path={`${path}`} component={Dashboard} />
            </Switch>
        </Router>
    );
}
