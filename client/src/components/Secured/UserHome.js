import React from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import { Element } from "react-scroll";

import Auth from "../../auth/Auth";

import NavBar from "../NavBar/NavBar";
import Dashboard from "./Dashboard";
import Statistics from "./Statistics/Statistics";

import "./UserHome.css";

export default function Home() {
    const history = useHistory();

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
        <div className="userhome">
            <NavBar handleLogout={handleLogout} />
            <Dashboard />
            <Element id="statistics">
                <Statistics />
            </Element>
        </div>
    );
}
