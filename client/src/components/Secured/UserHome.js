import React from "react";
import Axios from "axios";
import {
    useHistory,
    BrowserRouter as Router,
    Switch,
    useRouteMatch,
} from "react-router-dom";
import { Element } from "react-scroll";

import Auth from "../../auth/Auth";

import NavBar from "../NavBar/NavBar";
import Dashboard from "./Dashboard";
import Statistics from "./Statistics/Statistics";
import SecuredRoute from "../Secured/SecuredRoute";
import Planner from "./Task/Planner";

import "./UserHome.css";

export default function Home() {
    const history = useHistory();
    const url = useRouteMatch();

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
        <div className='userhome'>
            <Router>
                <NavBar handleLogout={handleLogout} />

                <Switch>
                    <SecuredRoute path={`${url.path}/home`} component={Dashboard} />
                    <SecuredRoute
                        path={`${url.path}/planner`}
                        component={Planner}
                    />
                    <SecuredRoute
                        path={`${url.path}/statistics`}
                        component={Statistics}
                    />
                </Switch>

            </Router>
        </div>
    );
}
